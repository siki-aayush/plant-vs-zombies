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
        this.zombieType = new Image();
        this.zombieType.src =
            "/assets/images/BucketheadZombieSprite_166x144.png";
    }
}
