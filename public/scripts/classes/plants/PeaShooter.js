import Plant from "./Plant.js";
import { CELL_WIDTH, peaShoot } from "../../constants.js";
import Projectile from "../projectiles/Projectile.js";

export default class PeaShooter extends Plant {
    static cost = 25;
    attack() {
        if (this.game.frames % 100 === 0) {
            this.attackNow = true;
        }
        if (
            this.attacking &&
            this.attackNow &&
            this.frameX === 3 &&
            this.frameY === 1
        ) {
            this.attackNow = false;
            this.game.volume && peaShoot.play();
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
    }
}
