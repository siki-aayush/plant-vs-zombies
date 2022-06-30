import Plant from "./Plant.js";
import Projectile from "../Projectile.js";
import { CELL_WIDTH, peaShoot } from "../../constants.js";

export default class Repeater extends Plant {
    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 2;
        this.endFrameY = 2;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 73;
        this.spriteH = 71;
        this.animationSpeed = 3;

        // Offset for drawing image
        this.offsetX = -15;
        this.offsety = -15;
        this.offsetW = -15;
        this.offsetH = -15;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "/assets/images/RepeaterSprite_73x71.png";
    }

    attack() {
        // Denotes the plant is ready to attack and
        // is waiting for the right animation frame of attack
        if (this.game.frames % 100 == 0) {
            this.attackNow = true;
        }

        if (
            this.attacking &&
            this.attackNow &&
            this.frameX === 3 &&
            this.frameY === 1
        ) {
            this.attackNow = false;

            peaShoot.play();
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2,
                    this.y + 24,
                    this.bulletW,
                    this.bulletH
                )
            );

            peaShoot.play();
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2 + this.bulletW,
                    this.y + 24,
                    this.bulletW,
                    this.bulletH
                )
            );
        }
    }
}
