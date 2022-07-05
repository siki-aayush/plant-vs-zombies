import {
    CELL_WIDTH,
    ctx,
    peaHit,
    normalBullet,
    canvas,
} from "../../constants.js";
import { isCollided } from "../../utils.js";

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
        this.damage = 10;
        this.speed = 3;
        this.delete = false;

        this.loadBullet();
    }

    loadBullet() {
        this.bullet = normalBullet;
    }

    draw() {
        ctx.drawImage(this.bullet, this.x, this.y, this.w, this.h);
    }

    checkCollision() {
        this.game.zombies.every((zombie) => {
            if (isCollided(this, zombie)) {
                this.game.volume && peaHit.play();
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
        this.x += this.speed;
        this.draw();
        this.checkCollision();
    }
}
