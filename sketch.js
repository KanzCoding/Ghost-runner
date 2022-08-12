var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var End 
var gameOver,gameOverImg;


function preload(){
  gameOverImg = loadImage("download.jpg");  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");

  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);

  gameOver = createSprite(300,300)
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 10;

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 7;

  ghost = createSprite(300,500);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();

  ghost.debug = true;
  climbersGroup.debug = false;

  ghost.setCollider("rectangle",0,0,ghost.width - 50,ghost.height )


}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }

    drawSprites();

  if (gameState == "play")  
  {
    
    if (keyDown("right"))
    {
      ghost.x = ghost.x + 2;
    }

    if (keyDown("left")) 
    {
       ghost.x = ghost.x - 2;
    }

    ghost.velocityY = ghost.velocityY 
    
    if (ghost.isTouching(climbersGroup)) 
    {
      gameOver.visibility = true;
      climbersGroup.destroyEach();
      gameState === End;
      tower.velocityY = 0;
      climber.velocityY = 0;
      door.velocityY = 0;
    }
    doors();

    gameOver.visible = false;

  }
else if (gameState === End )
{
    
    gameOver.visible = true;
}


}

function doors () 
{
  if (frameCount % 150 === 0)
  {
    door = createSprite(100,0);
    door.x = Math.round(random(150,500))
    door.addImage("door",doorImg);
    door.velocityY = 10;
    doorsGroup.add(door);

    climber = createSprite(100,50);
    climber.addImage("climber",climberImg);
    climber.velocityY = 10;
    climber.x = door.x ;
    climbersGroup.add(climber);

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
  }
  
  
}