var rocketImage, asteroidImage, starImage, skyImage;
var rocket, asteroid, star;


function preload(){
    rocketImage=loadImage("rocket.jpg");
    asteroidImage=loadImage("asteroid.jpg");
    starImage=loadImage("star.png");
    skyImage=loadImage("dowload.jpg")
    startImage=loadImage("game start.png");
    gameoverImage=loadImage("gameover.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    rocket = createSprite(50,height-70,20,50);

    sky = createSprite(width/2, height-10,width,20);
  sky.addImage("sky",skyImage);
  sky.x = ground.width /2;
  sky.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(touches.length>0 ||keyDown("space") && sky.y >= height-120) {
      sky.velocityY = -12;
      touches = []
    }
  
    rocket.velocityY = rocket.velocityY + 0.8
  
    }
  
    rocket.collide(invisibleSky);
    spawnStars();
  
    if(asteroidsGroup.isTouching(rocket)){
        gameState = END;
    }

      else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
            
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}
  


function spawnStars() {
  if (frameCount % 60 === 0) {
    var star = createSprite(600,120,40,10);
    star.y = Math.round(random(80,120));
    star.addImage(skyImage);
    star.scale = 0.5;
    star.velocityX = -3;
    
    star.lifetime = 200;
    
    star.depth = trex.depth;
    
    starGroup.add(star);
  }
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  starGroup.destroyEach();  
 
  score = 0;
  
}