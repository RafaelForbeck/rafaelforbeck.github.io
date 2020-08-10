function Chief(){
	
	
	var armPositionX = 760, armPositionY = 870;
	var chiefbody = new GameImage("Assets/img/Game-ChiefBody.png", 303, 480, 303, 480, new Vector2D(873, 529), 0);
	var chiefArm = new GameImage("Assets/img/Game-ChiefHand.png", 147, 218, 147, 218, new Vector2D(armPositionX, armPositionY), 0);
	chiefArm.setAnchorPoint(new Vector2D(180, 240));


	//publics methods
	this.update = function(){

		var armAngle = Math.atan2((armPositionY - MOUSEPOSITION.y), (armPositionX - MOUSEPOSITION.x));
		armAngle -= 0.95;
		if (armAngle > 0.62) {
			armAngle = 0.62;
		};

		chiefArm.setRotation(-armAngle);
		chiefArm.update();
		chiefbody.update();
	}
	
	this.draw = function(){

		chiefArm.draw();
		chiefbody.draw();
	}
}
