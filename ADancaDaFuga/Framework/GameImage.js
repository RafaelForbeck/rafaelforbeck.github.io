function GameImage(src, fileWidth, fileHeight, frameWidth, frameHeight, position, rotation){

	var image = new Image();
	image.src = src;

	var fileWidth = fileWidth;
	var fileHeight = fileHeight;

	var frameWidth = frameWidth;
	var frameHeight = frameHeight;

	var position = position;
	var rotation = rotation;

	var anchorPoint = new Vector2D(0, 0);

	var currentFrame = 0;
	var frameList = [];
	var animationFrameNumberList = [0];
	var animationTime = 1;
	var lastAnimationFrameChange = 0;

	if (checkFileDimensions()){
		buildFrameList();	
	}

	//private methods
	function checkFileDimensions() {

		if (fileWidth % frameWidth != 0) {
			console.log("largura do frame não divisível pela largura do arquivo");
			console.log("arquivo: " + fileWidth + " x " + fileHeight);
			console.log("frame: " + frameWidth + " x " + frameHeight);
			return false;
		};
		if (fileHeight % frameHeight != 0) {
			console.log("altura do frame não divisível pela altura do arquivo");
			console.log("arquivo: " + fileWidth + " x " + fileHeight);
			console.log("frame: " + frameWidth + " x " + frameHeight);
			return false;
		};
		return true;
	}

	function buildFrameList(){

		for (var i = 0; i < fileHeight / frameHeight; i++) {
			for (var j = 0; j < fileWidth / frameWidth; j++) {
				frameList.push(new Vector2D(j * frameWidth, i * frameHeight));
			};
		};
	}

	//publics methods
	this.update = function(){

		if (animationFrameNumberList.length > 1) {
			lastAnimationFrameChange += SECS;
			if (lastAnimationFrameChange > animationTime) {
				lastAnimationFrameChange -= animationTime * lastAnimationFrameChange / animationTime;
				currentFrame = (currentFrame + 1) % animationFrameNumberList.length;
			};
		};
	}

	this.draw = function(){

		var frameCoordX = frameList[animationFrameNumberList[currentFrame]].x;
		var frameCoordY = frameList[animationFrameNumberList[currentFrame]].y;
		var positionX = position.x - frameWidth / 2;
		var positionY = position.y - frameHeight / 2;


		if (rotation == 0) {
			CTX.drawImage(image, frameCoordX, frameCoordY, frameWidth, frameHeight, positionX - anchorPoint.x, positionY - anchorPoint.y, frameWidth, frameHeight);	
		}
		else{
			CTX.save();
			CTX.translate(position.x, position.y);

			CTX.rotate(-rotation);
			CTX.drawImage(image, frameCoordX, frameCoordY, frameWidth, frameHeight, -anchorPoint.x, -anchorPoint.y, frameWidth, frameHeight);	
			
			CTX.restore();
		}
	}

	this.setAnchorPoint = function(vector2D){

		anchorPoint = vector2D;
	}

	this.setPosition = function(vector2D){

		position = vector2D;
	}

	this.getPosition = function(){

		return position;
	}

	this.setRotation = function(angle){

		rotation = angle;
	}

	this.setAnimationFrames = function(frameNumberList){

		animationFrameNumberList = frameNumberList;
		currentFrame = 0;
		lastAnimationFrameChange = 0;
	}

	this.setAnimationTime = function(secs){

		animationTime = secs;
	}

	this.setImageFrame = function(numFrame){

		animationFrameNumberList = [];
		animationFrameNumberList.push(numFrame);
	}
}