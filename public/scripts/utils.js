import Cell from "./classes/Cell.js";
import {
    canvas,
    CELL_HEIGHT,
    CELL_WIDTH,
    GRID_ROW_START_POS,
    GRID_COL_START_POS,
} from "./constants.js";

/**
 * initializeGrid.
 * Initializes the game grid
 * @param {Game} game
 */
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
 * Box collision
 * Checks whether the two box is collided.
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

/**
 * getHighScore
 * Gets the all time highscore from the server
 */
export const getHighScore = async () => {
    console.log("testing request");
    let highscore;
    try {
        let data = await fetch("http://localhost:3000/highscore");
        let parsedData = await data.json();
        highscore = parsedData.highscore;
    } catch (error) {
        highscore = 999;
    }
    return highscore;
};

/**
 * setHighScore.
 * Sets the score as the high score if the score is greater than the high score
 * The highscore checking is done in the backend
 * @param {number} score
 */
export const setHighScore = async (score) => {
    try {
        fetch("http://localhost:3000/highscore", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: score }),
        });
    } catch (error) {
        console.log("error", error);
    }
};

/**
 * getImage.
 * Asynchronously loads the image
 * @param {string} path
 */
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
//export const getAudio = (path) => {
//    return new Promise((resolve, reject) => {
//        let audio = new Audio();
//        audio.oncanplay = () => {
//            resolve(audio);
//        };
//        audio.onerror = (error) => {
//            reject(error);
//        };
//        audio.src = path;
//    });
//};
