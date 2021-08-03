var tower,towerImg;
var door,doorImg;
var doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState="PLAY";


function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  doorsGroup=new Group();
  
  climbersGroup=new Group();
  
  invisibleBlockGroup = new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
}
function draw(){
  background("black");
  
  if (gameState==="PLAY"){
    
  
  if (tower.y>400){
    tower.y=300;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-2;
    
  }
  
  
  ghost.velocityY=ghost.velocityY+0.2;
  
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-2;
  }
  
    if (keyDown("right_arrow")){
    ghost.x=ghost.x+2;
  }
  
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
  { ghost.destroy();
  gameState="END"}
  
  spawnDoors();
  
  
  drawSprites();
}
  if (gameState==="END"){
    text("Game Over!",400,400);
    text.scale=3;
  }
}
function spawnDoors(){
  if (frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x=Math.round(random(120,400))
    door.velocityY=2;
    door.lifetime=800;
    doorsGroup.add(door);
    
    climber=createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.x=door.x;
    climber.velocityY=2;
    climber.lifetime=800;
    climbersGroup.add(climber);
    
    var invisibleBlock = createSprite(200,15);   invisibleBlock.width = climber.width; invisibleBlock.height = 2;
    
    invisibleBlock.debug = true; invisibleBlockGroup.add(invisibleBlock);
    
    invisibleBlock.x = door.x; 
    invisibleBlock.velocityY = 2;
    
    ghost.depth=door.depth
    ghost.depth+=1;
  }
}