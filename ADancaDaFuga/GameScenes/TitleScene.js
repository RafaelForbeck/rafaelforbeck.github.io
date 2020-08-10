function TitleScene(){
	
	//background
	var background = new GameImage("Assets/img/Title-Background.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	
	//campfire
	var campFire = new GameImage("Assets/img/Title-Game-Campfire.png", 564, 313, 188, 313, new Vector2D(535, 575), 0);
	campFire.setAnimationFrames([2,1,0]);
	campFire.setAnimationTime(0.2);

	//button "Jogar"
	var btnJogar = new GameButton(new Vector2D(860, 684), 0, 0, 1, 0, 0);
	btnJogar.setGameImage("Assets/img/Title-PlayButton.png", 249, 148, 249, 74);
	btnJogar.setOnMouseClick(function(){
		GAME_MANAGER.startScene(SceneManager.GameScene.CUTSCENES);
	})

	this.update = function(){

		background.update();
		campFire.update();
		btnJogar.update();
	}

	this.draw = function(){
		background.draw();
		campFire.draw();
		btnJogar.draw();
	}
}