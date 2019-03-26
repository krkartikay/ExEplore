var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var score = document.getElementById('score');
var m = document.getElementById('maxMath');
var pa = document.getElementById('pa');
var v = document.getElementById('victory-notification');
v.style.display = 'none';
pa.textContent = '';
var cells = new Array(), myCell, loss = false, size = 4, sc = 0;
var width = canvas.width / 4 - 6;

var myGameArea = {
    start : function() {
    	this.interval = setInterval(updateGameArea, 200);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        ctx.clearRect(0, 0, 500, 500);
    },
	clearinterval : function() {
        this.interval = clearInterval(this.interval);
    }
}

startGame();

function startGame() {
    for(var i = 0;i < 4;i++) {
    	cells[i] = [];
    	for(var j = 0; j < 4; j++) {
    		cells[i][j] = {
    			value: 0,
    			x: j * width + 5 * (j + 1),
    			y: i * width + 5 * (i + 1)
    		};
    	}
    }
    pasteNewCell();
    pasteNewCell();
    myGameArea.start();
}

function component(width, height, value, x, y, type) {
    this.gamearea = myGameArea;
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function(){
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            switch (value){
    			case 0 : ctx.fillStyle = '#A9A9A9'; break;
			    case 2 : ctx.fillStyle = '#D2691E'; break;
			    case 4 : ctx.fillStyle = '#FF7F50'; break;
			    case 8 : ctx.fillStyle = '#ffbf00'; break;
			    case 16 : ctx.fillStyle = '#bfff00'; break;
			    case 32 : ctx.fillStyle = '#40ff00'; break;
			    case 64 : ctx.fillStyle = '#00bfff'; break;
			    case 128 : ctx.fillStyle = '#FF0000'; break;
			    case 256 : ctx.fillStyle = '#0040ff'; break;
			    case 512 : ctx.fillStyle = '#ff0080'; break;
			    case 1024 : ctx.fillStyle = '#D2691E'; break;
			    case 2048 : ctx.fillStyle = '#FF7F50'; break;
			    case 4096 : ctx.fillStyle = '#ffbf00'; break;
			    default : ctx.fillStyle = '#ff0080';
			}
			ctx.fillRect(this.x, this.y, this.width, this.height);
            if (value) {
			    fontSize = width/2;
			    ctx.font = fontSize + 'px Arial';
			    ctx.fillStyle = 'white';
			    ctx.textAlign = 'center';
			    ctx.fillText(value, x + width / 2, y + width / 2 + width/7);
			}
        }
    }
}

function updateGameArea() {

	if(!loss) {
		if (myGameArea.key && myGameArea.key == 37) {
            moveLeft();
        }
        if (myGameArea.key && myGameArea.key == 39) {
            moveRight();
        }
        if (myGameArea.key && myGameArea.key == 38) {
            moveUp();
        }
        if (myGameArea.key && myGameArea.key == 40) {
            moveDown();
        }
        score.textContent = 'Score : ' + sc;
    }

	myGameArea.clear();

	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			myCell = new component(width, width, cells[i][j].value, cells[i][j].x, cells[i][j].y);
			myCell.update();
		}
	}
}

function moveRight () {
  var i, j, coll;
  for(i = 0; i < 4; i++) {
    for(j = 4 - 2; j >= 0; j--) {
      if(cells[i][j].value) {
        coll = j;
        while (coll + 1 < 4) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            sc +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveLeft() {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = 1; j < size; j++) {
      if(cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            sc +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveUp() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = 1; i < size; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            sc +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveDown() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = size - 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            sc +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function pasteNewCell() {
  var countFree = 0;
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      if(!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if(!countFree) {
    finishGame();
    return;
  }
  while(true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if(!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      return;
    }
  }
}

function finishGame() {
  
  canvas.style.opacity = '0.5';
  myGameArea.clear();
  myGameArea.clearinterval();
  v.style.display = 'block';
  pa.textContent = 'Play Again';
  pa.addEventListener('click', function(){
    location.reload();
    myGameArea.clearinterval();
    loss = true;
  });
}