import {
    CELL_WIDTH,
    peaHit,
    canvas,
    CELL_HEIGHT,
    melonBullet,
} from "../../constants.js";
import { isCollided } from "../../utils.js";
import Projectile from "./Projectile.js";

export default class ParabolicProjectile extends Projectile {
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
                this.speed = this.targetDist / 20;
                this.d_theta = 180 / 20;
            }
        }
        if (!this.target || this.targetDist <= 0) {
            this.delete = true;
        }
    }

    loadBullet() {
        this.bullet = melonBullet;
    }

    getTarget() {
        this.game.zombies.every((zombie) => {
            if (
                this.y >= zombie.y &&
                this.y <= zombie.y + (CELL_HEIGHT - 100)
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
                peaHit.play();
                zombie.health -= this.damage;
                zombie.hit = true;
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
        this.theta += this.d_theta;
        this.x += this.speed;
        this.y =
            this.temp -
            Math.sin((this.theta * Math.PI) / 180) * this.targetDist * 0.2;

        if (this.theta > 180) {
            this.delete = true;
        } else {
            this.checkCollision();
        }
        this.draw();
    }

    draw() {
        super.draw();
    }
}
