import { CELL_HEIGHT } from "../../constants.js";
import Projectile from "./Projectile.js";

export default class TopProjectile extends Projectile {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.topPos = y - CELL_HEIGHT;
    }
    update() {
        this.x += this.speed;
        if (this.y > this.topPos) {
            this.y -= this.speed;
        }
        this.draw();
        this.checkCollision();
    }
}
