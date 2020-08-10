function BoundingBox(center, width, height) {

    var rectangle = new GameRectangle(center.x - width / 2, center.y - height / 2, width, height);

    this.setCenter = function (vector2D) {

        rectangle.x = vector2D.x - rectangle.width / 2;
        rectangle.y = vector2D.y - rectangle.height / 2;
    }

    this.setDimensions = function (width, height) {

        var center = new Vector2D(rectangle.x + rectangle.width / 2, rectangle.y + rectangle.height / 2)
        rectangle.width = width;
        rectangle.height = height;
        this.setCenter(center);
    }

    this.getRectangle = function () {
        return rectangle;
    }

    this.thereCollisionWithPoint = function (vector2D) {

        if (vector2D.x < rectangle.x) {
            return false;
        };
        if (vector2D.x > rectangle.x + rectangle.width) {
            return false;
        };
        if (vector2D.y < rectangle.y) {
            return false;
        };
        if (vector2D.y > rectangle.y + rectangle.height) {
            return false;
        };

        return true;
    }

    this.thereCollisionWithBoundingBox = function (other) {

        var otherRectangle = other.getRectangle();

        if (otherRectangle.x + otherRectangle.width < rectangle.x) {
            return false;
        };
        if (otherRectangle.x > rectangle.x + rectangle.width) {
            return false;
        };
        if (otherRectangle.y + otherRectangle.height < rectangle.y) {
            return false;
        };
        if (otherRectangle.y > rectangle.y + rectangle.height) {
            return false;
        };

        return true;
    }
}
