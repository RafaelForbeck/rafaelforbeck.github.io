function Arrow(position, direction, speed){
	
	var speed = speed;
	
	var gameObject = new GameObject(position, 0)
	gameObject.setGameImage("Assets/img/bullet.png", 45, 27, 45, 27);
	gameObject.setBoundingBoxDimensions(23, 4);
	gameObject.setAnchorPoint(new Vector2D(22.5, 13.5));
	gameObject.setRotation(direction.angle());
	var startPosition = new Vector2D(position.x, position.y);
	var range
	var direction = direction;	
	
	//private methods


	//publics methods
	this.update = function(){

		gameObject.moveInDirection(direction, speed);

		gameObject.update()
	}
	
	this.draw = function(){

		gameObject.draw();
	}

	this.calculateTravelledDistance = function(){
		return Vector2D.SubtractVectors(gameObject.position, startPosition).size();
	}

	this.thereCollision = function(vector2D){
		
	}

	this.getPosition = function(){
		return gameObject.position;
	}
}
