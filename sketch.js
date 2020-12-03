
var monkey , monkey_running,monk
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, count=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime=0;
var groundImage, invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png") ; 
  monk=loadImage("Monkey_01.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  groundImage=loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  ground = createSprite(width/2,-100,width,height);
 // ground = createSprite(width,0,width,height);
  //groundImage.resize(width,height);
  
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.scale=3.5
  
  invisibleGround=createSprite(width/2,height-100,width,10);
  invisibleGround.visible=false;
  
  //creating monkey
   monkey=createSprite(width-width+80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  monkey.addImage("stop",monk);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);
  ground.addImage("jungle",groundImage);
    
  monkey.collide(invisibleGround);  
  
  
  //console.log(monkey.y);
  //monkey.debug=true;
  drawSprites();
    
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+ survivalTime, 20,80);
  text("Score: "+ score, 20,50)
  
  if (gameState===PLAY){
      if(ground.x<0) {
      ground.x=ground.width/2;
    }

    if(survivalTime%100===0){
      ground.velocityX=ground.velocityX-1;
      
    }


      if(touches.length>0||keyDown("space")&&monkey.y>height-200 ) {
        monkey.velocityY = -15;
        touches=[];
      }
      monkey.velocityY = monkey.velocityY + 0.4;
      spawnFood();
      spawnObstacles();
      survivalTime=survivalTime+Math.ceil(frameRate()/60) 
    
      if(monkey.isTouching(FoodGroup)){  
      score=score+1;
        FoodGroup.destroyEach();
        count=1;
      }
    
    if(score>0&&score%2===0&&count===1){
      monkey.scale=monkey.scale+0.01;
      count=0;
    }


      if(obstaclesGroup.isTouching(monkey)){

        gameState=END;
        textSize(25);
        monkey.changeImage("stop",monk);
        
        

      }
  }
  
  
  
  if(gameState===END){
    text("Game Over",width/2-30,height/2-50);
    text("Press r to restart",width/2-50,height/2-20);
    ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    if(keyDown("r")||touches.length>0){
      gameState=PLAY;
      score=0;
      monkey.changeAnimation("moving",monkey_running);
      obstaclesGroup.setLifetimeEach(0);
      FoodGroup.setLifetimeEach(0);
      monkey.y=350;
      survivalTime=0;
      ground.velocityX=-4;
      touches=[];
      monkey.scal=0.1;
      
    }
    
  }
  
  
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(width,height-400,40,10);
    banana.y = random(height-300,height-500);    
    banana.velocityX = ground.velocityX;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.08;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(width,height-130,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.3;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,150)
  }
}
