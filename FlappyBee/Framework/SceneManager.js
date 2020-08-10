function SceneManager(){

	var playGameScene;

	var currentScene;
	
	//publics methods
	this.update = function(){

		switch (currentScene) {
			
			case SceneManager.GameScene.GAME:
				playGameScene.update();
				break;
			
			default:
				throw "Cena inválida";
				break;

		}
	}

	this.draw = function(){

		switch (currentScene) {
			
			case SceneManager.GameScene.GAME:
				playGameScene.draw();
				break;

		}
	}

	this.startScene = function(gameScene){

		switch (gameScene) {
			
			case SceneManager.GameScene.GAME:
					playGameScene = new PlayGameScene();
			
				break;
			
		}
		currentScene = gameScene;
	}
}

SceneManager.GameScene = {

    "GAME": 1
};