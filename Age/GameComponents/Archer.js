function Archer(position, arrowRange, visionRange, criticalDistance){
	
	var ArcherState = {
		"STANDING" : 1,
		"CHASING" : 2,
		"ATTACKING" : 3,
		"RUNNING" : 4
	};

	var currentState = ArcherState.STANDING;
	var speed = 40;
	var confReloadingTime = 3;
	var reloadingTime = confReloadingTime;
	var confPreparingTime = 0.1;
	var preparingTime = confPreparingTime;

	var sqrtArrowRange = arrowRange * arrowRange;
	var visionRange = visionRange;
	var sqrtVisionRange = visionRange * visionRange;
	var criticalDistance = criticalDistance;
	var sqrtCriticalDistance = criticalDistance * criticalDistance;
	
	var playerPosition;

	var arrowSpeed = 600;
	var arrows = [];

	var circleArrowRange = new Circle(position, arrowRange, '#006600');
	var circleVisionRange = new Circle(position, visionRange, '#aaaaaa');
	var circleCriticalDistance = new Circle(position, criticalDistance, '#aa0000');

	var drawCircles = false;

	var gameObject = new GameObject(position, 0)
	gameObject.setGameImage("Assets/img/archer.png", 57, 57, 57, 57);
	gameObject.setBoundingBoxDimensions(15, 15);
			
	//private methods


	//publics methods
	this.update = function(playerPosition){

		if (KEYS.Right) {
			drawCircles = true;
		}
		if (KEYS.Left) {
			drawCircles = false;
		}

		this.playerPosition = playerPosition;

		if (reloadingTime > 0) {
			reloadingTime -= SECS;
		}
		
		if (currentState != ArcherState.ATTACKING) {
			var playerDistance = Vector2D.sqrtDistance(playerPosition, gameObject.position)

			if (playerDistance < sqrtCriticalDistance) {
				if (reloadingTime <= 0) {
					currentState = ArcherState.ATTACKING;
				}
				else{
					currentState = ArcherState.RUNNING;					
				}		
			}
			else if (playerDistance < sqrtArrowRange) {
				if (reloadingTime <= 0) {
					currentState = ArcherState.ATTACKING;
				}
				else{
					currentState = ArcherState.STANDING;					
				}
			}
			else if (playerDistance <= sqrtVisionRange) {
				currentState = ArcherState.CHASING;
			}
			else{
				currentState = ArcherState.STANDING;	
			}
		}

		this.fmsArcher();
		gameObject.update()
	}
	
	this.draw = function(){

		gameObject.draw();
		if (drawCircles) {
			circleArrowRange.draw();
			circleVisionRange.draw();
			circleCriticalDistance.draw();
		};
		
	}

	this.thereCollision = function(vector2D){
		
	}

	this.fmsArcher = function(){
		switch (currentState){
			case ArcherState.STANDING:
				

			break;
			case ArcherState.CHASING:
				gameObject.moveToTarget(this.playerPosition, speed)

			break;
			case ArcherState.ATTACKING:
				if (preparingTime > 0) {
					preparingTime -= SECS;
				}
				else{
					arrows.push(new Arrow(new Vector2D(gameObject.position.x, gameObject.position.y) , Vector2D.SubtractVectors(this.playerPosition, gameObject.position), arrowSpeed));
					preparingTime = confPreparingTime;
					reloadingTime = confReloadingTime;
					currentState = ArcherState.STANDING;
				}

			break;
			
			case ArcherState.RUNNING:
				var vectorDirection = Vector2D.SubtractVectors(gameObject.position, this.playerPosition);
				
				gameObject.moveInDirection(vectorDirection, speed);

				gameObject.position.x = gameObject.position.x < 0 ? 0 : gameObject.position.x;
				gameObject.position.y = gameObject.position.y < 0 ? 0 : gameObject.position.y;
				gameObject.position.x = gameObject.position.x > WIDTH ? WIDTH : gameObject.position.x;
				gameObject.position.y = gameObject.position.y > HEIGHT ? HEIGHT : gameObject.position.y;

			break;
		}
	}

	this.getArrows = function(){
		var arrowsReturn = arrows;
		arrows = [];
		return arrowsReturn;
	}

	this.changeSpeed = function(factor){
		speed *= factor;
	}
}
