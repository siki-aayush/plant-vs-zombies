import Plant from "./Plant.js";
import { isCollided } from "../../utils.js";
import { SpikeweedSprite } from "../../constants.js";

export default class Spikeweed extends Plant {
    static cost = 20;
    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 9;
        this.endFrameY = 1;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 100;
        this.spriteH = 41;
        this.animationSpeed = 5;

        // Offset for drawing image
        this.offsetX = 0;
        this.offsety = -75;
        this.offsetW = 20;
        this.offsetH = -50;

        this.hit = false;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = SpikeweedSprite;
    }

    handleCollision() {
        this.game.zombies.forEach((zombie) => {
            if (isCollided(this, zombie)) {
                zombie.health -= 0.12;
                if (!this.hit) {
                    zombie.hit = true;
                    this.hit = true;

                    setTimeout(() => {
                        this.hit = false;
                    }, 500);
                }
            }
        });
    }
}
