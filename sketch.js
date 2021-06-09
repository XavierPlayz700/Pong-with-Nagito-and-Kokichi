var kokichi, nagito, puck;
var kIdle, kMove, nMove, nIdle, b;

var songs = [];
var gameState = "serve";

var cGoal, pGoal;
var pScore, cScore;

var edges;

pScore = 0;
cScore = 0;

function preload() {

    // Kokichi Sprites (Idle and Running Kokichi)
    kMove = loadAnimation("Sprites/KR.png", "Sprites/KS.png", "Sprites/KR.png", "Sprites/KS.png");
    kIdle = loadImage("Sprites/KS.png");

    // Nagito Sprites (Idle and Running Nagito)
    nMove = loadAnimation("Sprites/Nagito.png", "Sprites/Nagito2.png", "Sprites/Nagito.png", "Sprites/Nagito2.png");
    nIdle = loadImage("Sprites/Nagito.png");

    // Puck
    b = loadImage("Sprites/puck.png");

    songs[0] = loadSound("Songs/Objection!.mp3");
    songs[1] = loadSound("Songs/Climax.mp3");

}

function setup(){

    createCanvas(windowWidth, windowHeight);

    edges = createEdgeSprites();

    // My Sprites UwU
    kokichi = createSprite(75, height / 2);
    kokichi.addImage("Idle", kIdle);
    kokichi.addAnimation("Move", kMove);
    kokichi.scale = 0.6;

    nagito = createSprite(width - 75, height / 2);
    nagito.addImage("Nagito Idle", nIdle);
    nagito.addAnimation("Nagito Move", nMove);
    nagito.scale = 0.6;
    nagito.mirrorX(-1);

    puck = createSprite(width / 2, height / 2);
    puck.addImage("puck", b)
    puck.scale = 0.8;
    puck.setCollider("rectangle", 0, 0, 49, 49);
    puck.visible = false;
    puck.depth = 8;

    pGoal = createSprite(width - 12.5, height / 2, 25, height / 6);
    pGoal.shapeColor = "cyan";

    cGoal = createSprite(12.5, height / 2, 25, height / 6);
    cGoal.shapeColor = "red";

    blocker = createSprite(width / 2, height / 2, 40, height)
    blocker.shapeColor = "white";

    songs[0].loop();
    songs[0].setVolume(0.5);

}

function draw() {

    background("green");

    textAlign(CENTER);
    textSize(20);
    fill(255);
    noStroke();
    text(pScore, width / 2 - 50, 50);
    text(cScore, width / 2 + 50, 50);

    stroke(255);

    for (var i = 0; i <= width; i = i + width / 8){
       line(i, 0, i, height);
    }

    for (var t = 0; t <= height; t = t + height / 6) {

       if (t >= height * (2/6) && t <= height * (4/6)){
          noStroke();
       } else {
          stroke(255);
       }

       line(0, t, width, t);
    }

    if (gameState === "play"){
        play();
    }

    drawSprites();

    if (gameState === "win"){
        songs[1].stop();
        songs[0].loop();

        win();
    }

    if (gameState === "lose"){
        songs[1].stop();

        lose();
    }

    
    if (gameState === "serve"){
        fill(0);
        stroke(0);
        textSize(25);
        text("Press 'space' to serve.", width / 2, height / 2);

        if(keyWentDown("space")){
            gameState = "play";
            puck.visible = true;
            puck.setVelocity(random(-5, -3), random(-5, 5));

            nagito.velocityX = random(-5, 5);
            nagito.changeAnimation("Nagito Move");
        }
    }

}