/// <reference path="./p5.global-mode.d.ts" />
var scl=15;
var xoff=0;
var yoff=0;
var zoff=0;
var flowvecs=[];
var sands=[];
var cnt;
var col,row;
function setup() {
  
  createCanvas(400, 400); 
  //scale down height and width 
  row=floor(height/scl);
  col=floor(width/scl);
  for (let i = 0; i < 200; i++) {
    s=new sand();
    sands[i]=s;
  }
  background(0);
}


//generate bunch of vectors using perlin noise
//store each vector at a perticular index.
function draw() {
  // background(255);
  yoff=0;
  cnt=0;
  for (let i = 0; i < row; i++) {
    xoff=0;
    for (let j = 0; j < col; j++) {
     
    var angle=noise(xoff,yoff,zoff)*4*PI;
     var v=p5.Vector.fromAngle(angle,scl);
     var index=j+i*col;
     flowvecs[index]=v; 
    //  push();
    //  translate(i*scl, j*scl);
    //  stroke(0);
    //  line(0, 0, v.x,v.y);
    //  pop();
     xoff+=0.01;

    }
     yoff+=0.01

     zoff+=0.0002;
   }
  
   launchSand();  
   
}


function launchSand() {
  for (let i = 0; i < sands.length; i++) {
    sands[i].move(flowvecs);
    sands[i].update(); 
    sands[i].display();
  }
}