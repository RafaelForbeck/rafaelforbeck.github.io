function CPUIndian(position){
	
	var indian = new Indian(position, 0)
	
	var CPUIndianState = {
		"WAITING" : 1,
		"DELAY" : 2
	};

	var currentCPUIndianState = CPUIndianState.WAITING;

	var delay;
	var danceStep;

	//private methods

	//publics methods
	this.update = function(){

		if (currentCPUIndianState == CPUIndianState.DELAY) {

			delay -= SECS;
			if (delay <= 0) {
				switch (danceStep){
					case PlayGameScene.danceStep.WALK_LEFT:
						indian.walkLeft();
						break;
					case PlayGameScene.danceStep.WALK_RIGHT:
						indian.walkRight();
						break;
					case PlayGameScene.danceStep.WALK:
						indian.walk();
						break;
					case PlayGameScene.danceStep.JUMP:
						indian.jump();
						break;
				}
				currentCPUIndianState = CPUIndianState.WAITING;
			};
		};
		indian.update();
	}
	
	this.draw = function(){

		indian.draw();
	}

	this.dance = function(nextStep){
		danceStep = nextStep;
		delay = Math.random() * PlayGameScene.maxDelay;
		currentCPUIndianState = CPUIndianState.DELAY;
	}

	this.getLayer = function(){
		return indian.getLayer();
	}

	this.thereCollision = function(vector2D){
		return indian.thereCollision(vector2D);
	}
}
