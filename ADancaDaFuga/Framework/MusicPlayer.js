function MusicPlayer(){

	this.Music = {
		"TITLE" : 1,
		"GAME" : 2
	};

	var titleMusic = new Audio('Assets/music/Title-Screen.mp3');
	titleMusic.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);

	var gameMusic = new Audio('Assets/music/Main-Theme.mp3');
	gameMusic.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);


	this.playMusic = function(music){

		switch (music) {
			case this.Music.TITLE:
				stopAll();
				titleMusic.play();
				break;
			case this.Music.GAME:
				stopAll();
				gameMusic.play();
				break;
		}
	}

	this.stop = function(){
		stopAll();
	}

	function stopAll(){
		gameMusic.pause();
		gameMusic.currentTime = 0;
		titleMusic.pause();
		titleMusic.currentTime = 0;
	}
}