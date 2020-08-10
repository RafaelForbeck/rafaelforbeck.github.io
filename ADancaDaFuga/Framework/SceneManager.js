function SceneManager(){

	var splashScene;
	var titleScene;
	var cutScenesScene;
	var playGameScene;
	var gameOverScene;

	var currentScene;
	
	//publics methods
	this.update = function(){

		switch (currentScene) {
			case SceneManager.GameScene.SPLASH:
				splashScene.update();
				break;
			case SceneManager.GameScene.TITLE:
				titleScene.update();
				break;
			case SceneManager.GameScene.CUTSCENES:
				cutScenesScene.update();
				break;
			case SceneManager.GameScene.GAME:
				playGameScene.update();
				break;
			case SceneManager.GameScene.GAMEOVER:
				gameOverScene.update();
				break;
			default:
				throw "Cena inválida";
				break;

		}
	}

	this.draw = function(){

		switch (currentScene) {
			case SceneManager.GameScene.SPLASH:
				splashScene.draw();
				break;
			case SceneManager.GameScene.TITLE:
				titleScene.draw();
				break;
			case SceneManager.GameScene.CUTSCENES:
				cutScenesScene.draw();
				break;
			case SceneManager.GameScene.GAME:
				playGameScene.draw();
				break;
			case SceneManager.GameScene.GAMEOVER:
				gameOverScene.draw();
				break;

		}
	}

	this.startScene = function(gameScene){

		switch (gameScene) {
			case SceneManager.GameScene.SPLASH:
					splashScene = new SplashScene();
				// if (splashScene == null) {
				// };
				break;
			case SceneManager.GameScene.TITLE:
					titleScene = new TitleScene();
				// if (titleScene == null) {
				// };
				break;
			case SceneManager.GameScene.CUTSCENES:
					cutScenesScene = new CutScenesScene();
				// if (cutScenesScene == null) {
				// };
				break;
			case SceneManager.GameScene.GAME:
					playGameScene = new PlayGameScene();
				// if (playGameScene == null) {
				// };
				break;
			case SceneManager.GameScene.GAMEOVER:
					gameOverScene = new GameOverScene();
				// if (gameOverScene == null) {
				// };
				break;
		}
		currentScene = gameScene;
	}
}

SceneManager.GameScene = {
	"SPLASH" : 1,
	"TITLE" : 2,
	"CUTSCENES" : 3,
	"GAME" : 4,
	"GAMEOVER" : 5
};