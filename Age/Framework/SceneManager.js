function SceneManager(){

	var titleScene;
	var playGameScene;

	var currentScene;
	
	//publics methods
	this.update = function(){

		switch (currentScene) {
			
			case SceneManager.GameScene.TITLE:
				titleScene.update();
				break;
			
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
			
			case SceneManager.GameScene.TITLE:
				titleScene.draw();
				break;
			
			case SceneManager.GameScene.GAME:
				playGameScene.draw();
				break;

		}
	}

	this.startScene = function(gameScene){

		switch (gameScene) {
			
			case SceneManager.GameScene.TITLE:
					titleScene = new TitleScene();
			
				break;
			
			case SceneManager.GameScene.GAME:
					playGameScene = new PlayGameScene();
			
				break;
			
		}
		currentScene = gameScene;
	}
}

SceneManager.GameScene = {
	"TITLE" : 1,
	"GAME" : 2
};