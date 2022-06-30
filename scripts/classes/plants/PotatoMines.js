import Plant from "./Plant.js";
import { CELL_WIDTH, CELL_HEIGHT } from "../../constants.js";
import { isCollided } from "../../utils.js";

export default class PotatoMines extends Plant {
    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 10;
        this.endFrameY = 0;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 132;
        this.spriteH = 93;
        this.animationSpeed = 4;

        // Offset for drawing image
        this.offsetX = 0;
        this.offsety = -75;
        this.offsetW = 100;
        this.offsetH = 0;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "/assets/images/PotatoMineSprite_132x93.png";
    }

    attack() {
        let collided = false;

        // Chekcs if any zombies are collided with the mine
        this.game.zombies.every((zombie) => {
            if (isCollided(this, zombie) && zombie.x + zombie.w > this.x) {
                zombie.delete = true;
                this.health = 0;
                collided = true;
                return false;
            }
            return true;
        });

        // If collided then all the zombies with one lane apart will also be killed
        if (collided) {
            this.game.zombies.forEach((zombie) => {
                if (
                    isCollided(
                        {
                            x: this.x,
                            y: this.y - CELL_HEIGHT, // Above lane
                            w: this.w + CELL_WIDTH, // Front lane
                            h: this.h + CELL_HEIGHT * 2, // Below lane
                        },
                        zombie
                    )
                ) {
                    zombie.delete = true;
                    this.game.score += 10;
                }
            });
        }
    }
}
