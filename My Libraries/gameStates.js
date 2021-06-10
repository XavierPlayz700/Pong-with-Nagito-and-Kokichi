module.exports = {

    name : "gameStates",
    description : "functions depending on game states"

}

function play(){

        // Testing some unique ideas :3

        if (keyDown("left")){

            kokichi.x = kokichi.x - 5;
            kokichi.changeAnimation("Move");
     
         } 
         
         if (keyDown("right")){
     
            kokichi.x = kokichi.x + 5;
            kokichi.changeAnimation("Move");
     
         } 
         
         if (keyDown("down")){
     
            kokichi.y = kokichi.y + 5;
            kokichi.changeAnimation("Move");
     
         }
         
         if (keyDown("up")){
     
            kokichi.y = kokichi.y - 5;
            kokichi.changeAnimation("Move");
     
         } 
         
         if (!keyDown("up") && !keyDown("down") && !keyDown("right") && !keyDown("left")) {
     
            kokichi.changeImage("Idle");
     
         }

         kokichi.collide(edges);
         kokichi.collide(blocker);
         kokichi.collide(cGoal);
     
         nagito.bounceOff(edges);
         nagito.bounceOff(blocker);
         nagito.bounceOff(pGoal);

         puck.bounceOff(edges);
         puck.bounceOff(kokichi);
         puck.bounceOff(nagito);

         if (puck. y < 0 || puck.y > height || puck.x < 0 || puck.x > width){
            puck.y = height / 2;
            puck.x = width / 2;
            puck.setVelocity(random(-5, 5), random(-5, 5));
         }

         if (puck.isTouching(pGoal)){
             pScore++;

            if (pScore === 6 || cScore === 6){
                songs[0].stop();
                songs[1].loop();   
            }

            reset();

            if (pScore === 7){
                gameState = "win";
            }   

         }

         if (puck.isTouching(cGoal)){
             cScore++;

            if (pScore === 6 || cScore === 6){
                songs[0].stop();
                songs[1].loop();   
            }

            reset();

            if (cScore === 7){
                gameState = "lose";
            }

         }

         nagito.y = puck.y;
}

function reset(){

    puck.x = width / 2;
    puck.y = height / 2;

    nagito.x = width - 75;
    kokichi.x = 75;

    nagito.y = height / 2;
    kokichi.y = height / 2;

    nagito.changeAnimation("Nagito Idle");
    kokichi.changeAnimation("Idle");

    nagito.setVelocity(0, 0);

    puck.visible = false;

    gameState = "serve";

}

function win(){

    textAlign(CENTER);
    textSize(20);

    fill(0);
    text("You Win!", width / 2, height / 2);
    text("Press 'space' to restart", width / 2, height * 0.75);

    if (keyWentDown("space")){
        restart();
    }

}

function lose(){

    textAlign(CENTER);
    textSize(20);

    fill(0);
    text("You Lost!", width / 2, height / 2);
    text("Press 'space' to restart", width / 2, height * 0.75);

    if (keyWentDown("space")){
        restart();
    }

}

function restart(){

    pScore = 0;
    cScore = 0;

    songs[0].loop();
    reset();

}
