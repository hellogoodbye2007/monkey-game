//Global Variables
var background1, backimage;
var monkey_image;
var bananaImage;
var bananaGroup;
var stone_image;
var ObstaclesGroup;
var score;
//x is scale for monkey
var x;
//bscore is number of bananas
var bscore;
var gamestate;
var player_running, obstacleImage, monkey, ground;
function preload(){
  player_running=loadImage("Monkey_01.png");
  bananaImage=loadImage("Banana.png");
  obstacleImage=loadImage("stone.png");
  backimage=loadImage("Jungle.jpg");
}

function setup() {
  createCanvas(800,400);
  background1=createSprite(400,160,800,400);
  background1.addImage(backimage);
  background1.velocityX=-4;
  background1.scale=2;
  monkey=createSprite(100,340,20,20);
  monkey.addImage(player_running);
  monkey.scale=0.1;
  ground=createSprite(400,350,800,10);
  ground.scale=2;
  ground.x=ground.width/2;
  ground.visible=false;
  score=0;
  bscore=0;
  x=0.1;
  gamestate=0;
  ObstaclesGroup=new Group();
  bananaGroup=new Group();
}


function draw(){
  background(255);
  stroke("black");
  textSize(20);
  fill("black");
  drawSprites();
  monkey.scale=x;
  console.log(bscore);
  switch(Math.round(bscore)){
    case 10:x=x+0.3;
            break;
            
    case 20:x=x+0.3;
            break;
            
    case 30:x=x+0.3;
            break;
            
    case 40:x=x+0.3;
            break;
            
    case 50:text("You're  crazy and insane",200,200);
            x=100;
            break;
    case 60:text("Still insane",200,200);
            break;
    case 100:text("What are you doing with your life?",200,200);
            break;
    case 200:text("You're not insane, you're insane....ly good!",200,200);
            break;
    default:break;
  }
  monkey.velocityY=monkey.velocityY+0.1;
  monkey.collide(ground);
  if(background1.x<0){
    background1.x=background1.width/2;
  }
  if(gamestate===0){
    text("Lives: 2",700,200);
    if(ObstaclesGroup.isTouching(monkey)){
      x=0.1;
      gamestate=1;
      ObstaclesGroup.destroyEach();
    }
  }
  if(gamestate===1){
    text("Lives: 1",700,200);
    if(ObstaclesGroup.isTouching(monkey)){
      x=0.1
      gamestate=2;
    }
  }
  if(gamestate===0||gamestate===1){
    score=Math.floor(frameCount/frameRate())
    if(keyDown("u")&&monkey.y>310){
      monkey.velocityY=-6;
    }
    if(frameCount%80===0){
      var         banana=createSprite(800,random(120,200),20,20);
      banana.addImage(bananaImage);
      banana.scale=0.05;
      banana.lifetime=200;
      banana.velocityX=-5;
      bananaGroup.add(banana);
    }
    if(bananaGroup.isTouching(monkey)){
      bscore=bscore+1/21;
    }
    if(frameCount%300===0){
      var obstacle=createSprite(800,300,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.lifetime=200;
      obstacle.velocityX=-5;
      obstacle.scale=0.3;
      ObstaclesGroup.add(obstacle);
      obstacle.setCollider("circle",0,0,190);
    }
  }
  if(gamestate===2){
    text("Game Over",400,200);
    background1.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    ObstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  text("Survival Time: "+score,500,50);
  text("Bananas: "+Math.round(bscore),300,50);
}