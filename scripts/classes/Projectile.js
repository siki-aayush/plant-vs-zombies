import { CELL_WIDTH, CELL_HEIGHT, ctx } from "../constants.js";
import { isCollided } from "../utils.js";
import { canvas } from "../constants.js";
export default class Projectile {
    /**
     * constructor.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    constructor(game, x, y, w, h) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.damage = 3;
        this.speed = 3;
        this.delete = false;

        this.loadBullet();
    }

    loadBullet() {
        this.bullet = new Image();
        this.bullet.src = "../../assets/images/Plants/PB00.gif";
    }

    draw() {
        ctx.drawImage(this.bullet, this.x, this.y, this.w, this.h);
    }

    checkCollision() {
        this.game.zombies.every((zombie) => {
            if (isCollided(this, zombie)) {
                zombie.health -= this.damage;
                this.delete = true;
                return false;
            }
            return true;
        });

        if (this.x > canvas.width - CELL_WIDTH) {
            this.delete = true;
        }
    }

    update() {
        this.x += this.speed;
        this.draw();
        this.checkCollision();
    }
}

export class TopProjectile extends Projectile {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.topPos = y - CELL_HEIGHT;
    }
    update() {
        this.x += this.speed;
        if (this.y > this.topPos) {
            this.y -= this.speed;
        }
        this.draw();
        this.checkCollision();
    }
}

export class BottomProjectile extends Projectile {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.bottomPos = y + CELL_HEIGHT;
    }
    update() {
        this.x += this.speed;
        if (this.y < this.bottomPos) {
            this.y += this.speed;
        }
        this.draw();
        this.checkCollision();
    }
}

export class ParabolicProjectile extends Projectile {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        //this.game = game;
        this.temp = y;
        this.initialFrame = this.game.frames;

        this.theta = 0;
        this.futureTime = 90;

        this.getTarget();

        if (this.target) {
            if (this.target.attacking !== true) {
                this.futureZombiePos =
                    this.target.x - this.target.velocity * this.futureTime;
                this.targetDist = this.futureZombiePos - this.x;
                this.speed = this.targetDist / this.futureTime;
                this.d_theta = 180 / this.futureTime;
            } else {
                this.targetDist = this.target.x - this.x;
                this.speed = this.targetDist / 90;
                this.d_theta = 180 / 90;
            }
        }
        if (!this.target || this.targetDist <= 0) {
            this.speed = 1;
            this.d_theta = 1;
        }
    }

    loadBullet() {
        this.bullet = new Image();
        this.bullet.src = "../../assets/images/Melonpult_melon.webp";
    }

    getTarget() {
        this.game.zombies.every((zombie) => {
            if (
                this.y >= zombie.y &&
                this.y <= zombie.y + CELL_HEIGHT
                //&&
                //zombie.x - zombie.velocity * this.futureTime > this.x + 50
            ) {
                this.target = zombie;
                return false;
            }
            return true;
        });
    }

    checkCollision() {
        this.game.zombies.every((zombie) => {
            if (this.temp === zombie.y && isCollided(this, zombie)) {
                zombie.health -= this.damage;
                this.delete = true;
                return false;
            }
            return true;
        });

        if (this.x > canvas.width - CELL_WIDTH) {
            this.delete = true;
        }
    }

    update() {
        this.futureTime--;
        this.theta += this.d_theta;
        this.x += this.speed;
        this.y =
            this.temp -
            Math.sin((this.theta * Math.PI) / 180) * this.targetDist * 0.2;

        if (this.theta > 180) {
            this.delete = true;
        } else {
            this.draw();
            this.checkCollision();
        }
    }

    draw() {
        super.draw();
    }
}
