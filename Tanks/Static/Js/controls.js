function RotateLeft(player)
{
    if (!player.rotating) {
        player.rotating = true;
        player.direction = NewDirection(player.direction , DirectionEnum.LEFT);
    }
}
function RotateRight(player)
{
    if (!player.rotating) {
        player.rotating = true;
        player.direction = NewDirection(player.direction, DirectionEnum.RIGHT);
    }
}
function MoveForward(player){
    if ((player.x == player.toX) && (player.y == player.toY)) {
        player.toX, player.toY = NextCoord(player.x, player.y, player.direction, stepSize);
    }
}

function MoveBackward(player) {
    if ((player.x == player.tox) || (player.y == player){
        player.toX, player.toY = NextCoord(player.x, player.y, player.direction, -stepSize);
    }
}

function Shoot(player) {

}

function CreatePlayer(x , y , startDirection) {
    var player = {
        x = 0,
        y = 0,
        toX = 0,
        toY = 0,
        moving,
        direction = startDirection,
        rotating = false,
        shotx = 0,
        shoty = 0,
        movingShot = false,
        shotDirection = DirectionEnum.DOWN
    };
    return player;
}

function NextCoord(x, y, direction, step) {
    switch (direction) {
        case DirectionEnum.UP:
            return x, y - step;
        case DirectionEnum.DOWN:
            return x, y + step;
        case DirectionEnum.LEFT:
            return x - step, y;
        case DirectionEnum.RIGHT:
            return x + step, y;
        default:
            break;
    }
}

function NewDirection(direction, rotateDirection) {
    switch (direction) {
        case DirectionEnum.DOWN:
            if (rotateDirection == DirectionEnum.LEFT)
                return DirectionEnum.RIGHT;
            else
                return DirectionEnum.LEFT;
        case DirectionEnum.LEFT:
            if (rotateDirection == DirectionEnum.LEFT)
                return DirectionEnum.DOWN;
            else
                return DirectionEnum.UP;
        case DirectionEnum.UP:
            if (rotateDirection == DirectionEnum.LEFT)
                return DirectionEnum.LEFT;
            else
                return DirectionEnum.RIGHT;
        case DirectionEnum.RIGHT:
            if (rotateDirection == DirectionEnum.LEFT)
                return DirectionEnum.UP;
            else
                return DirectionEnum.DOWN;
    }
}

function MoveObjects() {
    var players = [player1, player2];
    for (var i = 0; i < 2; i++) {
        thisPlayer = players[i];

        if (thisPlayer.x != thisPlayer.toX && !thisPlayer.moving)
            $(`#player${i+1}`).addClass()


    }
}

var DirectionEnum = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT:3
}
var player1 = CreatePlayer(0 , 0 , DirectionEnum.DOWN);
var player2 = CreatePlayer(14, 14, DirectionEnum.UP);
var stepSize = 1;

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 9: //tab
            Shoot(player1);
            break;
        case 87: //w
            MoveForward(player1);
            break;
        case 83: //s
            MoveBackward(player1);
            break;
        case 65: //a
            if (!player1.rotating)
                RotateLeft(player1);
            break;
        case 68: //d
            if (!player1.rotating)
                RotateRight(player1);
            break;
        case 32: //space
            Shoot(player2);
            break;
        case 38: //up
            MoveForward(player2);
            break;
        case 40: //down
            MoveBackward(player2);
            break;
        case 37: //left
            if (!player2.rotating)
                RotateLeft(player2);
            break;
        case 39: //right
            if (!player2.rotating)
                RotateRight(player2);
            break;

        default:
            break;
    }
    

})