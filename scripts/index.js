import Cell from "./classes/Cell.js";
import Plant, {
    Chomper,
    PeaShooter,
    PotatoMines,
    Repeater,
    Spikeweed,
    ThreePeaShooter,
    WallNut,
} from "./classes/Plant.js";
import Sun from "./classes/Sun.js";
import Zombie from "./classes/Zombie.js";

import { initializeGrid, isCollided } from "./utils.js";
import {
    canvas,
    ctx,
    CELL_WIDTH,
    CELL_HEIGHT,
    mouseStatus,
    bg,
    GRID_COL_START_POS,
    GRID_ROW_START_POS,
    gameState,
    CELL_PAD,
} from "./constants.js";

class Game {
    constructor() {
        this.canvasPosition = canvas.getBoundingClientRect();
        this.grids = [];
        this.plants = [];
        this.zombies = [];
        this.suns = [];
        this.projectiles = [];
        this.sunCounts = 200;
        this.zombiesSpawnRate = 200;
        this.zombiesPositions = [];
        this.frames = 0;
    }

    adddListeners() {
        window.addEventListener("resize", () => {
            this.canvasPosition = canvas.getBoundingClientRect();
        });

        // Updates the position of the mouseState variable when mouse moves
        canvas.addEventListener("mousemove", (e) => {
            mouseStatus.x = e.x - this.canvasPosition.left;
            mouseStatus.y = e.y - this.canvasPosition.top;
        });

        // Updates the position of the mouseState variable when mouse moves
        canvas.addEventListener("mouseleave", (e) => {
            mouseStatus.x = 0;
            mouseStatus.y = 0;
        });

        // Adds click listener on canvas
        canvas.addEventListener("click", () => {
            let cellPosX;
            let cellPosY;
            let plantCost = 25;

            // Find the collided cell and extracts it's position
            this.grids.every((cell) => {
                if (isCollided(cell, mouseStatus)) {
                    cellPosX = cell.x + CELL_PAD;
                    cellPosY = cell.y + CELL_PAD;
                    return false; // Stops the loop
                }
                return true; // Continues iterating through the loop
            });

            // Stops from placing the plants outside of the grid
            if (
                cellPosX < GRID_COL_START_POS ||
                cellPosY < GRID_ROW_START_POS
            ) {
                return;
            }

            // Checks whether there is already a plant in selected cell
            for (let i = 0; i < this.plants.length; i++) {
                if (
                    this.plants[i].x === cellPosX &&
                    this.plants[i].y === cellPosY
                ) {
                    return;
                }
            }

            //console.log("clicked", plantCost, this.sunCounts);
            //If the user has required number of sun then the plant is placed at the selected cell position
            if (plantCost <= this.sunCounts) {
                this.plants.push(
                    new Spikeweed(
                        this,
                        cellPosX,
                        cellPosY,
                        CELL_WIDTH,
                        CELL_HEIGHT
                    )
                );

                this.sunCounts -= plantCost;
            }
        });
    }

    //Draws the grid
    drawGrid() {
        this.grids.forEach((gridCell) => {
            gridCell.draw();
        });
    }

    // Draws the plants
    manageAllPlants() {
        this.plants.forEach((plant) => {
            plant.update();
            // Shoot bullets
            //plant.attack();

            //// Plants start attacking if if the zombies are in the same row
            //if (this.zombiesPositions.indexOf(plant.y) !== -1) {
            //    plant.attacking = true;
            //} else {
            //    plant.attacking = false;
            //}

            //// Checks collision and decreases the plant health on collision and stop the movement of zombies
            //// If the plant health is below zero move the zombies again
            //this.zombies.forEach((zombie) => {
            //    if (isCollided(plant, zombie)) {
            //        plant.health -= 0.2;
            //        zombie.increment = 0;
            //    }
            //});

            //// If the plant dies all the zombies stopped by the plant starts moving again
            //if (plant.health <= 0) {
            //    this.zombies.forEach((zombie) => {
            //        if (isCollided(plant, zombie)) {
            //            zombie.increment = zombie.velocity;
            //        }
            //    });
            //}
        });

        // Removes plants whose health are below 0
        this.plants = this.plants.filter((plant) => plant.health > 0);
    }

    manageAllZombies() {
        this.zombies.forEach((zombie) => {
            zombie.update();
            if (zombie.x < GRID_COL_START_POS) {
                gameState.current = gameState.gameOver;
            }

            if (zombie.health <= 0) {
                // Delete the dead zombies from attacking row lists
                let attackRowIdx = this.zombiesPositions.indexOf(zombie.y);
                this.zombiesPositions.splice(attackRowIdx, 1);

                // sets the zombie as orphan to be deleted during clearing process
                zombie.delete = true;
            }
        });
        let selectedRow = CELL_HEIGHT + GRID_ROW_START_POS + CELL_PAD;

        //let selectedRow =
        //    Math.floor(Math.random() * 5) * CELL_HEIGHT +
        //    GRID_ROW_START_POS +
        //    CELL_PAD;
        if (this.frames % this.zombiesSpawnRate === 0) {
            this.zombies.push(
                new Zombie(
                    this,
                    canvas.width,
                    selectedRow,
                    CELL_WIDTH,
                    CELL_HEIGHT
                )
            );

            this.zombiesPositions.push(selectedRow);
            this.zombiesSpawnRate -= this.zombiesSpawnRate > 300 ? 20 : 0;
        }
    }

    manageAllProjectiles() {
        this.projectiles.forEach((projectile) => {
            // Update projectile positionsl
            projectile.update();

            this.zombies.every((zombie) => {
                if (isCollided(projectile, zombie)) {
                    zombie.health -= projectile.damage;
                    projectile.delete = true;
                    return false;
                }
                return true;
            });
            if (projectile > canvas.width - CELL_WIDTH) {
                projectile.delete = true;
            }
        });
    }

    manageSuns() {
        if (this.frames % 300 === 0) {
            let x =
                Math.random() * (canvas.width - CELL_WIDTH) +
                GRID_COL_START_POS;
            let y = Math.random() * 5 * CELL_HEIGHT + GRID_ROW_START_POS;
            this.suns.push(new Sun(x, y, 0));
        }

        this.suns.forEach((sun) => {
            sun.update();
            if (isCollided(sun, mouseStatus)) {
                this.sunCounts += sun.value;
                sun.collect = true;
                //sun.delete = true;
            }
        });
    }

    cleanOrphanObjects() {
        // Clears orphan projectiles
        this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.delete
        );

        // Clears orphan suns
        this.suns = this.suns.filter((sun) => !sun.delete);

        // Clears orphan zombies
        this.zombies = this.zombies.filter((zombie) => !zombie.delete);
    }

    showResources() {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Sun: " + this.sunCounts, 0, 30);
        if (gameState.current === gameState.gameOver) {
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        }
    }

    // Creates an animation loop
    animate = () => {
        ctx.fillStyle = "black";
        ctx.drawImage(bg, 0, 0, 1540, 600);
        //ctx.fillRect(0, 0, colSize.width, colSize.height);
        this.drawGrid();

        // Manages the objects in the game
        this.manageAllPlants();
        this.manageAllZombies();
        this.manageAllProjectiles();
        this.manageSuns();

        this.showResources();
        this.cleanOrphanObjects();

        // Increases frame by 1 on every loop (used as a timer)
        this.frames++;

        // If the game is over it stops the animationFrame
        if (gameState.current !== gameState.gameOver)
            requestAnimationFrame(this.animate);
    };

    init() {
        this.grids = initializeGrid(Cell);
        this.adddListeners();
        this.animate();
    }
}

const game = new Game();
game.init();
