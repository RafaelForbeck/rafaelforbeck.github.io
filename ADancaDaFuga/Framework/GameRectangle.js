function GameRectangle(x, y, width, height){

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

GameRectangle.prototype.getMaxX = function(){

	return this.x + width;
}

GameRectangle.prototype.getMinX = function(){

	return this.x;
}

GameRectangle.prototype.getMaxY = function(){

	return this.y + height;
}

GameRectangle.prototype.getMinY = function(){

	return this.y;
}


