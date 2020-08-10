function SplashScene(){

	var background = new GameImage("Assets/img/Splash-Background.jpg", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	var splashTime = 1.0, elapsedTime = 0;
	
	this.update = function(){
		elapsedTime += SECS;
		if (elapsedTime >= splashTime) {
			GAME_MANAGER.startScene(SceneManager.GameScene.TITLE);
		};
		background.update();
	}

	this.draw = function(){
		background.draw();
	}
}