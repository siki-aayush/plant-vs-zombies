import Plant from "./Plant.js";
import { ParabolicProjectile } from "../Projectile.js";

export default class MelonPult extends Plant {
    attack() {
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new ParabolicProjectile(this.game, this.x, this.y, 62, 55)
                );
            }
        } else {
            this.cooldown = 0;
        }
    }
}
