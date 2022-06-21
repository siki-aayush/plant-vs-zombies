let grids = [];
let plants = [];
let sunCounts = 200;

canvas.addEventListener("mousemove", (e) => {
    mouseStatus.x = e.x - canvasPosition.left;
    mouseStatus.y = e.y - canvasPosition.top;
});

canvas.addEventListener("mouseleave", (e) => {
    mouseStatus.x = 0;
    mouseStatus.y = 0;
});

class Cell {
    /**
     * constructor.
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // Draws the cell on canvas
    draw() {
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        if (mouseStatus.x && mouseStatus.y && isCollided(this, mouseStatus)) {
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}

class Plant {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.attack = false;
        this.health = 100;
        this.projectiles = [];
        this.cooldown = 0;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "gold";
        ctx.font = "20px Arial";
        //ctx.fillText(Math.floor(this.health), this.x, this.y);
    }
}

const drawGrid = () => {
    grids.forEach((gridCell) => {
        gridCell.draw();
    });
};

const drawPlants = () => {
    //console.log(plants);
    plants.forEach((plant) => {
        plant.draw();
    });
};

function animate() {
    ctx.drawImage(bg, 0, 0, 1540, 600);
    ctx.fillRect(0, 0, colSize.width, colSize.height);
    drawGrid();
    drawPlants();
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", () => {
    const cellPosX = mouseStatus.x - (mouseStatus.x % CELL_WIDTH);
    const cellPosY =
        mouseStatus.y -
        (mouseStatus.y % CELL_HEIGHT) -
        (CELL_HEIGHT - GRID_ROW_START_POS);
    console.log(
        mouseStatus.y,
        mouseStatus.y % CELL_HEIGHT,
        cellPosY - 18,
        GRID_ROW_START_POS
    );
    if (cellPosX < GRID_COL_START_POS || cellPosY < GRID_ROW_START_POS) return;
    let plantCost = 25;
    if (plantCost < sunCounts) {
        //console.log("inside", CELL_HEIGHT, CELL_HEIGHT);
        plants.push(new Plant(cellPosX, cellPosY, CELL_WIDTH, CELL_HEIGHT));
    }
});

grids = initializeGrid();
animate();
