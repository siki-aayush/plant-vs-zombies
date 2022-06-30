import Zombie from "./Zombie.js";

export default class BallonZombie extends Zombie {
    initZombieSpecs() {
        // Movement variables
        this.velocity = 1;
        this.increment = this.velocity;

        // Life
        this.health = 200;

        // Zombie status
        this.delete = false;
        this.attacking = false;
        this.drop = true;
    }

    initZombieAnimation() {
        // Animation support variables
        if (this.drop) {
            this.startFrameX = 0;
            this.startFrameY = 0;
            this.endFrameX = 1;
            this.endFrameY = 1;
        } else {
            this.startFrameX = 7;
            this.startFrameY = 8;
            this.endFrameX = 3;
            this.endFrameY = 12;
        }
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 207;
        this.spriteH = 197;
        this.animationSpeed = 4;

        // Offset for drawing mage
        this.offsetX = 90;
        this.offsety = 90;
    }

    dieAnimation() {
        this.startFrameX = 1;
        this.startFrameY = 6;
        this.endFrameX = 6;
        this.endFrameY = 8;
        this.increment = 0;
    }

    attackAnimation() {
        if (this.drop) {
            this.startFrameX = 2;
            this.startFrameY = 1;
            this.endFrameX = 7;
            this.endFrameY = 3;
            if (this.frameY === this.endFrameY) {
                this.drop = false;
            }
        } else {
            this.startFrameX = 8;
            this.startFrameY = 3;
            this.endFrameX = 0;
            this.endFrameY = 6;
            this.checkFrames();
        }
    }

    loadSprite() {
        this.zombieType = new Image();
        this.zombieType.src = "/assets/images/ballonZombieSprite_207x197.png";
    }
}
