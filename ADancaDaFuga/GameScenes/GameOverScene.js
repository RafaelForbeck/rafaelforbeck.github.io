function GameOverScene(){

	var background;
	switch (GAME_MANAGER.finalScene){
		case GAME_MANAGER.FinalScene.RIGHT_GUY:
			background = new GameImage("Assets/img/Gameover-RightGuy.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
			break;
		case GAME_MANAGER.FinalScene.WRONG_GUY:
			background = new GameImage("Assets/img/Gameover-WrongGuy.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
			break;
		case GAME_MANAGER.FinalScene.RAN_AWAY:
			background = new GameImage("Assets/img/Gameover-RanAway.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);		
			break;
	}

	//button "Jogar"
	var btnJogar = new GameButton(new Vector2D(890, 720), 0, 0, 1, 0, 0);
	btnJogar.setGameImage("Assets/img/Title-PlayButton.png", 249, 148, 249, 74);
	btnJogar.setOnMouseClick(function(){
		GAME_MANAGER.startScene(SceneManager.GameScene.GAME);
	})

	//button "Sair"
	var btnSair = new GameButton(new Vector2D(134, 720), 0, 0, 1, 0, 0);
	btnSair.setGameImage("Assets/img/Title-QuitButton.png", 249, 148, 249, 74);
	btnSair.setOnMouseClick(function(){
		GAME_MANAGER.startScene(SceneManager.GameScene.SPLASH);
	})

	var credits = new GameImage("Assets/img/Credits.png", 485, 768, 485, 768, new Vector2D(512, 1200), 0);		
	
	this.update = function(){
		
		background.update();
		if (credits.getPosition().y > -500) {
			credits.getPosition().y -= SECS * 300;
		};
		btnJogar.update();
		btnSair.update();

	}

	this.draw = function(){
		background.draw();
		credits.draw();
		btnJogar.draw();
		btnSair.draw();
	}
}