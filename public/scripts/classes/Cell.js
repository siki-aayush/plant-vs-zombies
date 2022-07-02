import { mouseStatus, ctx } from "../constants.js";
import { isCollided } from "../utils.js";

export default class Cell {
    /**
     * constructor.
     *
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
    }

    // Draws the cell on canvas
    draw() {
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(this.x, this.y, this.w, this.h);
        if (mouseStatus.x && mouseStatus.y && isCollided(this, mouseStatus)) {
            ctx.globalAlpha = 0.3;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.globalAlpha = 1;
        }
    }
}
