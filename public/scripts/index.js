import Chomper from "./classes/plants/Chomper.js";
import MelonPult from "./classes/plants/MelonPult.js";
import PeaShooter from "./classes/plants/PeaShooter.js";
import PotatoMines from "./classes/plants/PotatoMines.js";
import Repeater from "./classes/plants/Repeater.js";
import Spikeweed from "./classes/plants/Spikeweed.js";
import Sunflower from "./classes/plants/Sunflower.js";
import ThreePeaShooter from "./classes/plants/ThreePeaShooter.js";
import WallNut from "./classes/plants/WallNut.js";

import Zombie from "./classes/zombies/Zombie.js";
import NormalZombie from "./classes/zombies/NormalZombie.js";
import BucketHeadZombie from "./classes/zombies/BucketHeadZombie.js";
import ConeHeadZombie from "./classes/zombies/ConeHeadZombie.js";
import BallonZombie from "./classes/zombies/BallonZombie.js";
import DragonZombie from "./classes/zombies/DragonZombie.js";

import Sun from "./classes/Sun.js";
import LawnCleaner from "./classes/LawnCleaner.js";
import {
    getHighScore,
    setHighScore,
    initializeGrid,
    isCollided,
} from "./utils.js";

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
    theme,
    clickSound,
    loadImages,
    loading,
    startMenuBtn,
    ShovelBtn,
    ShovelImg,
    musicImg,
    volumeImg,
} from "./constants.js";

class Game {
    constructor() {
        // Get canvas relative position
        this.canvasPosition = canvas.getBoundingClientRect();
        this.animationId = undefined;

        // Get dom elements
        this.startMenu = document.querySelector(".start-menu");
        this.startBtn = document.querySelector(".start-menu__btn");
        this.endMenu = document.querySelector(".end-menu");
        this.endBtn = document.querySelector(".end-menu__btn");
        this.endScore = document.querySelector(".end-menu__score");
        this.endHighscore = document.querySelector(".end-menu__highscore");

        // Initialize variables
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
        this.plantCooldownTime = 5000; // In millisecond
        this.selectedPlant = 0;
        this.selectedPlantHoverImg = undefined;
        this.frames = 1;

        // Booleans
        this.shovelSelected = false;
        this.music = true;
        this.volume = true;

        // Boundaries
        this.shovelBoundary = {
            x: 200,
            y: 15,
            w: 85,
            h: 85,
        };
        this.musicBoundary = {
            x: canvas.width - 300,
            y: 15,
            w: 40,
            h: 40,
        };

        this.volumeBoudnary = {
            x: canvas.width - 350,
            y: 15,
            w: 40,
            h: 40,
        };

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
                canPlant: true,
            },
            {
                card: PeaShooterCard,
                blueprint: PeaShooter,
                canPlant: true,
            },
            {
                card: RepeaterCard,
                blueprint: Repeater,
                canPlant: true,
            },
            {
                card: ThreePeaShooterCard,
                blueprint: ThreePeaShooter,
                canPlant: true,
            },
            {
                card: ChomperCard,
                blueprint: Chomper,
                canPlant: true,
            },
            {
                card: WallNutCard,
                blueprint: WallNut,
                canPlant: true,
            },
            {
                card: PotatoMinesCard,
                blueprint: PotatoMines,
                canPlant: true,
            },
            {
                card: SpikeweedCard,
                blueprint: Spikeweed,
                canPlant: true,
            },
            {
                card: MelonPultCard,
                blueprint: MelonPult,
                canPlant: true,
            },
        ];
    }

    adddListeners() {
        // Get the new relative position of the canvas on resize
        window.addEventListener("resize", () => {
            this.canvasPosition = canvas.getBoundingClientRect();
        });

        // Plays the game when start button is clicked
        this.startBtn.addEventListener("click", () => {
            this.startMenu.classList.add("hide");
            theme.play();
            theme.volume = 0.3;
            theme.loop = true;
            this.animate();
        });

        // Adds the start button listener
        this.endMenu.addEventListener("click", () => {
            this.endMenu.classList.add("hide");
            this.reset();
            this.init();
            this.animate();
        });

        // Updates the mouse status everytime the mouse moves
        canvas.addEventListener("mousemove", (e) => {
            mouseStatus.x = e.x - this.canvasPosition.left;
            mouseStatus.y = e.y - this.canvasPosition.top;
        });

        // Updates the position of the mouseState variable when mouse moves
        canvas.addEventListener("mouseleave", () => {
            mouseStatus.x = 0;
            mouseStatus.y = 0;
        });

        // Sets the mouse status as clicked when clicked
        canvas.addEventListener("mousedown", () => {
            mouseStatus.clicked = true;
        });

        // Sets the mouse status as unclicked when click is removed
        canvas.addEventListener("mouseup", () => {
            mouseStatus.clicked = false;
        });

        // Adds click listener on canvas
        canvas.addEventListener("click", this.onClick.bind(this));
    }

    // Functions to do on click event
    onClick() {
        this.volume && clickSound.play();
        let cellPosX;
        let cellPosY;

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
            // Unselect the shovel if selected
            if (
                this.shovelSelected &&
                !isCollided(mouseStatus, this.shovelBoundary)
            ) {
                this.shovelSelected = false;
            }
            return;
        }

        // Checks whether there is already a plant in selected cell
        for (let i = 0; i < this.plants.length; i++) {
            if (
                this.plants[i].x === cellPosX &&
                this.plants[i].y === cellPosY
            ) {
                // If the shovel is selected then remove the plant
                if (this.shovelSelected) {
                    this.plants.splice(i, 1);
                    this.shovelSelected = false;
                }
                return;
            }
        }

        //If the user has required number of sun then the plant is placed at the selected cell position
        let CurrentPlant = this.plantsTypes[this.selectedPlant];
        if (
            !this.shovelSelected &&
            CurrentPlant.canPlant &&
            CurrentPlant.blueprint.cost <= this.sunCounts
        ) {
            this.plants.push(
                new CurrentPlant.blueprint(
                    this,
                    cellPosX,
                    cellPosY,
                    CELL_WIDTH - 25,
                    CELL_HEIGHT - 25
                )
            );

            // Subtract the cost of the plant from the sun count
            this.sunCounts -= CurrentPlant.blueprint.cost;

            // Make the plant cannot be placed again until the cooldown time
            CurrentPlant.canPlant = false;
            setTimeout(() => {
                CurrentPlant.canPlant = true;
            }, this.plantCooldownTime);
        }

        this.shovelSelected = false;
    }

    // Initializes the lawn cleaners
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

    // Manages all the zombies on the ground
    manageAllZombies() {
        this.zombies.forEach((zombie) => {
            // Updates the zombies positions and animations
            zombie.update();

            // If zombie reaches the house then the game is set as over
            if (zombie.x < GRID_COL_START_POS - LAWN_CLEANER_WIDTH) {
                gameState.current = gameState.gameOver;
            }

            // If the zomibes health is 0 then the zombie is set as dying and
            // attacking is set as false
            if (zombie.health <= 0) {
                zombie.die = true;
                zombie.attacking = false;
            }
        });

        // Randomly select the row at which the new zombie will spawn
        let selectedRow =
            Math.floor(Math.random() * 5) * CELL_HEIGHT +
            GRID_ROW_START_POS +
            CELL_PAD;

        // If frames is equal to zombie spawn rate spawn zombie
        if (this.frames % this.zombiesSpawnRate === 0) {
            // Choose a random zombie type
            let choice = Math.floor(Math.random() * this.zombiesTypes.length);

            // Adds the zombie
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

            // Decreases the zombie spawn rate gradually until it finally reaches 300
            this.zombiesSpawnRate -= this.zombiesSpawnRate > 300 ? 20 : 0;
        }
    }

    // Manages all the projectiles
    manageAllProjectiles() {
        this.projectiles.forEach((projectile) => {
            projectile.update();
        });
    }

    // Manages all the suns
    manageSuns() {
        if (this.frames % 400 === 0) {
            // Randomly select the position for the sun to spawn
            let x =
                Math.random() * (canvas.width - CELL_WIDTH * 2) +
                GRID_COL_START_POS;

            // Gradually bring the sun from the top to the position
            let y = Math.random() * 5 * CELL_HEIGHT + GRID_ROW_START_POS;
            this.suns.push(new Sun(this, x, y, 0));
        }

        // Updates the position of the sun
        this.suns.forEach((sun) => {
            sun.update();

            // If the mouse is hovered over the sun then the sun is collected
            if (isCollided(sun, mouseStatus)) {
                this.sunCounts += sun.value;
                sun.collect = true;
            }
        });
    }

    // Manages all the lawn cleaners
    manageLawnCleaners() {
        this.lawnCleaners.forEach((lawncleaner) => {
            lawncleaner.update();
        });
    }

    // Cleans all the orphan objects
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

    // Shows all the resources
    showResources() {
        // Draws the sun counts
        ctx.drawImage(resourcescard, 20, 15, 145, 45);
        ctx.fillStyle = "black";
        ctx.font = "30px Creepster";
        ctx.fillText(this.sunCounts, 79, 48);

        // Draws the HighScore
        ctx.font = "25px Creepster";
        ctx.fillStyle = "#ffe9ac";
        ctx.drawImage(Button, canvas.width - 225, 10, 225, 60);
        ctx.fillText(`High Score: ${this.highScore}`, canvas.width - 195, 44);

        // Draws the Score
        ctx.fillStyle = "#ffe9ac";
        ctx.drawImage(Button, 20, 70, 135, 50);
        ctx.fillText(`Score ${this.score}`, 39, 101);
    }

    // Draws the plant cards for selecting the plants
    showCards() {
        this.plantsTypes.forEach((plant, idx) => {
            //  Sets the default boundary
            let cardBoundary = {
                x: 20,
                y: GRID_ROW_START_POS + 80 * idx,
                w: 100,
                h: 59,
            };

            // Sets the y position of the card
            let cardY = GRID_ROW_START_POS + 80 * idx;

            // Draws the card
            ctx.drawImage(
                plant.card,
                0,
                plant.canPlant || idx === 8 ? 1 : 61,
                cardBoundary.w,
                cardBoundary.h,
                cardBoundary.x,
                cardY,
                idx === this.selectedPlant
                    ? cardBoundary.w + 15
                    : cardBoundary.w,
                idx === this.selectedPlant ? cardBoundary.h + 8 : cardBoundary.h
            );

            // Adds the cost of the plant
            ctx.fillText(
                plant.blueprint.cost,
                cardBoundary.x + cardBoundary.w - 32,
                cardBoundary.y + cardBoundary.h - 18
            );

            // Clicked plant is selected from the card
            if (isCollided(mouseStatus, cardBoundary)) {
                canvas.style.cursor = "pointer";
                if (mouseStatus.clicked) {
                    this.selectedPlant = idx;
                }
            }
        });
    }

    manageShovel() {
        // Selects the shovel when clicked on the shovel button
        if (
            isCollided(mouseStatus, this.shovelBoundary) &&
            mouseStatus.clicked
        ) {
            this.shovelSelected = true;
        }

        // Draws the shovel button if the shovel is not selected else
        // the shovel is drawn where the mouse position is
        if (!this.shovelSelected) {
            ctx.drawImage(ShovelBtn, 200, 15, 85, 85);
        } else {
            ctx.drawImage(
                ShovelImg,
                mouseStatus.x - this.shovelBoundary.w / 2,
                mouseStatus.y - this.shovelBoundary.h / 2,
                this.shovelBoundary.w,
                this.shovelBoundary.h
            );
        }
    }

    // Manages Sound
    manageVolume() {
        if (
            isCollided(mouseStatus, this.volumeBoudnary) &&
            mouseStatus.clicked
        ) {
            this.volume = !this.volume;
            mouseStatus.clicked = false;
        }

        // Draws the volume icon
        ctx.drawImage(
            volumeImg,
            this.volumeBoudnary.x,
            this.volumeBoudnary.y,
            this.volumeBoudnary.w,
            this.volumeBoudnary.h
        );

        if (!this.volume) {
            ctx.fillStyle = "black";
            ctx.lineWidth = "4";
            ctx.beginPath();
            ctx.moveTo(
                this.volumeBoudnary.x + this.volumeBoudnary.w,
                this.volumeBoudnary.y
            );
            ctx.lineTo(
                this.volumeBoudnary.x,
                this.volumeBoudnary.y + this.volumeBoudnary.h
            );
            ctx.stroke();
        }
    }

    // Manage the music on and off function
    manageMusic() {
        // Toggles the music status
        if (
            isCollided(mouseStatus, this.musicBoundary) &&
            mouseStatus.clicked
        ) {
            this.music ? theme.pause() : theme.play();
            this.music = !this.music;

            // resets the mouse clicked status to false so that the
            // button is clicked only once
            mouseStatus.clicked = false;
        }

        // Draws the music icon
        ctx.drawImage(
            musicImg,
            this.musicBoundary.x,
            this.musicBoundary.y,
            this.musicBoundary.w,
            this.musicBoundary.h
        );
        if (!this.music) {
            ctx.fillStyle = "black";
            ctx.lineWidth = "4";
            ctx.beginPath();
            ctx.moveTo(
                this.musicBoundary.x + this.musicBoundary.w,
                this.musicBoundary.y
            );
            ctx.lineTo(
                this.musicBoundary.x,
                this.musicBoundary.y + this.musicBoundary.h
            );
            ctx.stroke();
        }
    }

    // Creates an animation loop
    animate() {
        ctx.fillStyle = "black";
        canvas.style.cursor = "default";

        // Draws the background image
        ctx.drawImage(bg, 0, 0, canvas.width + 573, canvas.height);

        // Draws the grid
        this.drawGrid();

        // Manages the objects in the game
        this.manageAllPlants();
        this.manageAllZombies();
        this.manageAllProjectiles();
        this.showResources();
        this.manageSuns();
        this.manageLawnCleaners();

        // Cleans the objects
        this.cleanOrphanObjects();

        // Displays the cards
        this.showCards();

        // Manage the shovel
        this.manageShovel();

        // Manage the music
        this.manageMusic();

        // Manage volume
        this.manageVolume();

        // Increases frame by 1 on every loop (used as a timer)
        this.frames++;

        // The game is set as over when the frame goes higher than 30000
        if (this.frames > 30000) {
            gameState.current = gameState.gameOver;
        }

        // If the game is over it stops the animationFrame
        if (gameState.current !== gameState.gameOver) {
            // Continues the loop
            this.animationId = window.requestAnimationFrame(
                this.animate.bind(this)
            );
        } else if (gameState.current === gameState.gameOver) {
            // Pause the sound
            theme.pause();

            // Game is set as over]
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

            // Shows the game end menu
            this.endMenu.classList.remove("hide");

            // Posts the highscore value on the backend
            setHighScore(this.score);

            // Shows the score on the dom
            this.endScore.innerHTML = `Score: ${this.score}`;

            // Shows the high score
            this.endHighscore.innerHTML =
                this.score >= this.highScore
                    ? `High Score: ${this.score}`
                    : `High Score: ${this.highScore}`;
        }
    }

    // Resets all the varibales to initial value for reset
    reset() {
        this.zombies = [];
        this.suns = [];
        this.projectiles = [];
        this.plants = [];
        this.lawnCleaners = [];
        this.grids = [];

        this.frames = 1;
        this.score = 0;
        this.sunCounts = 125;

        console.log("music is ", this.music);
        console.log("theme is ", theme);
        this.music ? theme.play() : theme.pause();
        gameState.current = gameState.gamePlaying;
        window.cancelAnimationFrame(this.animationId);
    }

    // Initializes grids
    async init() {
        // Fetches data from the server
        this.highScore = await getHighScore();

        // Initializes Grid
        this.grids = initializeGrid(this);

        // LawnCleaners
        this.initializeLawnCleaners();

        // Add listeners
        this.adddListeners();
    }
}

const startGame = async () => {
    // Load Images
    await loadImages();

    // Hide loading
    loading.style.display = "none";
    startMenuBtn.classList.remove("hide");

    // Creates a game object
    const game = new Game();
    game.init();
};

startGame();
