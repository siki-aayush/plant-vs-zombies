import Plant, {
    Chomper,
    MelonPult,
    PeaShooter,
    PotatoMines,
    Repeater,
    Spikeweed,
    ThreePeaShooter,
    WallNut,
} from "./classes/Plant.js";
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
    PeaShooterCard,
    ThreePeaShooterCard,
    RepeaterCard,
    ChomperCard,
    WallNutCard,
    PotatoMinesCard,
} from "./constants.js";
import Cell from "./classes/Cell.js";
import Sun from "./classes/Sun.js";
import Zombie, {
    BucketHeadZombie,
    ConeHeadZombie,
    NormalZombie,
} from "./classes/Zombie.js";
import { initializeGrid, isCollided } from "./utils.js";

class Game {
    constructor() {
        this.canvasPosition = canvas.getBoundingClientRect();
        this.grids = [];
        this.zombies = [];
        this.suns = [];
        this.projectiles = [];
        this.sunCounts = 200;
        this.zombiesSpawnRate = 200;
        this.zombiesPositions = [];
        this.selectedPlant = 0;
        this.frames = 0;
        this.plants = [];

        this.zombiesTypes = [
            BucketHeadZombie,
            ConeHeadZombie,
            NormalZombie,
            Zombie,
        ];

        this.plantsTypes = [
            {
                card: PeaShooterCard,
                blueprint: PeaShooter,
            },
            {
                card: RepeaterCard,
                blueprint: Repeater,
            },
            {
                card: ThreePeaShooterCard,
                blueprint: ThreePeaShooter,
            },
            {
                card: ChomperCard,
                blueprint: Chomper,
            },
            {
                card: WallNutCard,
                blueprint: WallNut,
            },
            {
                card: PotatoMinesCard,
                blueprint: PotatoMines,
            },
        ];
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

        canvas.addEventListener("mousedown", () => {
            mouseStatus.clicked = true;
        });

        canvas.addEventListener("mouseup", () => {
            mouseStatus.clicked = false;
        });

        // Adds click listener on canvas
        canvas.addEventListener("click", (e) => {
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
                cellPosX === undefined ||
                cellPosY === undefined ||
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

            //If the user has required number of sun then the plant is placed at the selected cell position
            if (plantCost <= this.sunCounts) {
                this.plants.push(
                    new this.plantsTypes[this.selectedPlant].blueprint(
                        this,
                        cellPosX,
                        cellPosY,
                        CELL_WIDTH - 25,
                        CELL_HEIGHT - 25
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
        console.log("plants", this.plants);
        this.plants.forEach((plant) => {
            plant.update();
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
        //let selectedRow = CELL_HEIGHT + GRID_ROW_START_POS + CELL_PAD;

        let selectedRow =
            Math.floor(Math.random() * 5) * CELL_HEIGHT +
            GRID_ROW_START_POS +
            CELL_PAD;
        if (this.frames % this.zombiesSpawnRate === 0) {
            let choice = Math.floor(Math.random() * this.zombiesTypes.length);
            this.zombies.push(
                new this.zombiesTypes[choice](
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

    choosePlants() {
        if (isCollided(mouse)) {
        }
    }

    showCards() {
        this.plantsTypes.forEach((plant, idx) => {
            let cardBoundary = {
                x: 20,
                y: GRID_ROW_START_POS + 80 * idx,
                w: 100,
                h: 60,
            };
            let cardY = GRID_ROW_START_POS + 80 * idx;
            ctx.drawImage(
                plant.card,
                0,
                0,
                cardBoundary.w,
                cardBoundary.h,
                cardBoundary.x,
                cardY,
                idx === this.selectedPlant
                    ? cardBoundary.w + 15
                    : cardBoundary.w,
                idx === this.selectedPlant ? cardBoundary.h + 8 : cardBoundary.h
            );

            if (isCollided(mouseStatus, cardBoundary) && mouseStatus.clicked) {
                this.selectedPlant = idx;
            }
        });
    }

    // Creates an animation loop
    animate = () => {
        ctx.fillStyle = "black";
        //ctx.drawImage(bg, 0, 0, 1540, 600);
        //ctx.fillRect(0, 0, colSize.width, colSize.height);
        ctx.drawImage(bg, 0, 0, canvas.width + 573, canvas.height);
        this.drawGrid();

        // Manages the objects in the game
        this.manageAllPlants();
        this.manageAllZombies();
        this.manageAllProjectiles();
        this.manageSuns();

        this.showResources();
        this.cleanOrphanObjects();
        this.showCards();

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
