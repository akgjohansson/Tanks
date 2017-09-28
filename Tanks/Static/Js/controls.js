﻿function RotateLeft(player)
{
    if (!player.rotating) {
        player.rotating = true;
        player.direction = NewDirection(player.direction, DirectionEnum.LEFT);
        
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
        var newPosition = NextCoord(player.x, player.y, player.direction, stepSize);
        if (CanIGoHere(newPosition[0], newPosition[1])) {
            player.toX = newPosition[0];
            player.toY = newPosition[1];
        }
    }
}

function MoveBackward(player) {
    if ((player.x == player.tox) || (player.y == player)) {
        var newPosition = NextCoord(player.x, player.y, player.direction, -stepSize);
        if (CanIGoHere(newPosition[0], newPosition[1])) {
            player.toX = newPosition[0];
            player.toY = newPosition[1];
        }
    }
}

function Shoot(player) {

}

function CanIGoHere(x, y) {

}

function CreatePlayer(x , y , startDirection , playerName) {
    var player = {
        name : playerName,
        x : 0,
        y : 0,
        toX : 0,
        toY : 0,
        moving : false,
        direction : startDirection,
        directionType : DirectionEnum.FORWARD,
        rotating : false,
        shotx : 0,
        shoty : 0,
        movingShot : false,
        shotDirection : DirectionEnum.DOWN,
        movementClass : ""
    };
    return player;
}

function NextCoord(x, y, direction, step) {
    switch (direction) {
        case DirectionEnum.UP:
            return [x, y - step];
        case DirectionEnum.DOWN:
            return [x, y + step];
        case DirectionEnum.LEFT:
            return [x - step, y];
        case DirectionEnum.RIGHT:
            return [x + step, y];
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

function HasTankMovedAllTheWay(nowX, nowY, toX, toY, direction , directionType) {
    if (directionType == DirectionEnum.BACKWARD) {
        nowX *= -1;
        nowY *= -1;
        toX *= -1;
        toY *= -1;
    }
    switch (direction) {
        case DirectionEnum.DOWN:
            if (nowY >= toY)
                return true;
            break;
        case DirectionEnum.LEFT:
            if (nowX <= toX)
                return true;
            break;
        case DirectionEnum.UP:
            if (nowY <= toY)
                return true;
            break;
        case DirectionEnum.RIGHT:
            if (nowX >= toX)
                return true;
            break;
    }
    return false;
}

function GetRotationAngle(playerName) {
    var tank = $(`#${playerName}`);
    var input = tank.css("-webkit-transform") ||
        tank.css("-moz-transform") ||
        tank.css("-ms-transform") ||
        tank.css("-o-transform") ||
        tank.css("transform");
    if (input !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        return Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
        return 0;
    }
}

function MoveObjects() {
    var players = [player1, player2];
    for (var i = 0; i < 2; i++) {
        thisPlayer = players[i];

        if (thisPlayer.moving) {
            var position = $(`#${thisPlayer.name}`).position();
            var x = position.left + halfSquareSize;
            var y = position.top + halfSquareSize;
            if (HasTankMovedAllTheWay(x, y, thisPlayer.toX, thisPlayer.toY, thisPlayer.direction)) {
                thisPlayer.x = thisPlayer.toX;
                thisPlayer.y = thisPlayer.toY;
                thisPlayer.moving = false;
                $(`#${thisPlayer.name}`).removeClass(player.movementClass);
            }

        } else if (thisPlayer.x != thisPlayer.toX || thisPlayer.y != thisPlayer.toY) {
            player.movementClass = `move${player.direction}`;
            $(`#${thisPlayer.name}`).addClass(player.movementClass);
            thisPlayer.moving = true;
        }

        if (player.rotating) {
            var angle = GetRotationAngle(thisPlayer.name);
            if (HasTankRotatedAllTheWay(angle, thisPlayer.direction)) {
                StopRotation(thisPlayer);
            }
        }

    }
}

function StopRotation(player) {
    player.rotating = false;
    var degree;
    switch (player.direction) {
        case DirectionEnum.UP:
            degree = 0;
            break;
        case DirectionEnum.RIGHT:
            degree = 270;
            break;
        case DirectionEnum.DOWN:
            degree = 180;
            break;
        case DirectionEnum.LEFT:
            degree = 90;
            break;
    }
    $(`#${player.name}`).removeClass(player.movementClass);
    $(`#${player.name}`).css('-ms-transform', `rotate(${degree})`);
    $(`#${player.name}`).css('-webkit-transform', `rotate(${degree})`);
    $(`#${player.name}`).css('transform', `rotate(${degree})`);
}

var DirectionEnum = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
    FORWARD: 4,
    BACKWARD:5
}

var squareSize = 60; //square size in pixels
var halfSquareSize = squareSize / 2;
var player1 = CreatePlayer(0 * squareSize + halfSquareSize, 0 * squareSize + halfSquareSize , DirectionEnum.DOWN , 'player1');
var player2 = CreatePlayer(14 * squareSize + halfSquareSize, 14 * squareSize + halfSquareSize, DirectionEnum.UP , 'player2');
var stepSize = 1 * gridSize;

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
            if (!player1.rotating && !player1.moving)
                RotateLeft(player1);
            break;
        case 68: //d
            if (!player1.rotating && !player1.moving)
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
            if (!player2.rotating && !player2.moving)
                RotateLeft(player2);
            break;
        case 39: //right
            if (!player2.rotating && !player2.moving)
                RotateRight(player2);
            break;

        default:
            break;
    }
    

})