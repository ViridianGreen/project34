const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var destroy = false;
var destroy2 = false;
var gameState = "onSling";


var score = 0;
function preload() {
    bgImg = loadImage("BG.png");
    blockImg = loadImage("block.png")
    pigImg = loadImage('pig.png')
    blocks =[];

    bgSound = loadSound('Angry-Birds-Theme-Song.mp3')
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;
    bgSound.play()

    for(var i = 1, j=300,k=800; i<=12;i++){
        if(i%2==0){
          j = j+50;
          k=900;
        }
        else{
          k=700
        }
        
       Block = new BLOCK(k,j,30,50);
       j = j-50;
       blocks.push(Block)
       }

       pig = Bodies.circle(780,530,40)
       World.add(world,pig)

       pig2 = Bodies.circle(780,520,40)
       World.add(world,pig2)

       //pig3 = Bodies.circle(780,510,40)
       //World.add(world,pig3)


    ground = new Ground(600,height,1200,20);



    bird = new Bird(215,340);

    
    slingshot = new SlingShot(bird.body,{x:200, y:370});
}

function draw(){
    
        background(bgImg);
      

        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
        
    Engine.update(engine);
  
    ground.display();

   if(destroy == false){ image(pigImg,pig.position.x,pig.position.y,40,40)}
    if(destroy2 == false){image(pigImg,pig2.position.x,pig2.position.y,40,40)}
    //image(pigImg,pig3.position.x,pig3.position.y,40,40)
   
    for (var Block of blocks) {
        Block.show();
      }


    bird.display();
   
    slingshot.display();   
    
    if(pig.position.x<750||
        pig.position.x>850){
       destroy = true;
        }

     if(pig2.position.x<750||
        pig2.position.x>950){
        destroy2 = true;
        }

        if((destroy == true&& destroy2 == false) ||
        (destroy2 == true&& destroy == false) ){
            score = 500
        }
        else if(destroy == true && destroy2 == true){
            score = 1000;
        }
}

function mouseDragged(){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
}
function keyPressed(){
    if(keyCode === 32 ){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       slingshot.attach(bird.body);
    }



}







