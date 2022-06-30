import { CELL_PAD, ctx, zombieFall } from "../constants.js";

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
        this.die = false;
        this.hit = false;

        this.initZombieSpecs();
        this.initZombieAnimation();
        this.loadSprite();
    }

    // Initialilzes all the features of zombie
    initZombieSpecs() {
        // Movement variables
        //this.velocity = Math.random() * 0.8 + 0.4;
        this.velocity = 2;
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
        // If hit decreases the opacity
        if (this.hit) {
            ctx.globalAlpha = 0.6;
        }
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

        // Resets the opacity after 100 ms
        if (this.hit) {
            ctx.globalAlpha = 1;
            setTimeout(() => {
                this.hit = false;
            }, 100);
        }
    }

    // Changes the frame to attacking
    attackAnimation() {
        this.startFrameX = 8;
        this.startFrameY = 2;
        this.endFrameX = 10;
        this.endFrameY = 5;
    }

    // Removes the zombies
    removeZombies() {
        if (this.frameX === this.endFrameX && this.frameY === this.endFrameY) {
            let attackRowIdx = this.game.zombiesPositions.indexOf(this.y);
            this.game.zombiesPositions.splice(attackRowIdx, 1);
            this.delete = true;
            this.game.score += 10;
        }
    }

    // Sets the frames to the startFrames if not between start frame and end frame
    checkFrames() {
        if (this.frameY < this.startFrameY || this.frameY > this.endFrameY) {
            this.frameX = this.startFrameX;
            this.frameY = this.startFrameY;
        } else if (
            this.frameY === this.startFrameY &&
            this.frameX < this.startFrameX
        ) {
            this.frameX = this.startFrameX;
        }
    }

    // Sets the start frames and end frame to the dieFrame
    dieAnimation() {
        this.startFrameX = 3;
        this.startFrameY = 9;
        this.endFrameX = 9;
        this.endFrameY = 10;
        this.increment = 0;
    }

    // Loops the animation between the start frame and end frame
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

    // Updates the positions and Animations
    update() {
        this.x -= this.increment;
        if (this.attacking) {
            this.attackAnimation();
        }

        if (this.die) {
            zombieFall.play();
            this.dieAnimation();
            this.checkFrames();
            this.removeZombies();
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

    dieAnimation() {
        this.startFrameX = 10;
        this.startFrameY = 7;
        this.endFrameX = 4;
        this.endFrameY = 11;
        this.increment = 0;
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

export class DragonZombie extends Zombie {
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

    loadSprite() {
        this.zombieType = new Image();
        this.zombieType.src = "../../assets/images/dragonZombie_464x400.png";
    }
}

export class BallonZombie extends Zombie {
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
        this.zombieType.src =
            "../../assets/images/ballonZombieSprite_207x197.png";
    }
}
