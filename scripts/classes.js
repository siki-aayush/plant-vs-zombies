import {
    ctx,
    mouseStatus,
    CELL_WIDTH,
    CELL_HEIGHT,
    PROJECTILES,
    CELL_PAD,
    canvas,
    GRID_COL_START_POS,
    GRID_ROW_START_POS,
} from "./constants.js";
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
        this.w = w - CELL_PAD * 2;
        this.h = h - CELL_PAD * 2;
        this.attack = false;
        this.health = 100;
        this.cooldown = 0;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "gold";
        ctx.font = "20px Arial";
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 20);
    }

    update() {
        if (this.attack) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                PROJECTILES.push(
                    new Projectiles(
                        this.x + CELL_WIDTH / 2,
                        this.y + CELL_HEIGHT / 2,
                        10,
                        10
                    )
                );
            }
        } else {
            this.cooldown = 0;
        }
        this.draw();
    }
}

class Zombies {
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
        this.w = w - CELL_PAD * 2;
        this.h = h - CELL_PAD * 2;
        this.velocity = Math.random() * 0.4 + 0.2;
        this.increment = this.velocity;
        this.health = 100;
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
        this.draw();
    }
}

class Projectiles {
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
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speed;
        this.draw();
    }
}

class Sun {
    constructor() {
        this.x =
            Math.random() * (canvas.width - CELL_WIDTH) + GRID_COL_START_POS;
        this.y = (Math.random() * 5 + 1) * CELL_HEIGHT + GRID_ROW_START_POS;
        this.w = CELL_WIDTH * 0.4;
        this.h = CELL_HEIGHT * 0.4;
        this.value = 25;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

//export { Cell, Plant, Zombies, Sun };
