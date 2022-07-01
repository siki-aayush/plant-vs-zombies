import { canvas, ctx, LawnCleanerImg } from "../constants.js";
import { isCollided } from "../utils.js";

export default class LawnCleaner {
    constructor(game, x, y, w, h) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = LawnCleanerImg;
        this.cleaning = false;
        this.increment = 0;
        this.delete = false;
    }

    update() {
        if (this.cleaning) {
            this.x += this.increment;
        }

        this.game.zombies.forEach((zombie) => {
            if (!this.cleaning && isCollided(this, zombie)) {
                this.cleaning = true;
                this.increment = 10;
            } else if (this.cleaning && isCollided(this, zombie)) {
                zombie.delete = true;
            }
        });

        if (this.x > canvas.width) {
            this.delete = true;
        }
        this.draw();
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}
