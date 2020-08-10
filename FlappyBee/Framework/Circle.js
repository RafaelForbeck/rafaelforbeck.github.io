function Circle(center, radius, color){

	var center = center;
	var radius = radius;
	var color = color;
	
	this.draw = function(){

		CTX.beginPath();
      	CTX.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
      	CTX.lineWidth = 2;
      	CTX.strokeStyle = color;
      	CTX.stroke();
	}

	this.setPosition = function(center){

		center = vector2D;
		
	}
}
