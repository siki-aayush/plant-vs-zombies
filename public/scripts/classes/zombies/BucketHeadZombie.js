import { BucketHeadZombieSprite } from "../../constants.js";
import NormalZombie from "./NormalZombie.js";

export default class BucketHeadZombie extends NormalZombie {
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
        this.zombieType = BucketHeadZombieSprite;
    }
}
