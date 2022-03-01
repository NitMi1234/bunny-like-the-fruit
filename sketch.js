const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var bgSound,eatSound,cutSound,sadSound,airSound
var blower
var muteButton

var rope2,rope3
var button2,button3

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  bgSound = loadSound("sound1.mp3");
  eatSound = loadSound("eating_sound.mp3");
  cutSound = loadSound("rope_cut.mp3");
  airSound = loadSound("air.mp3");
  sadSound = loadSound("sad.wav");
  
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(width/2-350,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(width/2-30,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(width/2,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  
  rope = new Rope(7,{x:width/2-330,y:30});
  rope2 = new Rope(8,{x:width/2,y:40});
  rope3 = new Rope(7,{x:width/2+30,y:225});

  ground = new Ground(width/2,height-20,width,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(width/2,height-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  bgSound.play();
  bgSound.setVolume(0.5)

  blower = createImg('blower.png');
  blower.position(100,290);
  blower.size(100,100);
  blower.mouseClicked(airBlow);

  muteButton = createImg('mute.png');
  muteButton.position(width-150,30);
  muteButton.size(50,50);
  muteButton.mouseClicked(muteSounds);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,width,height);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatSound.play();
  }
   
  if(fruit!=null&&fruit.position.y>=650)
  {
     bunny.changeAnimation('crying');
     sadSound.play();
     bgSound.stop();
     fruit=null;
   }

   drawSprites();
}

function drop2()
{
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null; 
  cutSound.play();
}

function drop3()
{
  rope3.break();
  fruit_con_3.dettach();
  fruit_con_3 = null; 
  cutSound.play();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cutSound.play();
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
  Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airSound.play();
}

function keyPressed(){
  if(keyCode===LEFT_ARROW){
    airBlow();
  }
}

function muteSounds(){
  if(bgSound.isPlaying()){
    bgSound.stop();
  }
  else{
    bgSound.play();
  }
}