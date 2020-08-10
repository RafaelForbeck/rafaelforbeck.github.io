function Vector2D(x, y){

	this.x = x;
	this.y = y;

	this.size = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	this.sum = function(vector2D){
		this.x += vector2D.x;
		this.y += vector2D.y;
	}

	this.multiply = function(multiplier){
		this.x *= multiplier;
		this.y *= multiplier;
	}


	this.normalize = function(){
		var size = this.size();

		this.x = x / size;
		this.y = y / size;
	}

	this.angle = function(){
		return Math.atan2(-this.y, this.x);
	}
}

Vector2D.SubtractVectors = function(vector1, vector2){

	return new Vector2D((vector1.x - vector2.x), (vector1.y - vector2.y));

}

Vector2D.SumVectors = function(vector1, vector2){

	return new Vector2D((vector1.x + vector2.x), (vector1.y + vector2.y));

}

Vector2D.sqrtDistance = function(vector1, vector2){

	var dx = vector1.x - vector2.x;
	var dy = vector1.y - vector2.y;

	return dx * dx + dy * dy;

}