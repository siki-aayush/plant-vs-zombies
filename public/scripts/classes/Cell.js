import {
    mouseStatus,
    ctx,
    canvas,
    CELL_WIDTH,
    CELL_HEIGHT,
    CELL_PAD,
} from "../constants.js";
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
    constructor(game, x, y, w, h) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // Draws the cell on canvas
    draw() {
        /* Can be used for debugging process (shows the cell outline)*/

        // ctx.strokeStyle = "black";
        // ctx.strokeRect(this.x, this.y, this.w, this.h);
        //ctx.fillRect(this.x, this.y, this.w, this.h);

        // Checks whether there is already a plant in selected cell
        for (let i = 0; i < this.game.plants.length; i++) {
            if (
                this.game.plants[i].x === this.x + CELL_PAD &&
                this.game.plants[i].y === this.y + CELL_PAD
            ) {
                return;
            }
        }

        if (
            !this.game.shovelSelected &&
            mouseStatus.x &&
            mouseStatus.y &&
            isCollided(this, mouseStatus)
        ) {
            // Gets the class of the selected plant
            let selectedPlant =
                this.game.plantsTypes[this.game.selectedPlant].blueprint;

            // Creates the selected plant class
            this.game.selectedPlantHoverImg = new selectedPlant(
                this.game,
                this.x,
                this.y,
                CELL_WIDTH - 25,
                CELL_HEIGHT - 25
            );

            // Sets the opacity to 0.5 and draws the image of the plant
            ctx.globalAlpha = 0.5;
            this.game.selectedPlantHoverImg.draw();
            ctx.globalAlpha = 1;

            // Changes the cursor to pointer
            canvas.style.cursor = "pointer";
        }
    }
}
