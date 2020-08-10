function GameManager(){

	this.FinalScene = {
		"RIGHT_GUY" : 1,
		"WRONG_GUY" : 2,
		"RAN_AWAY" : 3
	}

	this.finalScene;
	this.playerCought = false;

	var sceneManager = new SceneManager();
	var musicPlayer = new MusicPlayer();

	this.update = function(){

		sceneManager.update();
		
	}

	this.draw = function(){

		sceneManager.draw();		
	}

	this.startScene = function(gameScene){

		switch (gameScene) {
			case SceneManager.GameScene.SPLASH:
				musicPlayer.stop();
				break;
			case SceneManager.GameScene.TITLE:
				musicPlayer.playMusic(musicPlayer.Music.TITLE);
				break;
			case SceneManager.GameScene.CUTSCENES:
				break;
			case SceneManager.GameScene.GAME:
				musicPlayer.playMusic(musicPlayer.Music.GAME);
				break;
			case SceneManager.GameScene.GAMEOVER:
				break;
		}

		sceneManager.startScene(gameScene);
	}
}