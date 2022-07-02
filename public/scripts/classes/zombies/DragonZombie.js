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
        this.endFrameX = 6;
        this.endFrameY = 2;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 464;
        this.spriteH = 400;
        this.animationSpeed = 4;

        // Offset for drawing mage
        this.offsetX = 200;
        this.offsety = 200;
    }
    attackAnimation() {}

    loadSprite() {
        this.zombieType = DragonZombieSprite;
    }
}
