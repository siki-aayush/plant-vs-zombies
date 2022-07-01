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
melonBullet.src = "/assets/images/Plants/Melonpult_melon.webp";

//Zombies
export const FootballZombieSprite = new Image();
export const BucketHeadZombieSprite = new Image();
export const ConeHeadZombieSprite = new Image();
export const DragonZombieSprite = new Image();
export const BallonZombieSprite = new Image();
export const NormalZombieSprite = new Image();

FootballZombieSprite.src =
    "/assets/images/Zombies/FootballZombieSprite_300.png";
BucketHeadZombieSprite.src =
    "/assets/images/Zombies/BucketheadZombieSprite_166x144.png";
DragonZombieSprite.src = "/assets/images/Zombies/dragonZombie_464x400.png";
BallonZombieSprite.src =
    "/assets/images/Zombies/ballonZombieSprite_207x197.png";
NormalZombieSprite.src = "/assets/images/Zombies/ZombieSprite_166x144.png";
ConeHeadZombieSprite.src =
    "/assets/images/Zombies/ConeheadZombieSprite_166x144.png";
BallonZombieSprite.scr =
    "/assets/images/Zombies/ballonZombieSprite_207x197.png";

//Plants
export const PeaShooterSprite = new Image();
export const SunflowerSprite = new Image();
export const MelonpultSprite = new Image();
export const WallnutSprite = new Image();
export const RepeaterSprite = new Image();
export const SnowPeaSprite = new Image();
export const ThreepeaShooterSprite = new Image();
export const PotatoMineSprite = new Image();
export const ChomperSprite = new Image();
export const SpikeweedSprite = new Image();

PeaShooterSprite.src = "/assets/images/Plants/PeashooterSprite_71x71.png";
ChomperSprite.src = "/assets/images/Plants/ChomperSprite_130x114.png";
PotatoMineSprite.src = "/assets/images/Plants/PotatoMineSprite_132x93.png";
RepeaterSprite.src = "/assets/images/Plants/RepeaterSprite_73x71.png";
SpikeweedSprite.src = "/assets/images/Plants/SpikeweedSprite_100x41.png";
SunflowerSprite.src = "/assets/images/Plants/SunFlowerSprite_73x74.png";
ThreepeaShooterSprite.src = "/assets/images/Plants/ThreepeaterSprite_73x80.png";
WallnutSprite.src = "/assets/images/Plants/WallNutSprite_65x73.png";

// Plants Cards
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

bg.src = "./assets/images/Interface/background1.jpg";
ThreePeaShooterCard.src = "../assets/images/Card/Plants/Threepeater.png";
PotatoMinesCard.src = "../assets/images/Card/Plants/PotatoMine.png";

SunflowerCard.src = "../assets/images/Card/Plants/SunFlower.png";
PeaShooterCard.src = "../assets/images/Card/Plants/Peashooter.png";
RepeaterCard.src = "../assets/images/Card/Plants/Repeater.png";
ChomperCard.src = "../assets/images/Card/Plants/Chomper.png";
WallNutCard.src = "../assets/images/Card/Plants/WallNut.png";
SpikeweedCard.src = "../assets/images/Card/Plants/Spikeweed.png";
MelonPultCard.src = "../assets/images/Card/Plants/Melonpult_melon.webp";

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

// Extras
export const sunImg = new Image();
export const resourcescard = new Image();
export const LawnCleanerImg = new Image();
export const Button = new Image();

sunImg.src = "../assets/images/Interface/SunSprite_79x79.png";
resourcescard.src = "../assets/images/Interface/SunBack.png";
LawnCleanerImg.src = "../assets/images/Interface/LawnCleaner.png";
Button.src = "../assets/images/Interface/Button.png";

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
