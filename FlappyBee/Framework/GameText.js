function GameText(text, color, size, fontName, position){

	this.text = text;
	this.color = color;
	this.size = size;
	this.fontName = fontName;
	this.position = position;

	this.setText = function(text){
		this.text = text;
	}

	this.setPosition = function(vector2D){
		this.position = vector2D;
	}

	this.update = function(){

	}

	this.draw = function(){

		CTX.font = this.size + " " + this.fontName;
		CTX.fillStyle = this.color;
		CTX.fillText(this.text, this.position.x, this.position.y);
	}
}

