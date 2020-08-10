function TitleScene(){
	
	//background
	var background = new GameImage("Assets/img/background.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	
	//button "Jogar"
	var btnStart = new GameButton(new Vector2D(860, 684), 0, 0, 1, 0, 0);
	btnStart.setGameImage("Assets/img/btn-start.png", 246, 210, 246, 105);
	btnStart.setBoundingBoxDimensions(210, 70);
	btnStart.setOnMouseClick(function(){
		GAME_MANAGER.startScene(SceneManager.GameScene.GAME);
	})

	this.update = function(){

		background.update();
		btnStart.update();
	}

	this.draw = function(){
		background.draw();
		btnStart.draw();
	}
}