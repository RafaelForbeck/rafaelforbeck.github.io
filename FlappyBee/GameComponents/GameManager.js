function GameManager(){

	var sceneManager = new SceneManager();
	
	this.update = function(){

		sceneManager.update();
		
	}

	this.draw = function(){

		sceneManager.draw();		
	}

	this.startScene = function(gameScene){

		switch (gameScene) {
			
			case SceneManager.GameScene.TITLE:
				
				break;
			
			case SceneManager.GameScene.GAME:
				
				break;
			
		}

		sceneManager.startScene(gameScene);
	}
}