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
        this.attacking = false;
        this.health = 100;
        this.cooldown = 0;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "gold";
        ctx.font = "20px Arial";
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 20);
    }

    handleCollision() {
        this.game.zombies.forEach((zombie) => {
            if (isCollided(this, zombie)) {
                this.health -= 0.2;
                zombie.increment = 0;
                zombie.attacking = true;
            }
        });
    }

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
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new PeaShooter(
                        this.game,
                        this.x + CELL_WIDTH / 2,
                        this.y + CELL_HEIGHT / 2,
                        10,
                        10
                    )
                );
            }
        } else {
            this.cooldown = 0;
        }
        this.draw();
    }
}

export class Repeater extends Plant {
    attack() {
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new Projectile(
                        this.x + CELL_WIDTH / 2 + 40,
                        this.y + CELL_HEIGHT / 2,
                        10,
                        10
                    )
                );
                this.game.projectiles.push(
                    new Projectile(
                        this.x + CELL_WIDTH / 2,
                        this.y + CELL_HEIGHT / 2,
                        10,
                        10
                    )
                );
            }
        } else {
            this.cooldown = 0;
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
                        this.x + CELL_WIDTH / 2,
                        this.y + CELL_HEIGHT / 2,
                        10,
                        10
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
    attack() {
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new Projectile(
                        this.x + CELL_WIDTH / 2,
                        this.y + CELL_HEIGHT / 2,
                        10,
                        10
                    )
                );

                if (!(this.y - CELL_HEIGHT <= GRID_ROW_START_POS)) {
                    this.game.projectiles.push(
                        new TopProjectile(
                            this.x + CELL_WIDTH / 2,
                            this.y + CELL_HEIGHT / 2,
                            10,
                            10
                        )
                    );
                }

                if (!(this.y + CELL_HEIGHT) >= GRID_ROW_START_POS) {
                    this.game.projectiles.push(
                        new BottomProjectile(
                            this.x + CELL_WIDTH / 2,
                            this.y + CELL_HEIGHT / 2,
                            10,
                            10
                        )
                    );
                }
            }
        } else {
            this.cooldown = 0;
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
    attack() {
        if (this.attacking && !this.cooldown) {
            this.game.zombies.every((zombie) => {
                if (
                    zombie.y === this.y &&
                    zombie.x - (this.x + this.w) <= CELL_WIDTH &&
                    zombie.x - (this.x + this.w) >= -CELL_WIDTH
                ) {
                    zombie.delete = true;
                    this.cooldown = true;
                    setTimeout(() => {
                        this.cooldown = false;
                    }, 8000);
                    return false;
                }
                return true;
            });
        }
        this.draw();
    }
}
export class WallNut extends Plant {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.health = 1000;
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
                    new ParabolicProjectile(this.game, this.x, this.y, 15, 15)
                );
            }
        } else {
            this.cooldown = 0;
        }
        this.draw();
    }
}
