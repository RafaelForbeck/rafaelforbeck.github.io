function Drummers(){
	
	
	var drummer1 = new GameImage("Assets/img/Game-IndianDrummer.png", 88, 119, 44, 119, new Vector2D(915, 100), 0);
	drummer1.setAnimationFrames([0, 1]);
	drummer1.setAnimationTime(0.4);
	var drummer2 = new GameImage("Assets/img/Game-IndianDrummer.png", 88, 119, 44, 119, new Vector2D(862, 212), 0);
	drummer2.setAnimationFrames([1, 0, 1]);
	drummer2.setAnimationTime(0.4);
	var drummer3 = new GameImage("Assets/img/Game-IndianDrummer.png", 88, 119, 44, 119, new Vector2D(975, 190), 0);
	drummer3.setAnimationFrames([0, 0, 1]);
	drummer3.setAnimationTime(0.4);
	var drummer4 = new GameImage("Assets/img/Game-IndianDrummerMirrored.png", 88, 119, 44, 119, new Vector2D(165, 385), 0);
	drummer4.setAnimationFrames([0, 0, 1, 1]);
	drummer4.setAnimationTime(0.4);
	var drummer5 = new GameImage("Assets/img/Game-IndianDrummerMirrored.png", 88, 119, 44, 119, new Vector2D(222, 342), 0);
	drummer5.setAnimationFrames([0, 0, 0, 1]);
	drummer5.setAnimationTime(0.4);


	//publics methods
	this.update = function(){

		drummer1.update();
		drummer2.update();
		drummer3.update();
		drummer4.update();
		drummer5.update();
	}
	
	this.draw = function(){

		drummer1.draw();
		drummer2.draw();
		drummer3.draw();
		drummer4.draw();
		drummer5.draw();
	}
}
