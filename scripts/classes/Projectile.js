import { CELL_HEIGHT, ctx } from "../constants.js";
export default class Projectile {
    /**
     * constructor.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.damage = 10;
        this.speed = 2;
        this.delete = false;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speed;
        this.draw();
    }
}

export class TopProjectile extends Projectile {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.topPos = y - CELL_HEIGHT;
    }
    update() {
        this.x += this.speed;
        if (this.y > this.topPos) {
            this.y -= this.speed;
        }
        this.draw();
    }
}

export class BottomProjectile extends Projectile {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.bottomPos = y + CELL_HEIGHT;
    }
    update() {
        this.x += this.speed;
        if (this.y < this.bottomPos) {
            this.y += this.speed;
        }
        this.draw();
    }
}

export class ParabolicProjectile extends Projectile {
    constructor(game, x, y, w, h) {
        super(x, y, w, h);
        this.game = game;
        this.temp = y;
        this.initialFrame = this.game.frames;

        this.theta = 0;
        this.futureTime = 90;

        this.getTarget();

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

        if (this.targetDist <= 0) {
            this.speed = 1;
            this.d_theta = 1;
        }
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

    update() {
        this.futureTime--;
        this.theta += this.d_theta;
        this.x += this.speed;
        this.y = this.temp - Math.sin((this.theta * Math.PI) / 180) * 120;
        if (this.theta > 180) {
            console.log(this.theta);
        }
        this.draw();
    }

    draw() {
        super.draw();
    }
}
