// Canvas constants
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Assigns width and height to the canvas
canvas.width = 1100;
canvas.height = 600;

// Get's canvas position in the dom
const canvasPosition = canvas.getBoundingClientRect();

// Required Variables
const CELL_WIDTH = 90;
const CELL_HEIGHT = 100;
const CELL_PAD = 4;
const GRID_COL_START_POS = 270;
const GRID_ROW_START_POS = 82;

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
    colSize,
    mouseStatus,
    bg,
    canvasPosition,
};
