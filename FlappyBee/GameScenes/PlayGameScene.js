function PlayGameScene(){
	
    var GameState = {
        "PLAYING": 1,
        "GAMEOVER": 2,
        "REDIRECTING": 3
    };

    var currentState = GameState.PLAYING;

	//background
	var background = new GameImage("Assets/img/background.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	
    //player
	var startPlayerPosition = new Vector2D(200, 350);
	var player = new Player(startPlayerPosition);

    //obstacles
	var obstacles = [];
	var obstacleInterval = 2;
	var elapsedTime = 0;

    //score
	var txtScore = new GameText("0", "Gray", "60px", "Verdana", new Vector2D(512, 60));
	var score = 0;


    //private methods

	function playing() {

	    for (var i = obstacles.length - 1; i >= 0; i--) {
	        obstacles[i].update();
	        if (obstacles[i].scoreWasGet(player.getGameObject().getPosition())) {

	            score++;
	            txtScore.setText(score);
	        }
	        if (obstacles[i].getXPosition() < -200) {
	            obstacles.splice(i, 1);
	        }
	    }


	    if (elapsedTime <= 0) {

	        obstacles.push(new Obstacle());
	        elapsedTime += obstacleInterval;
	    }
	    elapsedTime -= SECS;	    

	    if (player.getPosition().y < 0 || player.getPosition().y > HEIGHT || isPlayerColliding()) {

	        player.gameOver();
	        currentState = GameState.GAMEOVER;
	    }
	}

	function gameOver() {
	    
	    if (player.getPosition().y > HEIGHT) {

	        currentState = GameState.REDIRECTING;
	        window.location = "index.html";
	    }
	}

	function resetGame() {

	    currentState = GameState.PLAYING;
	    player.reset(startPlayerPosition);
	    obstacles = [];
	    elapsedTime = 0;
	    score = 0;
	    txtScore.setText(score);
	}

	function isPlayerColliding() {

	    for (var i = 0; i < obstacles.length; i++) {
	        if (obstacles[i].thereCollision(player.getGameObject().getBoundingBox())) {
	            return true;
	        }
	    }
	}

	//public methods
	this.update = function () {

	    background.update();
	    player.update();

	    switch (currentState) {
	        case GameState.PLAYING:
	            playing();
	            break;
	        case GameState.GAMEOVER:
	            gameOver();
	            break;
	    }
	}

	this.draw = function(){
		background.draw();
		for (var i = 0; i < obstacles.length; i++) {
		    obstacles[i].draw();
		}
		player.draw();
		txtScore.draw();

		switch (currentState) {
		    case GameState.PLAYING:
		        break;
		    case GameState.GAMEOVER:
		        break;
		}
	}
}

