import { DragonZombieSprite } from "../../constants.js";
import Zombie from "./Zombie.js";

export default class DragonZombie extends Zombie {
    initZombieSpecs() {
        // Movement variables
        this.velocity = 1;
        this.increment = this.velocity;

        // Life
        this.health = 200;

        // Zombie status
        this.delete = false;
        this.attacking = false;
    }

    initZombieAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 5;
        this.endFrameY = 2;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 464;
        this.spriteH = 400;
        this.animationSpeed = 4;

        // Offset for drawing mage
        this.offsetX = -20;
        this.offsetY = -150;
        this.offsetW = 150;
        this.offsetH = 150;
    }
    attackAnimation() {}

    // Sets the start frames and end frame to the dieFrame
    dieAnimation() {
        this.startFrameX = 6;
        this.startFrameY = 2;
        this.endFrameX = 3;
        this.endFrameY = 4;
        this.increment = 0;
    }

    loadSprite() {
        this.zombieType = DragonZombieSprite;
        console.log("zombie", this.zombieType);
    }
}
