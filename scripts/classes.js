import { ctx, mouseStatus } from "./constants.js";
import { isCollided } from "./utils.js";

class Cell {
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
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        if (mouseStatus.x && mouseStatus.y && isCollided(this, mouseStatus)) {
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}

class Plant {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.attack = false;
        this.health = 100;
        this.projectiles = [];
        this.cooldown = 0;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "gold";
        ctx.font = "20px Arial";
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 20);
    }
}

export { Cell, Plant };
