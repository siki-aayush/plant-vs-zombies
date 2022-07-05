import {
    CELL_PAD,
    ctx,
    FootballZombieSprite,
    zombieFall,
} from "../../constants.js";

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
        this.zombieType = FootballZombieSprite;
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
            this.game.volume && zombieFall.play();
            this.dieAnimation();
            this.checkFrames();
            this.removeZombies();
        }

        this.loopAnimation();
        this.draw(ctx);
    }
}
