function TitleScene(){
	
	//background
    var background = new GameImage("Assets/img/background.png", 1024, 1024, 1024, 1024, new Vector2D(512, 512), 0);

    //Texts
    var txtTitulo = new GameText("FlappyBee", "orange", "100px", "Verdana", new Vector2D(50, 150));
    var txtInstrucao = new GameText("Pressione espa\u00e7o para come\u00e7ar", "Gray", "20px", "Verdana", new Vector2D(50, 250));

	this.update = function(){

	    if (KEYS.Space || MOUSELEFTCLICK) {
	        GAME_MANAGER.startScene(SceneManager.GameScene.GAME);
	    }
		background.update();
	}

	this.draw = function(){
	    background.draw();
	    txtTitulo.draw();
	    txtInstrucao.draw();
	}
}