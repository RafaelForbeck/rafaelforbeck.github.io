function Indian(position){
	
	var gameObject = new GameObject(position, 0)
	gameObject.setGameImage("Assets/img/IndianDancer.png", 1000, 120, 100, 120);
	gameObject.setBoundingBoxDimensions(30, 96);
	gameObject.setAnimationFrames([0, 1]);
	gameObject.setAnimationTime(0.4);

	var IndianState = {
		"STAND" : 1,
		"WALK_LEFT" : 2,
		"WALK_RIGHT" : 3,
		"WALK" : 4,
		"JUMP_UP" : 5,
		"JUMP_Down" : 6,
		"RUN" : 7
	};

	var currentState = IndianState.STAND;

	var stepLength = 40, jumpHeight = 30, walkLenth = 30;
	var target;
	var walkSpeed = 60, jumpSpeed = 150;

	var layer = position.y;

	var steps = 0;

	//private methods


	//publics methods

	this.stand = function(){
		currentState = IndianState.STAND;
		gameObject.setAnimationFrames([0, 1]);
		gameObject.setAnimationTime(0.4);
	}
	this.walkLeft = function(){
		if (currentState == IndianState.STAND) {
			currentState = IndianState.WALK_LEFT;
			target = gameObject.position.x - stepLength;
			gameObject.setAnimationFrames([5, 6, 7, 6]);
			gameObject.setAnimationTime(0.2);
		};
	}
	this.walkRight = function(){
		if (currentState == IndianState.STAND) {
			currentState = IndianState.WALK_RIGHT;
			target = gameObject.position.x + stepLength;
			gameObject.setAnimationFrames([4, 3, 2, 3]);
			gameObject.setAnimationTime(0.2);
		};
	}
	this.walk = function(){
		if (currentState == IndianState.STAND) {
			currentState = IndianState.WALK;
			target = gameObject.position.y + walkLenth;
			gameObject.setAnimationFrames([0, 1]);
			gameObject.setAnimationTime(0.2);
			steps++;
		};
	}
	this.jump = function(){
		if (currentState == IndianState.STAND) {
			currentState = IndianState.JUMP_UP;
			target = gameObject.position.y - jumpHeight;
			gameObject.setAnimationFrames([9, 8, 9]);
			gameObject.setAnimationTime(0.3);
		};
	}
	this.run = function(){
		currentState = IndianState.RUN;
		gameObject.setAnimationFrames([5, 6, 7, 6]);
		gameObject.setAnimationTime(0.1);
	}

	this.update = function(){

		switch (currentState){

			case IndianState.STAND:
				//
				break;
			case IndianState.WALK_LEFT:
				gameObject.position.x -= walkSpeed * SECS;
				if (gameObject.position.x <= target) {
					gameObject.position.x = target;
					this.stand();
				};
				break;
			case IndianState.WALK_RIGHT:
				gameObject.position.x += walkSpeed * SECS;
				if (gameObject.position.x >= target) {
					gameObject.position.x = target;
					this.stand();
				};
				break;
			case IndianState.WALK:
				gameObject.position.y += walkSpeed * SECS;
				layer = gameObject.position.y;
				if (gameObject.position.y >= target) {
					gameObject.position.y = target;
					this.stand();
				};
				break;
			case IndianState.JUMP_UP:
				gameObject.position.y -= jumpSpeed * SECS;
				if (gameObject.position.y <= target) {
					gameObject.position.y = target
					target = gameObject.position.y + jumpHeight;
					currentState = IndianState.JUMP_Down;
				};
				break;
			case IndianState.JUMP_Down:
				gameObject.position.y += jumpSpeed * SECS;
				if (gameObject.position.y >= target) {
					gameObject.position.y = target;
					this.stand();
				};
				break;
			case IndianState.RUN:
				//
				break;
		}
			
		gameObject.update();
	}
	
	this.draw = function(){

		gameObject.draw();
	}

	this.getLayer = function(){
		return layer;
	}

	this.thereCollision = function(vector2D){
		return gameObject.thereCollisionWithPoint(vector2D);
	}

	this.getPosition = function(){
		return gameObject.getPosition();
	}

	this.getSteps = function(){
		return steps;
	}
}
