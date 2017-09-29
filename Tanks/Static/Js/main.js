function CreatePlayer(x, y, startDirection, playerName) {
    var player = {
        name: playerName,
        x: x,
        y: y,
        toX: x,
        toY: y,
        moving: false,
        direction: startDirection,
        directionType: DirectionEnum.FORWARD,
        rotating: false,
        shotx: 0,
        shoty: 0,
        shotToX: 0,
        shotToY: 0,
        movingShot: false,
        shotDirection: DirectionEnum.DOWN,
        movementClass: "",
        hits: 0
    };
    return player;
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}
var DirectionEnum = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
    FORWARD: 4,
    BACKWARD: 5
}
var windowHeight = getHeight();
var windowWidth = getWidth();
var maxSize;
if (windowHeight < windowWidth)
    maxSize = windowHeight;
else
    maxSize = windowWidth;

var rows = 15;
var columns = 15;

var squareSize = Math.floor(maxSize / rows);
squareSize -= squareSize % 2;

var halfSquareSize = squareSize / 2;
console.log("halfSquareSize=", halfSquareSize);
var shotSize = squareSize * 0.2;
var halfShotSize = shotSize / 2;
var xBoundry = [halfSquareSize, squareSize * columns - halfSquareSize];
var yBoundry = [halfSquareSize, squareSize * rows - halfSquareSize];
var player1 = CreatePlayer(0 * squareSize + halfSquareSize, 0 * squareSize + halfSquareSize, DirectionEnum.DOWN, 'player1');
var player2 = CreatePlayer(columns * squareSize - halfSquareSize, rows * squareSize - halfSquareSize, DirectionEnum.UP, 'player2');
var stepSize = 1 * squareSize;
var squareTypes = ['road', 'wall', 'water', 'bush', 'bridge'];
var lives = 3;
var rows = 15;
var columns = 15;

