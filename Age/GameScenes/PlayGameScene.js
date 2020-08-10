function PlayGameScene(){
	
	//background
	var background = new GameImage("Assets/img/background.png", 1024, 768, 1024, 768, new Vector2D(512, 384), 0);
	
	var player = new Player(new Vector2D(512, 50));
	var archers = [];
	var arrows = [];

	var arrowRange = 200;
	var visionRange = 300;
	var criticalDistance = 100;


	//public methods
	this.update = function(){
		background.update();
		player.update();

		if (KEYS.Up) {
			player.changeSpeed(1.1);
			for (var i = 0; i < archers.length; i++) {
				archers[i].changeSpeed(1.1);
			};
		};
		if (KEYS.Down) {
			player.changeSpeed(0.9);
			for (var i = 0; i < archers.length; i++) {
				archers[i].changeSpeed(0.9);
			};
		};
		if (MOUSERIGHTCLICK) {
			archers.push(new Archer(new Vector2D(MOUSEPOSITION.x, MOUSEPOSITION.y), arrowRange, visionRange, criticalDistance));
		};
		for (var i = 0; i < archers.length; i++) {
			archers[i].update(player.getPosition());
			arrows = arrows.concat(archers[i].getArrows());
		};
		for (var i = arrows.length -1; i >= 0; i--) {
			arrows[i].update();
			if (arrows[i].calculateTravelledDistance() > arrowRange) {
				arrows.splice(i, 1);
			};
		};
	}

	this.draw = function(){
		background.draw();
		player.draw();

		for (var i = 0; i < archers.length; i++) {
			archers[i].draw();
		};
		for (var i = 0; i < arrows.length; i++) {
			arrows[i].draw();
		};
	}

	this.addArrow = function(position, direction, speed){

		arrows.push(new Arrow(position, direction, speed));
	}
}

