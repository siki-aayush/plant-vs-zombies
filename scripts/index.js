import Plant, {
    Chomper,
    MelonPult,
    PeaShooter,
    PotatoMines,
    Repeater,
    Spikeweed,
    Sunflower,
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
    resourcescard,
    MelonPultCard,
    SpikeweedCard,
    SunflowerCard,
    LAWN_CLEANER_WIDTH,
    Button,
} from "./constants.js";
import Cell from "./classes/Cell.js";
import Sun from "./classes/Sun.js";
import LawnCleaner from "./classes/LawnCleaner.js";
import Zombie, {
    BucketHeadZombie,
    ConeHeadZombie,
    NormalZombie,
    DragonZombie,
    BallonZombie,
} from "./classes/Zombie.js";
import { initializeGrid, isCollided } from "./utils.js";

class Game {
    constructor() {
        this.canvasPosition = canvas.getBoundingClientRect();
        this.animationId = undefined;

        this.startMenu = document.querySelector(".start-menu");
        this.startBtn = document.querySelector(".start-menu__btn");
        this.endMenu = document.querySelector(".end-menu");
        this.endBtn = document.querySelector(".end-menu__btn");
        this.endScore = document.querySelector(".end-menu__score");
        this.endHighscore = document.querySelector(".end-menu__highscore");

        this.grids = [];
        this.zombies = [];
        this.suns = [];
        this.projectiles = [];
        this.plants = [];
        this.lawnCleaners = [];

        this.score = 0;
        this.highScore = 0;
        this.sunCounts = 200;
        this.zombiesSpawnRate = 200;
        this.zombiesPositions = [];
        this.selectedPlant = 0;
        this.frames = 1;

        this.zombiesTypes = [
            BallonZombie,
            BucketHeadZombie,
            ConeHeadZombie,
            NormalZombie,
            Zombie,
            DragonZombie,
        ];

        this.plantsTypes = [
            {
                card: SunflowerCard,
                blueprint: Sunflower,
            },
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
            {
                card: SpikeweedCard,
                blueprint: Spikeweed,
            },
            {
                card: MelonPultCard,
                blueprint: MelonPult,
            },
        ];
    }

    adddListeners() {
        // Get the relative position of the canvas
        window.addEventListener("resize", () => {
            this.canvasPosition = canvas.getBoundingClientRect();
        });

        this.startBtn.addEventListener("click", () => {
            console.log("testing");
            this.startMenu.classList.add("hide");
            //this.init();
            this.animate();
        });

        this.endMenu.addEventListener("click", () => {
            this.endMenu.classList.add("hide");
            this.reset();
            this.init();
            this.animate();
        });

        // Updates the position of the mouseState variable when mouse moves
        canvas.addEventListener("mousemove", (e) => {
            mouseStatus.x = e.x - this.canvasPosition.left;
            mouseStatus.y = e.y - this.canvasPosition.top;
        });

        // Updates the position of the mouseState variable when mouse moves
        canvas.addEventListener("mouseleave", () => {
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

    initializeLawnCleaners() {
        for (
            let row = GRID_ROW_START_POS;
            row < canvas.height - CELL_HEIGHT;
            row += CELL_HEIGHT
        ) {
            this.lawnCleaners.push(
                new LawnCleaner(
                    this,
                    350,
                    row + 30,
                    LAWN_CLEANER_WIDTH,
                    LAWN_CLEANER_WIDTH
                )
            );
        }
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
        });

        // Removes plants whose health are below 0
        this.plants = this.plants.filter((plant) => plant.health > 0);
    }

    manageAllZombies() {
        this.zombies.forEach((zombie) => {
            zombie.update();

            if (zombie.x < GRID_COL_START_POS - LAWN_CLEANER_WIDTH) {
                gameState.current = gameState.gameOver;
            }

            if (zombie.health <= 0) {
                zombie.die = true;
                zombie.attacking = false;
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
            projectile.update();
        });
    }

    manageSuns() {
        if (this.frames % 300 === 0) {
            let x =
                Math.random() * (canvas.width - CELL_WIDTH * 2) +
                GRID_COL_START_POS;
            let y = Math.random() * 5 * CELL_HEIGHT + GRID_ROW_START_POS;
            this.suns.push(new Sun(this, x, y, 0));
        }

        this.suns.forEach((sun) => {
            sun.update();
            if (isCollided(sun, mouseStatus)) {
                this.sunCounts += sun.value;
                sun.collect = true;
            }
        });
    }

    manageLawnCleaners() {
        this.lawnCleaners.forEach((lawncleaner) => {
            lawncleaner.update();
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
        ctx.drawImage(resourcescard, 20, 15, 145, 45);
        ctx.fillStyle = "black";
        ctx.font = "30px Creepster";
        ctx.fillText(this.sunCounts, 79, 48);

        //highScore
        ctx.font = "25px Creepster";
        ctx.fillStyle = "#ffe9ac";
        ctx.drawImage(Button, canvas.width - 225, 10, 225, 60);
        ctx.fillText(`High Score: ${this.highScore}`, canvas.width - 195, 44);

        // Score
        ctx.fillStyle = "#ffe9ac";
        ctx.drawImage(Button, 20, 70, 135, 50);
        ctx.fillText(`Score ${this.score}`, 39, 101);
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
        //this.drawGrid();

        // Manages the objects in the game
        this.manageAllPlants();
        this.manageAllZombies();
        this.manageAllProjectiles();
        this.showResources();
        this.manageSuns();
        this.manageLawnCleaners();

        this.cleanOrphanObjects();
        this.showCards();

        // Increases frame by 1 on every loop (used as a timer)
        this.frames++;

        // If the game is over it stops the animationFrame
        if (gameState.current !== gameState.gameOver) {
            this.animationId = requestAnimationFrame(this.animate);
        } else if (gameState.current === gameState.gameOver) {
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
            this.endMenu.classList.remove("hide");
            fetch("http://localhost:3000/highscore", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ score: this.score }),
            });
            this.endScore.innerHTML = `Score: ${this.score}`;
            this.endHighscore.innerHTML =
                this.score >= this.highScore
                    ? `High Score: ${this.score}`
                    : `High Score: ${this.highScore}`;
            //cancelAnimationFrame(this.animationId);
        }
    };

    reset() {
        this.zombies = [];
        this.suns = [];
        this.projectiles = [];
        this.plants = [];
        this.lawnCleaners = [];
        this.grids = [];

        this.frames = 1;
        this.score = 0;

        gameState.current = gameState.gamePlaying;
    }

    async init() {
        let data = await fetch("http://localhost:3000/highscore");
        let parsedData = await data.json();
        this.highScore = parsedData.highscore;
        this.grids = initializeGrid(Cell);
        this.initializeLawnCleaners();
        this.adddListeners();
    }
}

const game = new Game();
game.init();
