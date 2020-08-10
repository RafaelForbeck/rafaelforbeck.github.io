function PlayGameScene(){
	
	var PlayState = {
		"DANCE" : 1,
		"CAUGHT" : 2
	};

	var currentPlayState = PlayState.DANCE;
	var waitingTime = 1.5;

	//background
	var background = new GameImage("Assets/img/Game-Background.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	//foreground
	var foreground = new GameImage("Assets/img/Game-Foreground.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	//campfire
	var campFire = new GameImage("Assets/img/Game-Campfire.png", 360, 200, 120, 200, new Vector2D(500, 600), 0);
	campFire.setAnimationFrames([2, 1, 0]);
	campFire.setAnimationTime(0.2);
	
	var drummers = new Drummers();
	var chief = new Chief();

	//indians
	var player;
	var cpuIndians = [];

	var stepTime = 3
	var lastStepTime = stepTime;
	var nextStep = 0;

	var playerLine;
	var playerColumn;

	var dance = [];

	var totalSteps = 0;
	PlayGameScene.maxDelay = 1.2;

	createPlayer();
	createCPUs();
	createDance();

	//private mothods
	function createPlayer(){

		//posição do jogador
		playerLine = Math.floor(Math.random() * 3);
		playerColumn = Math.floor(Math.random() * 4);

		player = new Player(new Vector2D(400 + 80 * playerColumn + 40 * (playerLine == 2 ? 0 : playerLine), 75 * playerLine + 90 + 5 * playerColumn));
	}
	function createCPUs(){

		for (var line = 0; line < 3; line++)
		{
			for (var column = 0; column < 4; column++)
			{
				if (playerLine != line || playerColumn != column)
				{
					var indianPosition = new Vector2D(400 + 80 * column + 40 * (line == 2 ? 0 : line), 75 * line + 90 + 5 * column);

					cpuIndians.push(new CPUIndian(indianPosition));
				}
			}
		}
	}

	function createDance(){
		switch (Math.floor(Math.random() * 4)){
			
			case 0:
				dance = [
					PlayGameScene.danceStep.JUMP,
					PlayGameScene.danceStep.WALK_LEFT,
					PlayGameScene.danceStep.WALK_RIGHT,
					PlayGameScene.danceStep.WALK,
				];
				break;
			case 1:
				dance = [
					PlayGameScene.danceStep.WALK_LEFT,
					PlayGameScene.danceStep.JUMP,
					PlayGameScene.danceStep.WALK_RIGHT,
					PlayGameScene.danceStep.WALK,
				];
				break;
			case 2:
				dance = [
					PlayGameScene.danceStep.WALK_RIGHT,
					PlayGameScene.danceStep.WALK_LEFT,
					PlayGameScene.danceStep.JUMP,
					PlayGameScene.danceStep.WALK,
				];
				break;
			case 3:
				dance = [
					PlayGameScene.danceStep.WALK_RIGHT,
					PlayGameScene.danceStep.JUMP,
					PlayGameScene.danceStep.WALK_LEFT,
					PlayGameScene.danceStep.JUMP,
					PlayGameScene.danceStep.WALK,
				];
				break;
		}
	}

	//public methods
	this.update = function(){

		switch	(currentPlayState){
			case PlayState.DANCE:
				lastStepTime -= SECS;
				if (lastStepTime <= 0) {
					for (var i = 0; i < cpuIndians.length; i++) {
						cpuIndians[i].dance(dance[nextStep]);
					};	
					nextStep = (nextStep + 1) % dance.length;
					if (dance[nextStep] == PlayGameScene.danceStep.WALK) {
						totalSteps++;

						if (totalSteps >= 10) {
							nextStep = 0;
						}
						else{
							PlayGameScene.maxDelay -= 0.1;
							stepTime -= 0.2;
						}
					};

					lastStepTime = stepTime;
				};
				background.update();
				player.update();
				for (var i = 0; i < cpuIndians.length; i++) {
					cpuIndians[i].update();
				};

				foreground.update();
				campFire.update();
				drummers.update();
				chief.update();

				var cPUIndianCaughtIndex;
				if (MOUSECLICK) {
					for (var i = cpuIndians.length - 1; i >= 0; i--) {
						if (cpuIndians[i].thereCollision(MOUSEPOSITION)) {
							GAME_MANAGER.finalScene = GAME_MANAGER.FinalScene.WRONG_GUY;
							cPUIndianCaughtIndex = i;
							currentPlayState = PlayState.CAUGHT;
						};
					};
					if (player.thereCollision(MOUSEPOSITION)) {
						GAME_MANAGER.finalScene = GAME_MANAGER.FinalScene.RIGHT_GUY;
						currentPlayState = PlayState.CAUGHT;
					};
					if (cPUIndianCaughtIndex != null && GAME_MANAGER.finalScene == GAME_MANAGER.FinalScene.RIGHT_GUY) {
						if (cpuIndians[cPUIndianCaughtIndex].getLayer() > player.getLayer()) {
							GAME_MANAGER.finalScene = GAME_MANAGER.FinalScene.WRONG_GUY;
						};
					};
					if (currentPlayState == PlayState.CAUGHT) {
						player.exclamation();
					};
				};
				break;
			case PlayState.CAUGHT:
				waitingTime -= SECS;
				if (waitingTime <= 0) {
					GAME_MANAGER.startScene(SceneManager.GameScene.GAMEOVER);
				};
			break;
		}

		
	}

	this.draw = function(){
		
		var playerDrawn = false;
		background.draw();
		for (var i = 0; i < cpuIndians.length; i++) {
			if (!playerDrawn && cpuIndians[i].getLayer() > player.getLayer()) {
				player.draw();
				playerDrawn = true;
			};
			cpuIndians[i].draw();
		};
		if (!playerDrawn) {
				player.draw();
		};

		foreground.draw();
		campFire.draw();
		drummers.draw();
		chief.draw();
	}
}

PlayGameScene.danceStep = {
	"WALK_LEFT" : 1,
	"WALK_RIGHT" : 2,
	"WALK" : 3,
	"JUMP" : 4,
};

PlayGameScene.maxDelay = 1.2;