// Canvas constants
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Assigns width and height to the canvas

canvas.width = 1898;
canvas.height = 970;

// Required Variables
const CELL_WIDTH = 140;
const CELL_HEIGHT = 155;
const CELL_PAD = 4;
const GRID_COL_START_POS = 455;
const GRID_ROW_START_POS = 140;
const PROJECTILES = [];

// Size of a single column
const colSize = {
    width: CELL_WIDTH,
    height: canvas.height,
};

// Mouse status
const mouseStatus = {
    x: 0,
    y: 0,
    w: 0.1,
    h: 0.1,
    clicked: false,
};

// Game state
const gameState = {
    current: 0,
    gameReady: 0,
    gamePlaying: 1,
    gameOver: 2,
};

// Images
const bg = new Image();
export const PeaShooterCard = new Image();
export const RepeaterCard = new Image();
export const ThreePeaShooterCard = new Image();
export const ChomperCard = new Image();
export const PotatoMinesCard = new Image();
export const WallNutCard = new Image();

bg.src = "./assets/images/interface/background1.jpg";
PeaShooterCard.src = "../assets/images/Card/Plants/Peashooter.png";
RepeaterCard.src = "../assets/images/Card/Plants/Repeater.png";
ThreePeaShooterCard.src = "../assets/images/Card/Plants/Threepeater.png";
ChomperCard.src = "../assets/images/Card/Plants/Chomper.png";
PotatoMinesCard.src = "../assets/images/Card/Plants/PotatoMine.png";
WallNutCard.src = "../assets/images/Card/Plants/WallNut.png";

// Export all the constants
export {
    canvas,
    ctx,
    CELL_WIDTH,
    CELL_HEIGHT,
    CELL_PAD,
    GRID_ROW_START_POS,
    GRID_COL_START_POS,
    PROJECTILES,
    colSize,
    mouseStatus,
    gameState,
    bg,
};
