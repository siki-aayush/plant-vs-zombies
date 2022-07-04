import Cell from "./classes/Cell.js";
import {
    canvas,
    CELL_HEIGHT,
    CELL_WIDTH,
    GRID_ROW_START_POS,
    GRID_COL_START_POS,
} from "./constants.js";

// Initializes the game grid
export const initializeGrid = (game) => {
    let gridsList = [];
    for (
        let row = GRID_ROW_START_POS;
        row < canvas.height - CELL_HEIGHT;
        row += CELL_HEIGHT
    ) {
        for (
            let col = GRID_COL_START_POS;
            col < canvas.width - CELL_WIDTH * 2;
            col += CELL_WIDTH
        ) {
            gridsList.push(new Cell(game, col, row, CELL_WIDTH, CELL_HEIGHT));
        }
    }

    return gridsList;
};

/**
 * isCollided.
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Boolean}
 */
export const isCollided = (obj1, obj2) => {
    if (
        obj1.x > obj2.x + obj2.w || // Obj1 is far right than obj2
        obj1.x + obj1.w < obj2.x || // Obj1 is far left than obj2
        obj1.y + obj1.h < obj2.y || // Obj1 is far above than obj2
        obj1.y > obj2.y + obj2.h // Obj1 is far below than obj2
    ) {
        return false;
    } else {
        return true;
    }
};

// Asynchronously loads the image
export const getImage = (path) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            console.log("image loaded");
            resolve(img);
        };
        img.onerror = (e) => {
            reject(e);
        };
        img.src = path;
    });
};

// Asynchronously loads the audio
export const getAudio = async (path) => {
    let loadedAudio = await new Promise((resolve, reject) => {
        let audio = new Audio();
        audio.src = path;
        audio.oncanplay = () => {
            resolve(audio);
        };
    });
    return loadedAudio;
};
