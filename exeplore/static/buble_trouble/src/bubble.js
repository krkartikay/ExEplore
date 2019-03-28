function Bubble( particle, size ) {
    this.particle = particle;
    //size *= 0.9;
    this.radius = size * 0.01;
    this.size = size;
}

Bubble.prototype = {
    constructor: 'Bubble',
    integrate: function( dt ) {
        this.particle.integrate(dt,this.size,this.radius);
        //console.log(this.particle);
        // conservation of energy during collision
    
        if ( this.particle.location.y < this.radius ) {
             this.particle.location.y = this.radius;
             this.particle.velocity.y = -this.particle.velocity.y;
        }
        if ( this.particle.location.y > 1 - this.radius ) {
             this.particle.location.y = 1 - this.radius;
             this.particle.velocity.y = -this.particle.velocity.y;
        }
        if ( this.particle.location.x < this.radius ) {
             this.particle.location.x = this.radius;
             this.particle.velocity.x = -this.particle.velocity.x;
        }
        if ( this.particle.location.x > 1- this.radius ) {
             this.particle.location.x = 1 - this.radius;
             this.particle.velocity.x = -this.particle.velocity.x;
        }
        if ( this.particle.location.x - this.radius - 37/1200 < paddle.position.x/1200 + PLAYER_SIZE_W / 2
          && this.particle.location.x + this.radius - 37/1200 > paddle.position.x/1200 - PLAYER_SIZE_W / 2
          && this.particle.location.y - this.radius > 1 - PLAYER_SIZE_H ) {
            //alert("hit");
            score.death();
        }
        


    }
};
