function GravityEffect(){
	
    var yVelocity = 0;
    var gravity = 2000;
	
	//private methods

	//publics methods

    this.setGravityValue = function (value) {
        this.gravity = value;
    }

    this.setYVelocity = function (value) {
        yVelocity = value;
    }

	this.calculatePosition = function(position){

	    var v = yVelocity + gravity * SECS;
	    var s = ((v + yVelocity) / 2) * SECS;
	    yVelocity = v;

	    return new Vector2D(position.x, position.y + s);
	}
}
