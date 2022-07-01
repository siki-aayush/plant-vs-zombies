import { WallnutSprite } from "../../constants.js";
import Plant from "./Plant.js";

export default class WallNut extends Plant {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.health = 500;
    }
    // Initializes all the variables required for animation
    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 5;
        this.endFrameY = 1;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 65;
        this.spriteH = 73;
        this.animationSpeed = 4;

        // Offset for drawing image
        this.offsetX = 0;
        this.offsety = 0;
        this.offsetW = 0;
        this.offsetH = 0;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = WallnutSprite;
    }

    // Updates the animation
    updateAnimation() {
        if (this.health < 300) {
            this.startFrameX = 1;
            this.startFrameY = 3;
            this.endFrameX = 6;
            this.endFrameY = 4;
        } else if (this.health < 100) {
            this.startFrameX = 6;
            this.startFrameY = 1;
            this.endFrameX = 0;
            this.endFrameY = 3;
        }
    }

    //attack() {
    //    this.draw();
    //}
}
