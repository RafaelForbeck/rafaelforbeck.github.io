function Player(position){
	
	var PlayerState = {
		"IDLE" : 1,
		"WALK" : 2
	};

	var speed = 60;
	
	var gameObject = new GameObject(position, 0)
	gameObject.setGameImage("Assets/img/player.png", 57, 57, 57, 57);
	gameObject.setBoundingBoxDimensions(15, 15);

	var target = new Vector2D(gameObject.position.x, gameObject.position.y);

		
	//private methods


	//publics methods
	this.update = function(){

		if (MOUSELEFTCLICK) {
			target.x = MOUSEPOSITION.x;
			target.y = MOUSEPOSITION.y;
		};
		gameObject.moveToTarget(target, speed);

		gameObject.update()
	}
	
	this.draw = function(){

		gameObject.draw();
	}

	this.thereCollision = function(vector2D){
		
	}

	this.getPosition = function(){
		return gameObject.position;
	}

	this.changeSpeed = function(factor){
		speed *= factor;
	}
}
