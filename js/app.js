const gameBoard = {
	width: 505,
	height: 606,
	rows: 6,
	columns: 5,
	cellWidth: 100,
	cellHeight: 84,
	rightEdge: 405,
	leftEdge: 0,
	topEdge: -20,
	bottomEdge: 450,
	playerStartX: 200,
	playerStartY: 380,
}

class Enemy {
	constructor(startY, speed) {
		this.sprite = 'images/enemy-bug.png';
		// start them off canvas
		this.x = -120;
		// centers them in their lane
		this.y = startY - (gameBoard.cellHeight/3);
		// set the speed
		this.speed = speed;
	}

	checkCollisions(playerCords){
		this.x <= (playerCords.x + gameBoard.cellWidth/2) && this.x >= (playerCords.x - gameBoard.cellWidth/2) ?
			player.playerReset()
			:
			null
	}

	// Update the enemy's position
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// if we go just off canvas on right edge
		if (this.x >= (gameBoard.rightEdge + gameBoard.cellWidth)) {
			// move back to the left edge of the board
			this.x = gameBoard.leftEdge;
		} else {
			// move the bug along
			this.x = this.x + (this.speed * dt);

			//check for collisions
			const playerCords = player.getCords();
			(this.y - 12) === playerCords.y ? this.checkCollisions(playerCords) : null
		}
	}
		// Draw the enemy on the screen
    render() {
         ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
	constructor(){
		this.sprite = 'images/char-boy.png';
		this.x = gameBoard.playerStartX;
		this.y = gameBoard.playerStartY;
	}

	handleInput(direction) {
		this.update(direction)
	}

	update(direction) {
		direction === 'left' && this.x >= (gameBoard.leftEdge + gameBoard.cellWidth/2) ?
			this.x = this.x - gameBoard.cellWidth
			:
			direction === 'right' && this.x <= (gameBoard.rightEdge - gameBoard.cellWidth/2) ?
				this.x = this.x + gameBoard.cellWidth
				:
				direction === 'up' && this.y >= (gameBoard.topEdge + gameBoard.cellHeight/2) ?
					this.y = this.y - gameBoard.cellHeight
					:
					direction === 'down' && this.y <= (gameBoard.bottomEdge - gameBoard.cellHeight) ?
						this.y = this.y + gameBoard.cellHeight
						:
						null
	}

		// Draw the player on the screen
    render() {
         ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		 // wait half second to check if player is in winner area
		 setTimeout(()=> {
			 if (this.y === (gameBoard.topEdge - 20)) {
				 alert('You Won!');
				 this.playerReset();
			 }
		 }, 500)
    }

	getCords() {
		const playerCords = {
			x: this.x,
			y: this.y,
		};
		return playerCords;
	}

	playerReset() {
		this.x = gameBoard.playerStartX;
		this.y = gameBoard.playerStartY;
	}
}

const allEnemies = [];
const createEnemies = (num, startSpeed) => {
	let speed = startSpeed;
	let lane = 1;
	for (let i = 0; i <= num; i++){
		allEnemies.push(new Enemy((gameBoard.cellHeight*lane),speed))
		speed = speed - 100;
		lane = lane + 1;
		lane >= 4 ? lane = 1 : null
	}
}
createEnemies(10,500);
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
