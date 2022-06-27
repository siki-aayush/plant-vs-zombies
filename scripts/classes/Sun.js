import { CELL_WIDTH, CELL_HEIGHT, ctx, sunImg } from "../constants.js";

export default class Sun {
    constructor(game, x, y, startPos) {
        this.game = game;
        this.x = x;
        this.y = startPos;
        this.finalYPos = y;
        this.w = CELL_WIDTH * 0.5;
        this.h = CELL_HEIGHT * 0.5;
        this.value = 25;
        this.delete = false;
        this.collect = false;
        this.incrX = this.x / 50;
        this.incrY = this.finalYPos / 50;

        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 28;
        this.spriteW = 79;
        this.spriteH = 79;
        this.img = sunImg;
    }
    draw() {
        ctx.drawImage(
            this.img,
            this.frameX * this.spriteW,
            this.frameY * this.spriteH,
            this.spriteW,
            this.spriteH,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }

    update() {
        if (this.game.frames % 5 === 0) {
            this.frameX < this.maxFrame
                ? this.frameX++
                : (this.frameX = this.minFrame);
        }

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
}
