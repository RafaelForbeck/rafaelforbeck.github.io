function GameObject(position, rotation){
	
	var rotation = rotation;
	var gameImage;
	var boundingBox;
	var anchorPoint = new Vector2D(0, 0);

	this.position = position;
	
	//private methods

	function updateBoundingBox(){

		if (boundingBox != null){
	
			if (rotation == 0) {

				boundingBox.setCenter(new Vector2D(position.x - anchorPoint.x, position.y - anchorPoint.y));
			}
			else{

				var length = Math.sqrt(Math.pow(anchorPoint.x, 2) + Math.pow(anchorPoint.y, 2));
				boundingBox.setCenter(new Vector2D(position.x + Math.cos(rotation) * length, position.y + -Math.sin(rotation) * length));
			};
		};
	}

	//publics methods
	this.update = function(){
			
	    if (gameImage != undefined) {

		    gameImage.update();
	    }
		updateBoundingBox();
	}
	
	this.draw = function(){

		if (gameImage != null) {
			gameImage.draw()
		};

		//CTX.rect(boundingBox.getRectangle().x, boundingBox.getRectangle().y, boundingBox.getRectangle().width, boundingBox.getRectangle().height);
		//CTX.rect(position.x, position.y, 1, 1);
		//CTX.stroke();
	}

	this.setPosition = function(vector2D){

		position = vector2D;
		if (gameImage != null) {
			gameImage.setPosition(vector2D);
		};
	}

	this.getPosition = function(){

		return position;
	}

	this.setRotation = function(angle){

		rotation = angle;
		if (gameImage != null) {

			gameImage.setRotation(angle);
		};
	}

	this.getRotation = function(){

		return rotation;
	}

	this.setAnchorPoint = function(vector2D){

		anchorPoint = vector2D;
		if (gameImage != null) {
			gameImage.setAnchorPoint(vector2D);
		};
	}	

	this.setGameImage = function(src, fileWidth, fileHeight, frameWidth, frameHeight){

		gameImage = new GameImage(src, fileWidth, fileHeight, frameWidth, frameHeight, position, rotation);

		if (boundingBox == null){
			
			boundingBox = new BoundingBox(new Vector2D(position.x, position.y), frameWidth, frameHeight);
		};
	}

	this.setAnimationFrames = function(frameNumberList){

		gameImage.setAnimationFrames(frameNumberList);
	}

	this.setAnimationTime = function(secs){

		gameImage.setAnimationTime(secs);
	}

	this.setBoundingBoxDimensions = function(width, height){

		if (boundingBox == null) {
			if (anchorPoint != null) {
				boundingBox = new BoundingBox(new Vector2D(position.x + anchorPoint.x + width / 2, position.y + anchorPoint.y + height / 2), width, height);
			}
			else{
				boundingBox = new BoundingBox(new Vector2D(position.x + width / 2, position.y + height / 2), width, height);
			}
		}
		else{
			boundingBox.setDimensions(width, height);
		}
	}

	this.getBoundingBox = function () {
	    return boundingBox;
	}

	this.thereCollisionWithPoint = function(vector2D){

		return boundingBox.thereCollisionWithPoint(vector2D);
	}

	this.thereCollisionWithBoundingBox = function (otherBoundingBox) {

	    return boundingBox.thereCollisionWithBoundingBox(otherBoundingBox);
	}

	this.setImageFrame = function(numFrame){

		gameImage.setImageFrame(numFrame);
	}

	this.moveToTarget = function(targetPosition, speed){

		if (position.x == targetPosition.x && position.y == targetPosition.y) 
			return;
		
		var vectorDistance = Vector2D.SubtractVectors(targetPosition, position);
		var vectorMovement = new Vector2D(vectorDistance.x, vectorDistance.y);
		vectorMovement.normalize();
		vectorMovement.multiply(speed * SECS);

		var size1 = vectorMovement.size();
		var size2 = vectorDistance.size();

		if (size1 >= size2) {	
			this.position.x = targetPosition.x;
			this.position.y = targetPosition.y;
			return
		};

		this.position.sum(vectorMovement);
	}

	this.moveInDirection = function(vectorDirection, speed){

		vectorMovement = new Vector2D(vectorDirection.x, vectorDirection.y);
		vectorMovement.normalize();
		vectorMovement.multiply(speed * SECS);

		this.position.sum(vectorMovement);
	}
}
