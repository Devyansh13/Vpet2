var dog,sadDog,happyDog,bedroomImg,bathroomImg,gardenImg,database,foodObj,foodS,foodStock,dogname,fin,fedTime,lastFed;
var f1,f2,f3;
var readState,changeState;

function preload()
{
  dogImage=loadImage("Dog.png")
  HAPPYdog=loadImage("happydog.png")
  bedroomImg=loadImage("virtual pet images/Bed Room.png")
  bathroomImg=loadImage("virtual pet images/Wash Room.png")
  gardenImg=loadImage("virtual pet images/Garden.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  f1=new Food();
  
  dogname= prompt("Name your dog","Name")
  dog=createSprite(800,200,100,100);
 dog.addImage("d1",dogImage);
 dog.scale=0.25;

  feed=createButton("Feed your Dog")
  feed.position(700,95);
  feed.mousePressed(feeddog);
 
  moreFood=createButton("Add more food")
  moreFood.position(800,95);
  moreFood.mousePressed(addFoods)

  database.ref('/').update({
    gameState:'hungry'
  })

  

  readState=database.ref('gameState');
  readState.on('value',function(data){
    gameState=data.val();
  });

 foodStock=database.ref('food');
 foodStock.on("value",readStock)
   } 
   function draw() {
  
  background(46, 139, 87) 
  f1.display();

  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  })
  
   textSize(20);
   fill("white")
   text("Here's your pet, "+dogname,120,100)
   fin=text("Remaining food items: "+foodS,100,150);

   fill(255,255,254);
   textSize(15)
   if(lastFed >=12){
     text("Last Feed:" +lastFed%12+"PM",350,30);
   }
   else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
   }
   else{
    text("Last Feed: " + lastFed+"AM",350,30);
   }
   
  drawSprites();
  
  
 

  if(keyWentDown(UP_ARROW)){
    dog.addImage("d1",HAPPYdog);
    writeStock(foodS);
    
    
  }

  if(foodS===0){
    foodS="Out Of Stock!";
  }

}

function readStock(data) {
foodS=data.val();
f1.updateFoodStock(foodS)


}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
database.ref('/').update({
  food:x
})

}
function feeddog(){
  dog.addImage("d1",HAPPYdog);
  writeStock(foodS);

  
  database.ref('/').update({
  food : f1.getFoodStock(),
  FeedTime: hour(),
  gameState: ""
  })

}
 
function addFoods(){
  dog.addImage("d1",dogImage);
  foodS=foodS+2
  database.ref('/').update({
  food: foodS
  })
  writeStock(foodS);
}












