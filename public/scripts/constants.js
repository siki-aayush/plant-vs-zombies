import { getImage, getAudio } from "./utils.js";

// Canvas constants
export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

// Assigns width and height to the canvas
canvas.width = 1898;
canvas.height = 970;

// Get loading element
export const loading = document.querySelector(".loading");
export const startMenuBtn = document.querySelector(".start-menu__btn");

// Required Variables
export const CELL_WIDTH = 140;
export const CELL_HEIGHT = 155;
export const CELL_PAD = 4;
export const GRID_COL_START_POS = 455;
export const GRID_ROW_START_POS = 140;
export const LAWN_CLEANER_WIDTH = 80;
export const PROJECTILES = [];

// Size of a single column
export const colSize = {
    width: CELL_WIDTH,
    height: canvas.height,
};

// Mouse status
export const mouseStatus = {
    x: 0,
    y: 0,
    w: 0.1,
    h: 0.1,
    clicked: false,
};

// Game state
export const gameState = {
    current: 0,
    gameReady: 0,
    gamePlaying: 1,
    gameOver: 2,
};

// Bullets
export let normalBullet;
export let melonBullet;

//Zombies
export let FootballZombieSprite;
export let BucketHeadZombieSprite;
export let ConeHeadZombieSprite;
export let DragonZombieSprite;
export let BallonZombieSprite;
export let NormalZombieSprite;

//Plants
export let PeaShooterSprite;
export let SunflowerSprite;
export let MelonpultSprite;
export let WallnutSprite;
export let RepeaterSprite;
export let SnowPeaSprite;
export let ThreepeaShooterSprite;
export let PotatoMineSprite;
export let ChomperSprite;
export let SpikeweedSprite;

// Plants Cards
export let bg;
export let SunflowerCard;
export let PeaShooterCard;
export let RepeaterCard;
export let ThreePeaShooterCard;
export let ChomperCard;
export let PotatoMinesCard;
export let WallNutCard;
export let MelonPultCard;
export let SpikeweedCard;
// Audios
export let introTheme = new Audio();
export let theme = new Audio();
export let chomp = new Audio();
export let bucketZombieFall = new Audio();
export let zombieFall = new Audio();
export let plantation = new Audio();
export let hoverSound = new Audio();
export let select = new Audio();
export let peaShoot = new Audio();
export let peaHit = new Audio();
export let clickSound = new Audio();

// Extras
export let sunImg;
export let resourcescard;
export let LawnCleanerImg;
export let Button;

// Loads all the images
export const loadImages = async () => {
    normalBullet = await getImage("/assets/images/Plants/PB00.png");
    melonBullet = await getImage("/assets/images/Plants/Melonpult_melon.webp");
    FootballZombieSprite = await getImage(
        "/assets/images/Zombies/FootballZombieSprite_300.png"
    );
    BucketHeadZombieSprite = await getImage(
        "/assets/images/Zombies/BucketheadZombieSprite_166x144.png"
    );
    DragonZombieSprite = await getImage(
        "/assets/images/Zombies/dragonZombie_464x400.png"
    );
    BallonZombieSprite = await getImage(
        "/assets/images/Zombies/ballonZombieSprite_207x197.png"
    );
    NormalZombieSprite = await getImage(
        "/assets/images/Zombies/ZombieSprite_166x144.png"
    );
    ConeHeadZombieSprite = await getImage(
        "/assets/images/Zombies/ConeheadZombieSprite_166x144.png"
    );
    PeaShooterSprite = await getImage(
        "/assets/images/Plants/PeashooterSprite_71x71.png"
    );
    ChomperSprite = await getImage(
        "/assets/images/Plants/ChomperSprite_130x114.png"
    );

    PotatoMineSprite = await getImage(
        "/assets/images/Plants/PotatoMineSprite_132x93.png"
    );
    RepeaterSprite = await getImage(
        "/assets/images/Plants/RepeaterSprite_73x71.png"
    );
    SpikeweedSprite = await getImage(
        "/assets/images/Plants/SpikeweedSprite_100x41.png"
    );
    SunflowerSprite = await getImage(
        "/assets/images/Plants/SunFlowerSprite_73x74.png"
    );
    ThreepeaShooterSprite = await getImage(
        "/assets/images/Plants/ThreepeaterSprite_73x80.png"
    );
    WallnutSprite = await getImage(
        "/assets/images/Plants/WallNutSprite_65x73.png"
    );
    MelonpultSprite = await getImage("/assets/images/Plants/melon_pult.png");

    bg = await getImage("./assets/images/Interface/background1.jpg");
    ThreePeaShooterCard = await getImage(
        "../assets/images/Card/Plants/Threepeater.png"
    );
    PotatoMinesCard = await getImage(
        "../assets/images/Card/Plants/PotatoMine.png"
    );

    SunflowerCard = await getImage(
        "../assets/images/Card/Plants/SunFlower.png"
    );
    PeaShooterCard = await getImage(
        "../assets/images/Card/Plants/Peashooter.png"
    );
    RepeaterCard = await getImage("../assets/images/Card/Plants/Repeater.png");
    ChomperCard = await getImage("../assets/images/Card/Plants/Chomper.png");
    WallNutCard = await getImage("../assets/images/Card/Plants/WallNut.png");
    SpikeweedCard = await getImage(
        "../assets/images/Card/Plants/Spikeweed.png"
    );
    MelonPultCard = await getImage(
        "../assets/images/Card/Plants/Melonpult_melon.webp"
    );

    sunImg = await getImage("../assets/images/Interface/SunSprite_79x79.png");
    resourcescard = await getImage("../assets/images/Interface/SunBack.png");
    LawnCleanerImg = await getImage(
        "../assets/images/Interface/LawnCleaner.png"
    );
    Button = await getImage("../assets/images/Interface/Button.png");

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
};
