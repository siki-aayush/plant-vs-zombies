import { NormalZombieSprite } from "../../constants.js";
import Zombie from "./Zombie.js";

export default class NormalZombie extends Zombie {
    initZombieSpecs() {
        // Movement variables
        this.velocity = 0.2;
        this.increment = this.velocity;

        // Life
        this.health = 100;

        // Zombie status
        this.delete = false;
        this.attacking = false;
    }

    loadSprite() {
        this.zombieType = NormalZombieSprite;
    }

    initZombieAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 2;
        this.endFrameY = 4;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 166;
        this.spriteH = 144;
        this.animationSpeed = 4;

        // Offset for drawing mage
        this.offsetX = 70;
        this.offsety = 70;
    }

    attackAnimation() {
        this.startFrameX = 3;
        this.startFrameY = 4;
        this.endFrameX = 9;
        this.endFrameY = 7;
    }

    dieAnimation() {
        this.startFrameX = 10;
        this.startFrameY = 7;
        this.endFrameX = 4;
        this.endFrameY = 11;
        this.increment = 0;
    }
}
