import { CELL_PAD, ctx, PeaShooterSprite } from "../../constants.js";
import { isCollided } from "../../utils.js";

export default class Plant {
    /**
     * constructor.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    constructor(game, x, y, w, h) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w - CELL_PAD * 2;
        this.h = h - CELL_PAD * 2;
        this.attackNow = false;

        this.initPlantSpec();
        this.initPlantAnimation();
        this.loadSprite();
    }

    // Initializes all the features of plants
    initPlantSpec() {
        // Life
        this.health = 100;
        this.bulletW = 60;
        this.bulletH = 40;

        // Plant status
        this.attacking = false;
        this.cooldown = false;
    }

    // Initializes all the variables required for animation
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
        this.spriteW = 71;
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
        this.plantType = PeaShooterSprite;
    }

    // Draws the plant
    draw() {
        if (this.x === undefined) {
            console.log("undefined detected");
        }
        ctx.drawImage(
            this.plantType,
            this.frameX * this.spriteW,
            this.frameY * this.spriteH,
            this.spriteW,
            this.spriteH,
            this.x - this.offsetX,
            this.y - this.offsety,
            this.w + this.offsetW,
            this.h + this.offsetH
        );
    }

    // If the plant collides with zombie then the plant health decreases
    // with respect to the damage of the plant
    handleCollision() {
        this.game.zombies.forEach((zombie) => {
            if (isCollided(this, zombie)) {
                this.health -= 0.2;
                zombie.increment = 0;
                zombie.attacking = true;
            }
        });
    }

    // Animates the plant according to the startFrames and endFrames
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

    //attacks
    attack() {}

    // Changes animation (Idle attack die)
    updateAnimation() {}

    update() {
        // Plants start attacking if if the zombies are in the same row
        if (this.game.zombiesPositions.indexOf(this.y) !== -1) {
            this.attacking = true;
        } else {
            this.attacking = false;
        }

        // Shoot bullets
        this.attack();
        this.handleCollision();
        this.loopAnimation();
        this.updateAnimation();

        // If the plant dies all the zombies stopped by the plant starts moving again
        if (this.health <= 0) {
            this.game.zombies.forEach((zombie) => {
                if (isCollided(this, zombie)) {
                    zombie.increment = zombie.velocity;
                    zombie.attacking = false;
                    zombie.initZombieAnimation();
                }
            });
        }
        this.draw();
    }
}
