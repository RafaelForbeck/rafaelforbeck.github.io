function Box(position){

	var gameObject = new GameObject(position, 0)
	gameObject.setGameImage("Assets/img/box.png", 256, 128, 128, 128);
	gameObject.setBoundingBoxDimensions(128, 128);
			
	//private methods


	//publics methods
	this.update = function(playerPosition){

	    gameObject.update()
	}
	
	this.draw = function(){

	    gameObject.draw();
	}

	this.moveInDirection = function (vectorDirection, speed) {

	    gameObject.moveInDirection(vectorDirection, speed);
	}

	this.getPosition = function () {
	    return gameObject.getPosition();
	}

	this.getGameObject = function () {
	    return gameObject;
	}
}
