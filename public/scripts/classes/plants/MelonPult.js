import Plant from "./Plant.js";
import ParabolicProjectile from "../projectiles/ParabolicProjectile.js";
import { MelonpultSprite } from "../../constants.js";

export default class MelonPult extends Plant {
    static cost = 50;

    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 0;
        this.endFrameY = 0;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 459;
        this.spriteH = 345;
        this.animationSpeed = 3;

        // Offset for drawing image
        this.offsetX = 20;
        this.offsety = -15;
        this.offsetW = 25;
        this.offsetH = -15;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = MelonpultSprite;
    }

    attack() {
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new ParabolicProjectile(this.game, this.x, this.y, 62, 55)
                );
            }
        } else {
            this.cooldown = 0;
        }
    }
}
