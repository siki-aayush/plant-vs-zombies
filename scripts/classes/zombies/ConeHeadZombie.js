import NormalZombie from "./NormalZombie.js";

export default class ConeHeadZombie extends NormalZombie {
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
        this.zombieType.src = "/assets/images/ConeheadZombieSprite_166x144.png";
    }
}
