var path,boy,cash,diamonds,jwellery;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG;
var Play = 1;
var End =0;
var gameState = 1;
var gameOver,endImg,gameOverImg;
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");

  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,550,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
 gameOver = createSprite(200,200,10,10)  
 gameOver.addImage("gameOver",endImg);
 gameOver.visible = false ;
 gameOver.scale = 0.5;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();


   
  if(gameState===Play){
       boy.x = World.mouseX;
    terasureCollection = treasureCollection + Math.round(frameCount/60)
     path.velocityY = 4; 
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
    treasureCollection = treasureCollection+50;
  }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+100;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+150;
    }
     if(treasureCollection > 2000){
      gameState = End
      boy.visible=false
     }
}
  
if(gameState === End){
 cashG.destroyEach();
  cashG.setVelocityYEach(0);
  diamondsG.destroyEach();
  diamondsG.setVelocityYEach(0);  
  jwelleryG.destroyEach();
  jwelleryG.setVelocityYEach(0);
  
      path.velocityY = 0;
  gameOver.visible = true
}

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

