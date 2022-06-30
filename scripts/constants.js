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
export const LAWN_CLEANER_WIDTH = 80;
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

// Bullets
export const normalBullet = new Image();
export const melonBullet = new Image();

normalBullet.src = "/assets/images/Plants/PB00.gif";
melonBullet.src = "/assets/images/Melonpult_melon.webp";

// Images
const bg = new Image();
export const SunflowerCard = new Image();
export const PeaShooterCard = new Image();
export const RepeaterCard = new Image();
export const ThreePeaShooterCard = new Image();
export const ChomperCard = new Image();
export const PotatoMinesCard = new Image();
export const WallNutCard = new Image();
export const MelonPultCard = new Image();
export const SpikeweedCard = new Image();

export const sunImg = new Image();
export const resourcescard = new Image();
export const LawnCleanerImg = new Image();
export const Button = new Image();

bg.src = "./assets/images/interface/background2.jpg";
SunflowerCard.src = "../assets/images/Card/Plants/SunFlower.png";
PeaShooterCard.src = "../assets/images/Card/Plants/Peashooter.png";
RepeaterCard.src = "../assets/images/Card/Plants/Repeater.png";
ThreePeaShooterCard.src = "../assets/images/Card/Plants/Threepeater.png";
ChomperCard.src = "../assets/images/Card/Plants/Chomper.png";
PotatoMinesCard.src = "../assets/images/Card/Plants/PotatoMine.png";
WallNutCard.src = "../assets/images/Card/Plants/WallNut.png";
SpikeweedCard.src = "../assets/images/Card/Plants/Spikeweed.png";
MelonPultCard.src = "../assets/images/Card/Plants/Melonpult_melon.webp";

sunImg.src = "../assets/images/SunSprite_79x79.png";
resourcescard.src = "../assets/images/interface/SunBack.png";
LawnCleanerImg.src = "../assets/images/interface/LawnCleaner.png";
Button.src = "../assets/images/interface/Button.png";

// Audios
export const introTheme = new Audio();
export const theme = new Audio();
export const chomp = new Audio();
export const bucketZombieFall = new Audio();
export const zombieFall = new Audio();
export const plantation = new Audio();
export const hoverSound = new Audio();
export const select = new Audio();
export const peaShoot = new Audio();
export const peaHit = new Audio();
export const clickSound = new Audio();

select.src = "assets/audio/click.mp3";
hoverSound.src = "assets/audio/hover.mp3";
plantation.src = "assets/audio/plantation.mp3";
peaShoot.src = "assets/audio/pea_shoot.mp3";
bucketZombieFall.src = "assets/audio/bucket_zombie_fall.mp3";
zombieFall.src = "assets/audio/zombie_fall.mp3";
introTheme.src = "assets/audio/introTheme.mp3";
theme.src = "assets/audio/theme.mp3";
chomp.src = "assets/audio/chomp.mp3";
peaHit.src = "assets/audio/pea_hit.mp3";
clickSound.src = "assets/audio/click.mp3";

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
