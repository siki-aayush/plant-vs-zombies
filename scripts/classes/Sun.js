import { CELL_WIDTH, CELL_HEIGHT, ctx } from "../constants.js";

export default class Sun {
    constructor(x, y, startPos) {
        this.x = x;
        this.y = startPos;
        this.finalYPos = y;
        this.w = CELL_WIDTH * 0.4;
        this.h = CELL_HEIGHT * 0.4;
        this.value = 25;
        this.delete = false;
        this.collect = false;
        this.incrX = this.x / 50;
        this.incrY = this.finalYPos / 50;
    }
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update() {
        if (!this.collect) {
            if (this.y <= this.finalYPos) {
                this.y += 2;
            }
        } else {
            this.x -= this.x / 10;
            this.y -= this.y / 10;
        }

        if (this.x < 1 && this.y < 1) {
            this.delete = true;
        }
        this.draw();
    }

    //collect() {
    //}
}
