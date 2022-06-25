import { CELL_PAD, ctx } from "../constants.js";

export default class Zombie {
    /**
     * constructor.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    constructor(game, x, y, w, h) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w - CELL_PAD * 2;
        this.h = h - CELL_PAD * 2;
        //this.velocity = Math.random() * 0.8 + 0.4;
        this.velocity = 0.5;
        this.increment = this.velocity;
        this.health = 100;
        this.delete = false;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "gold";
        ctx.font = "20px Arial";
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 20);
    }

    update() {
        this.x -= this.increment;
        this.draw(ctx);
    }
}
