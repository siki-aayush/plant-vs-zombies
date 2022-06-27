import Projectile, {
    BottomProjectile,
    ParabolicProjectile,
    TopProjectile,
} from "./Projectile.js";
import {
    CELL_PAD,
    CELL_WIDTH,
    CELL_HEIGHT,
    ctx,
    GRID_ROW_START_POS,
} from "../constants.js";
import { isCollided } from "../utils.js";

export default class Plant {
    /**
     * constructor.
     *
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

        // Zombie status
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
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/PeashooterSprite_71x71.png";
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
    }
}

export class PeaShooter extends Plant {
    attack() {
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
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2,
                    this.y + 19,
                    this.bulletW,
                    this.bulletH
                )
            );
        }
        this.draw();
    }
}

export class Repeater extends Plant {
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
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2 + 40,
                    this.y + CELL_HEIGHT / 2,
                    this.bulletW,
                    this.bulletH
                )
            );
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2,
                    this.y + CELL_HEIGHT / 2,
                    this.bulletW,
                    this.bulletH
                )
            );
        }
        this.draw();
    }
}

export class snowPea extends Plant {
    attack() {
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new Projectile(
                        this.game,
                        this.x + CELL_WIDTH / 2,
                        this.y + CELL_HEIGHT / 2,
                        this.bulletW,
                        this.bulletH
                    )
                );
            }
        } else {
            this.cooldown = 0;
        }
        this.draw();
    }
}

export class ThreePeaShooter extends Plant {
    // Initializes all the variables required for animation
    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 4;
        this.endFrameY = 1;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 73;
        this.spriteH = 80;
        this.animationSpeed = 5;

        // Offset for drawing image
        this.offsetX = 0;
        this.offsety = 0;
        this.offsetW = 0;
        this.offsetH = 0;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/ThreepeaterSprite_73x80.png";
    }

    attack() {
        if (this.game.frames % 100 == 0) {
            this.attackNow = true;
        }
        if (
            this.attacking &&
            this.attackNow === true &&
            this.frameX === 4 &&
            this.frameY === 1
        ) {
            this.attackNow = false;
            // Middle projectile
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2 + 28,
                    this.y + 28,
                    this.bulletW,
                    this.bulletH
                )
            );

            // Fires top projectile only if the plant is not in the top boundary
            if (!(this.y - CELL_HEIGHT <= GRID_ROW_START_POS)) {
                this.game.projectiles.push(
                    new TopProjectile(
                        this.game,
                        this.x + CELL_WIDTH / 2 + 28,
                        this.y + 28,
                        this.bulletW,
                        this.bulletH
                    )
                );
            }

            // Fires bottom projectile only if the plant is not in the bottom boundary
            if (
                this.y + CELL_HEIGHT <
                5 * CELL_HEIGHT + GRID_ROW_START_POS + CELL_PAD
            ) {
                console.log("inside");
                this.game.projectiles.push(
                    new BottomProjectile(
                        this.game,
                        this.x + CELL_WIDTH / 2 + 28,
                        this.y + 28,
                        this.bulletW,
                        this.bulletH
                    )
                );
            }
        }
        this.draw();
    }

    update() {
        // ThreePeaShooter starts attacking if if the zombies are in the same row, topp row and bottom row
        if (
            this.game.zombiesPositions.indexOf(this.y) !== -1 ||
            this.game.zombiesPositions.indexOf(this.y - CELL_HEIGHT) !== -1 ||
            this.game.zombiesPositions.indexOf(this.y + CELL_HEIGHT) !== -1
        ) {
            this.attacking = true;
        } else {
            this.attacking = false;
        }

        // Shoot bullets
        this.attack();
        this.handleCollision();
        this.loopAnimation();

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
    }
}

export class Chomper extends Plant {
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
        this.spriteW = 130;
        this.spriteH = 114;
        this.animationSpeed = 5;

        // Offset for drawing image
        this.offsetX = 0;
        this.offsety = 30;
        this.offsetW = 50;
        this.offsetH = 50;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/ChomperSprite_130x114.png";
    }

    updateAnimation() {
        if (this.attackNow) {
            // If attacking show attack animation
            this.startFrameX = 3;
            this.startFrameY = 2;
            this.endFrameX = 5;
            this.endFrameY = 4;

            // Stop the attacking mode after the animation is finished
            this.attackNow = false;
        } else if (this.cooldown) {
            // If in cooldown shows the digesting animation
            this.startFrameX = 6;
            this.startFrameY = 4;
            this.endFrameX = 10;
            this.endFrameY = 5;
        } else if (!this.attackNow && !this.cooldown) {
            // Shows idle animation if neither are true
            this.startFrameX = 0;
            this.startFrameY = 0;
            this.endFrameX = 2;
            this.endFrameY = 2;
        }
    }

    attack() {
        if (this.attacking && !this.cooldown) {
            this.game.zombies.every((zombie) => {
                if (
                    zombie.y === this.y &&
                    zombie.x - (this.x + this.w) <= CELL_WIDTH - 50 &&
                    zombie.x - (this.x + this.w) >= -CELL_WIDTH
                ) {
                    // Set the attacking mode true
                    this.attackNow = true;
                    this.cooldown = true;

                    // Set the frame on attacking animation frame
                    this.frameX = 9;
                    this.frameY = 2;

                    // Eat the zombie
                    zombie.delete = true;

                    // Give a cooldown of 10 sec before it can eat again and
                    // reset the animation frame
                    setTimeout(() => {
                        this.cooldown = false;
                        this.frameX = 0;
                        this.frameY = 0;
                    }, 10000);

                    // stop the loop
                    return false;
                }

                // continue the loop
                return true;
            });
        }
        this.draw();
    }
}
export class WallNut extends Plant {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.health = 500;
    }
    // Initializes all the variables required for animation
    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 5;
        this.endFrameY = 1;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 65;
        this.spriteH = 73;
        this.animationSpeed = 4;

        // Offset for drawing image
        this.offsetX = 0;
        this.offsety = 0;
        this.offsetW = 0;
        this.offsetH = 0;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/WallNutSprite_65x73.png";
    }

    // Updates the animation
    updateAnimation() {
        if (this.health < 300) {
            this.startFrameX = 1;
            this.startFrameY = 3;
            this.endFrameX = 6;
            this.endFrameY = 4;
        } else if (this.health < 100) {
            this.startFrameX = 6;
            this.startFrameY = 1;
            this.endFrameX = 0;
            this.endFrameY = 3;
        }
    }

    attack() {
        this.draw();
    }
}

export class PotatoMines extends Plant {
    attack() {
        this.game.zombies.forEach((zombie) => {
            if (isCollided(this, zombie) && zombie.x + zombie.w > this.x) {
                zombie.delete = true;
                this.health = 0;
            }
        });
        this.draw();
    }
}

export class Spikeweed extends Plant {
    initPlantAnimation() {
        // Animation support variables
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 9;
        this.endFrameY = 1;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 100;
        this.spriteH = 41;
        this.animationSpeed = 5;

        // Offset for drawing image
        this.offsetX = 0;
        this.offsety = -75;
        this.offsetW = 20;
        this.offsetH = -50;
    }

    // Loads the sprite of the zombie
    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/SpikeweedSprite_100x41.png";
    }

    handleCollision() {
        this.game.zombies.forEach((zombie) => {
            if (isCollided(this, zombie)) {
                zombie.health -= 0.12;
            }
        });
    }

    attack() {
        this.draw();
    }
}

export class MelonPult extends Plant {
    attack() {
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new ParabolicProjectile(this.game, this.x, this.y, 65, 45)
                );
            }
        } else {
            this.cooldown = 0;
        }
        this.draw();
    }
}
