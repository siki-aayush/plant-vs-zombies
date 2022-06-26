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
bg.src = "./assets/images/interface/background1.jpg";

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
