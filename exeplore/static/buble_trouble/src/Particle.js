var GRAVITATIONAL_ACCELERATION = 1 / 100000;

function Particle( location, velocity ) {
    this.location = location;
    this.velocity = velocity;
    //this.velocity.x = 0;
    //this.velocity.y = 0.005;
}

Particle.prototype = {
    constructor: 'Particle',
    integrate: function( dt , size, radius ) {
      //console.log(size);
      //size/=0.9;
      this.velocity.y += GRAVITATIONAL_ACCELERATION  + 0.002;
        switch (size) {
        case 1:
          // statements_1
          this.location.x += this.velocity.x/2;
          this.location.y += this.velocity.y /5;
          //console.log(this.location.y);
          break;
        case 2:
          this.location.x += this.velocity.x/2.2;
          this.location.y += this.velocity.y /5;
          break;
        case 3:
          this.location.x += this.velocity.x/size;
          this.location.y += this.velocity.y /5;
          break;
        case 4:
          this.location.x += this.velocity.x/size;
          this.location.y += this.velocity.y /5;
          break;
        case 5:
          this.location.x += this.velocity.x/size;
          this.location.y += this.velocity.y /5;
          break;
      }
        
        
        //console.log(size);
        
    }
};
