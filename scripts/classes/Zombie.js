import { CELL_PAD, ctx } from "../constants.js";

//const zombiesTypes = [];
//const footballZombie = new Image();
//footballZombie.src = "../../assets/images/FootballZombieSprite_300.png";
//zombiesTypes.push(footballZombie);

export default class Zombie {
    /**
     * constructor.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    constructor(game, x, y, w, h) {
        // Main class (Global variablesl)
        this.game = game;

        // Positions
        this.x = x;
        this.y = y;
        this.w = w - CELL_PAD * 2;
        this.h = h - CELL_PAD * 2;

        this.initZombieSpecs();
        this.initZombieAnimation();
        this.loadSprite();
    }

    // Initialilzes all the features of zombie
    initZombieSpecs() {
        // Movement variables
        this.velocity = Math.random() * 0.8 + 0.4;
        this.increment = this.velocity;

        // Life
        this.health = 150;

        // Zombie status
        this.delete = false;
        this.attacking = false;
    }

    // Initializes all the variables required for animation
    initZombieAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 7;
        this.endFrameY = 2;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 300;
        this.spriteH = 300;
        this.animationSpeed = 2;

        // Offset for drawing image
        this.offsetX = 70;
        this.offsety = 70;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.zombieType = new Image();
        this.zombieType.src =
            "../../assets/images/FootballZombieSprite_300.png";
    }

    // Draws the zombie
    draw() {
        ctx.drawImage(
            this.zombieType,
            this.frameX * this.spriteW,
            this.frameY * this.spriteH,
            this.spriteW,
            this.spriteH,
            this.x - this.offsetX,
            this.y - this.offsety,
            this.w + this.offsetX,
            this.h + this.offsety
        );
    }

    attackAnimation() {
        this.startFrameX = 8;
        this.startFrameY = 2;
        this.endFrameX = 10;
        this.endFrameY = 5;
    }

    loopAnimation() {
        if (this.game.frames % this.animationSpeed === 0) {
            if (this.frameY < this.endFrameY) {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX =
                        this.frameY === this.startFrameY
                            ? this.startFrameX
                            : this.minFrame;
                    this.frameY++;
                }
            } else if (this.frameY === this.endFrameY) {
                if (this.frameX < this.endFrameX) {
                    this.frameX++;
                } else {
                    this.frameX = this.startFrameX;
                    this.frameY = this.startFrameY;
                }
            }
        }
    }

    update() {
        this.x -= this.increment;
        if (this.attacking) {
            this.attackAnimation();
        }
        this.loopAnimation();
        this.draw(ctx);
    }
}

export class NormalZombie extends Zombie {
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
        this.zombieType = new Image();
        this.zombieType.src = "../../assets/images/ZombieSprite_166x144.png";
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
}

export class BucketHeadZombie extends NormalZombie {
    initZombieSpecs() {
        // Movement variables
        this.velocity = 0.5;
        this.increment = this.velocity;

        // Life
        this.health = 120;

        // Zombie status
        this.delete = false;
        this.attacking = false;
    }

    loadSprite() {
        this.zombieType = new Image();
        this.zombieType.src =
            "../../assets/images/BucketheadZombieSprite_166x144.png";
    }
}

export class ConeHeadZombie extends NormalZombie {
    initZombieSpecs() {
        // Movement variables
        this.velocity = 0.5;
        this.increment = this.velocity;

        // Life
        this.health = 150;

        // Zombie status
        this.delete = false;
        this.attacking = false;
    }

    loadSprite() {
        this.zombieType = new Image();
        this.zombieType.src =
            "../../assets/images/ConeheadZombieSprite_166x144.png";
    }
}
