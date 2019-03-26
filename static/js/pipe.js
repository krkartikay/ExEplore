function Pipe() {
  this.spacing = 175;
  this.left = random(width / 6, (3 / 4) * width);
  this.right =  (this.left + this.spacing);
  this.w = 80;
  this.y = -this.w;
  this.speed = 6;
  this.highlight = false;

  this.hits = function(bird) {
    if (player.x < this.left || player.x > this.right) {
      if (player.y > this.y && player.y < this.y + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
      // window.location.replace("index.html");
    }
    rect(0, this.y, this.left, this.w);
    rect(this.right, this.y, width - this.right,this.w );
  }

  this.update = function() {
    this.y += this.speed; 
  }

  this.offscreen = function() {
    if (this.y > height) {
      return true;
    } else {
      return false;
    }
  }


}