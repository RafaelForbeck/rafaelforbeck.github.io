function GameButton(position, rotation, standardFrame, mouseoverFrame, enableFrame, selectedFrame){

	var gameObject = new GameObject(position, rotation)

	var mouseover = false;
	var enable = true;
	var selected = false;

	var standardFrame = standardFrame,
		mouseoverFrame = mouseoverFrame,
		desableFrame = enableFrame,
		selectedFrame = selectedFrame;

	function checkMouseover(){

		if (gameObject.thereCollisionWithPoint(MOUSEPOSITION)){
			mouseover = true;
		}
		else{
			mouseover = false;
		};
	}

	function setImageFrame(){

		if (!enable) {
			gameObject.setImageFrame(desableFrame);
			return;
		};
		if (selected) {
			gameObject.setImageFrame(selectedFrame);
			return;
		};
		if (mouseover) {
			gameObject.setImageFrame(mouseoverFrame);
			return;
		};
		gameObject.setImageFrame(standardFrame);
		return;
	}

	function onMouseClick(){

	}

	function checkMouseClick(){

		if (mouseover) {
			onMouseClick();
		};
	}

	//public methods
	this.update = function(){

		checkMouseover();
		if (MOUSELEFTCLICK) {checkMouseClick()};
		setImageFrame();
		gameObject.update();
	}

	this.draw = function(){

		gameObject.draw();
	}

	this.setGameImage = function(src, fileWidth, fileHeight, frameWidth, frameWeight){

		gameObject.setGameImage(src, fileWidth, fileHeight, frameWidth, frameWeight);
	}

	this.setPosition = function(vector2D){

		gameObject.setPosition(vector2D)
	}

	this.setRotation = function(angle){

		gameObject.setRotation(angle)
	}

	this.setAnchorPoint = function(vector2D){

		gameObject.setAnchorPoint(vector2D);
	}

	this.setBoundingBoxDimensions = function(width, height){

		gameObject.setBoundingBoxDimensions(width, height);
	}

	this.setOnMouseClick = function(functionCalled){
		onMouseClick = functionCalled;
	}
}






