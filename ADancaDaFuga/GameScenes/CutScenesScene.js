function CutScenesScene(){
	
	//cutscenes
	var cutscene1 = new GameImage("Assets/img/Story-Frame1.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	var cutscene2 = new GameImage("Assets/img/Story-Frame2.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	var cutscene3 = new GameImage("Assets/img/Story-Frame3.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);

	//game instructions
	var gameInstructions = new GameImage("Assets/img/Game-Instructions.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);

	var currentScene = 1;

	//button "Avançar"
	var btnAvancar = new GameButton(new Vector2D(860, 684), 0, 0, 1, 0, 0);
	btnAvancar.setGameImage("Assets/img/Story-Next.png", 249, 148, 249, 74);
	btnAvancar.setBoundingBoxDimensions(189, 74);

	function changeScene(){
		currentScene++;
		if (currentScene == 4) {
			btnAvancar.setPosition(new Vector2D(786, 660))
		};
		if (currentScene > 4) {
			GAME_MANAGER.startScene(SceneManager.GameScene.GAME);
		};
	}

	btnAvancar.setOnMouseClick(changeScene);

	this.update = function(){

		btnAvancar.update();
	}

	this.draw = function(){
		
		switch (currentScene){
			case 1:
				cutscene1.draw();
				break;
			case 2:
				cutscene2.draw();
				break;
			case 3:
				cutscene3.draw();
				break;
			case 4:
				gameInstructions.draw();
				break;
			default:
				gameInstructions.draw();
				break;
		}
		btnAvancar.draw();
	}
}