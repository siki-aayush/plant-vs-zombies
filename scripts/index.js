import { Cell, Plant } from "./classes.js";
import { initializeGrid, isCollided } from "./utils.js";
import {
    canvas,
    ctx,
    CELL_WIDTH,
    CELL_HEIGHT,
    mouseStatus,
    colSize,
    bg,
    canvasPosition,
    GRID_COL_START_POS,
    GRID_ROW_START_POS,
} from "./constants.js";

let grids = [];
let plants = [];
let sunCounts = 200;

// Updates the position of the mouseState variable when mouse moves
canvas.addEventListener("mousemove", (e) => {
    mouseStatus.x = e.x - canvasPosition.left;
    mouseStatus.y = e.y - canvasPosition.top;
});

// Updates the position of the mouseState variable when mouse moves
canvas.addEventListener("mouseleave", (e) => {
    mouseStatus.x = 0;
    mouseStatus.y = 0;
});

canvas.addEventListener("click", () => {
    // Get the top left position of the selected cell
    const cellPosX = mouseStatus.x - (mouseStatus.x % CELL_WIDTH);
    const cellPosY =
        mouseStatus.y -
        (mouseStatus.y % CELL_HEIGHT) -
        (CELL_HEIGHT - GRID_ROW_START_POS);

    // Stops from placing the plants outside of the grid
    if (cellPosX < GRID_COL_START_POS || cellPosY < GRID_ROW_START_POS) return;

    // Checks whether there is already a plant in selected cell
    for (let i = 0; i < plants.length; i++) {
        if (plants[i].x === cellPosX && plants[i].y === cellPosY) return;
    }

    // If the user has required number of sun then the plant is placed
    // at the selected cell position
    let plantCost = 25;
    if (plantCost <= sunCounts) {
        plants.push(new Plant(cellPosX, cellPosY, CELL_WIDTH, CELL_HEIGHT));
        sunCounts -= plantCost;
    }
});

// Draws the grid
const drawGrid = () => {
    grids.forEach((gridCell) => {
        gridCell.draw();
    });
};

// Draws the plants
const drawPlants = () => {
    plants.forEach((plant) => {
        plant.draw();
    });
};

const showResources = () => {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Sun: " + sunCounts, 0, 30);
};

// Creates an animation loop
function animate() {
    ctx.fillStyle = "black";
    ctx.drawImage(bg, 0, 0, 1540, 600);
    //ctx.fillRect(0, 0, colSize.width, colSize.height);
    drawGrid();
    drawPlants();
    showResources();
    requestAnimationFrame(animate);
}

grids = initializeGrid(Cell);
animate();
animate();
