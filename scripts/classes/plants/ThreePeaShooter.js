import Projectile from "../projectiles/Projectile.js";
import TopProjectile from "../projectiles/TopProjectile.js";
import BottomProjectile from "../projectiles/BottomProjectile.js";

import {
    CELL_PAD,
    CELL_WIDTH,
    CELL_HEIGHT,
    GRID_ROW_START_POS,
    peaShoot,
    ThreepeaShooterSprite,
} from "../../constants.js";
import { isCollided } from "../../utils.js";
import Plant from "./Plant.js";

export default class ThreePeaShooter extends Plant {
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
        this.plantType = ThreepeaShooterSprite;
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
            peaShoot.play();
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

        this.draw();
    }
}
