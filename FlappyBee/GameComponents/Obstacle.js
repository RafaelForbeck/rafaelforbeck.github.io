function Obstacle(){
	
    var speed = 250;
    var gapSize = 250;
    var maxGapHeight = 600;
    var minGapHeight = 150;

    var gapHeight = Math.random() * (maxGapHeight - minGapHeight) + minGapHeight;

    var boxSize = 128;

    var direction = new Vector2D(-1, 0);
    var boxes = [];

    var nextBoxPosition = gapHeight + (gapSize / 2) + (boxSize / 2);
    while (nextBoxPosition < HEIGHT + boxSize / 2) {
        boxes.push(new Box(new Vector2D(WIDTH + boxSize / 2, nextBoxPosition)));
        nextBoxPosition += boxSize;
    }
    nextBoxPosition = gapHeight - (gapSize / 2) - (boxSize / 2);
    while (nextBoxPosition > 0 - boxSize / 2) {
        boxes.push(new Box(new Vector2D(WIDTH + boxSize / 2, nextBoxPosition)));
        nextBoxPosition -= boxSize;
    }

    //score point
    var scorePoint = new GameObject(new Vector2D(boxes[0].getPosition().x + boxSize, gapHeight), 0)
    scorePoint.setBoundingBoxDimensions(boxSize, gapSize);
	
	//private methods


	//publics methods
	this.update = function(){

	    for (var i = 0; i < boxes.length; i++) {
	        boxes[i].moveInDirection(direction, speed);
	        boxes[i].update();
	    }
	    if (scorePoint != null) {
	        scorePoint.setPosition(new Vector2D(boxes[0].getPosition().x + boxSize, gapHeight));
	        scorePoint.update();
	    }
	}
	
	this.draw = function(){

	    for (var i = 0; i < boxes.length; i++) {
	        boxes[i].draw();
	    }
	    if (scorePoint != null) {

	        scorePoint.draw();
	    }
	}

	this.thereCollision = function(boundingBox){
	    for (var i = 0; i < boxes.length; i++) {
	        if (boxes[i].getGameObject().thereCollisionWithBoundingBox(boundingBox)) {
	            return true;
	        }
	    }
	}

	this.getXPosition = function(){
	    return boxes[0].getGameObject().getPosition().x;
	}

	this.scoreWasGet = function (position) {
	    if (scorePoint == null) {
	        return false;
	    }
	    if (scorePoint.thereCollisionWithPoint(position)) {
	        scorePoint = null;
	        return true;
	    }
	    return false;
	}
}
