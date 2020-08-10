function Player(position){
	
	var indian = new Indian(position, 0)
	
	var PlayerState = {
		"PLAY" : 1,
		"RUN" : 2
	};

	var currentState = PlayerState.PLAY;

	var startYposition = position.y;
	var exclamation = false;
	var exclamationImage;
	//private methods


	//publics methods
	this.update = function(){

		switch (currentState){
			case PlayerState.PLAY :

				if (KEYS.Left) {
				indian.walkLeft();
				}
				else if (KEYS.Right) {
					indian.walkRight();
				}
				else if (KEYS.Up) {
					indian.jump();
				}
				else if (KEYS.Down) {
					indian.walk();
					if (indian.getSteps() >= 10) {
						currentState = PlayerState.RUN;
						indian.run();
					}
				};
				break;

			case PlayerState.RUN :

				if (indian.getPosition().x > 400) {
					indian.getPosition().x -= 400 * SECS;
				}
				else{
					indian.getPosition().x -= 320 * SECS;
					indian.getPosition().y += 240 * SECS;
				}
				if (indian.getPosition().x <= 0) {
					GAME_MANAGER.finalScene = GAME_MANAGER.FinalScene.RAN_AWAY;
					GAME_MANAGER.startScene(SceneManager.GameScene.GAMEOVER);
				};
				break;
		}

		indian.update();
	}
	
	this.draw = function(){

		indian.draw();
		if (exclamation) {
			exclamationImage.draw();
		};
	}

	this.getLayer = function(){
		return indian.getLayer();
	}

	this.exclamation = function(){

		exclamation = true;
		exclamationImage = new GameImage("Assets/img/Game-Exclamation.png", 12, 53, 12, 53, indian.getPosition(), 0);
		exclamationImage.setAnchorPoint(new Vector2D(0, 70));
	}

	this.thereCollision = function(vector2D){
		return indian.thereCollision(vector2D);
	}
}
