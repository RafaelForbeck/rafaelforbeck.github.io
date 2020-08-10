function Player(position){
	
	var PlayerState = {
		"FLAYING" : 1,
		"DYING" : 2
	};

	var currentState = PlayerState.FLAYING;

	var flappyStrength = 800;

	var gameObject = new GameObject(position, 0)
	gameObject.setGameImage("Assets/img/player.png", 384, 128, 128, 128);
	gameObject.setAnimationFrames([0, 1]);
	gameObject.setAnimationTime(0.1);
	gameObject.setBoundingBoxDimensions(50, 50);

	var gravityEffect = new GravityEffect();
	gravityEffect.setYVelocity(-flappyStrength);
		
	//private methods

	function flaying() {

	    if (KEYS.Space || MOUSELEFTCLICK) {
	        gravityEffect.setYVelocity(-flappyStrength);
	    }

	    gameObject.setPosition(gravityEffect.calculatePosition(gameObject.getPosition()));
	    gameObject.update()
	}

	function daying() {

	    if (gameObject.getPosition().y < HEIGHT + 100) {
	        gameObject.setPosition(gravityEffect.calculatePosition(gameObject.getPosition()));
	        gameObject.update()
	    }
	}

	//publics methods
	this.update = function () {

	    switch (currentState) {
	        case PlayerState.FLAYING:
	            flaying()
	            break;
	        case PlayerState.DYING:
	            daying()
	            break;
	    }
	}
	
	this.draw = function(){

		gameObject.draw();
	}

	this.gameOver = function(){
	    gameObject.setAnimationFrames([2]);
	    gravityEffect.setYVelocity(-flappyStrength);
	    currentState = PlayerState.DYING;
	}

	this.reset = function (position) {
	    gameObject.setPosition(position);
	    gameObject.setAnimationFrames([0, 1]);
	    currentState = PlayerState.FLAYING;
	    gravityEffect.setYVelocity(-flappyStrength);
	}

	this.getPosition = function(){
	    return gameObject.getPosition();
	}

	this.getGameObject = function () {
	    return gameObject;
	}
}
