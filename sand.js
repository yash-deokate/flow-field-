/// <reference path="./p5.global-mode.d.ts" />

class sand{
    constructor(){
        this.pos=createVector(random(width-scl),random(height-scl));
        this.vel=createVector(0, 0);
        this.acc=createVector(0, 0); 
        this.prevpos=this.pos.copy();
    }
    
    update(){
        this.vel=this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos=this.pos.add(this.vel);
        this.acc.mult(0);
        this.edges();
    }

    //make line using current position and previous position
    display(){
        var r=0;
        var g=map(this.pos.y, 0, width, 0, 255);
        var b=map(this.pos.x, 0, width, 0, 255);
        stroke(r,g,b,20);
        r+=10;
        if(r>255)
          r=0;
        // ellipse(this.pos.x, this.pos.y,2,2);
        line(this.pos.x,this.pos.y, this.prevpos.x, this.prevpos.y);
        this.updateprev();
    }
    //set current pos as prevpos for next round
    updateprev(){
        this.prevpos.x=this.pos.x;
        this.prevpos.y=this.pos.y;
    }



    //when sand is at perticular position, we calculate index from position vector.
    //apply the vector at that index, as acceleration.
    move(vectors){
        var i= floor(this.pos.x/scl);   //change position into multiple of scl
        var j= floor(this.pos.y/scl);   //change position into multiple of scl
        var index=i+j*col;              
        var force=vectors[index]
        this.addforce(force);
    }



    //set flow vector as acceleration
    addforce(force){
       this.acc= this.acc.add(force);
    }
    //if cross one edge come out from opposite edge 
    edges(){
        if(this.pos.x>width){
            this.pos.x=0;
            this.updateprev();
        }
          
        if(this.pos.x<0){
            this.pos.x=width;
            this.updateprev();
        }
        
        if(this.pos.y>height) {
             this.pos.y=0;
             this.updateprev();
        } 
         
        if(this.pos.y<0) {
            this.pos.y=height;
            this.updateprev();
        } 
          
    }
}






