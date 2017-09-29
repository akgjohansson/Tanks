function RotateLeft(player)
{
    if (!player.rotating) {
        player.rotating = true;
        player.direction = NewDirection(player.direction, DirectionEnum.LEFT);
        
        RotateTheTankToDirection(player,"counter");
    }
}
function RotateRight(player)
{
    if (!player.rotating) {
        player.rotating = true;
        player.direction = NewDirection(player.direction, DirectionEnum.RIGHT);
        RotateTheTankToDirection(player,"clock");
    }
}
function MoveForward(player) {
    console.log((player.x == player.toX) && (player.y == player.toY));
    if ((player.x == player.toX) && (player.y == player.toY)) {
        var newPosition = NextCoord(player.x, player.y, player.direction, stepSize);
        if (CanIGoHere(newPosition[0], newPosition[1],player)) {
            MoveTheTankToHere(player, newPosition[0], newPosition[1]);
            

        }
    }
}

function MoveTheTankToHere(player, x, y) {
    player.toX = x;
    player.toY = y;
    $(`#${player.name}`).css("left", `${player.toX - halfSquareSize}px`);
    $(`#${player.name}`).css("top", `${player.toY - halfSquareSize}px`);
}

function MoveBackward(player) {
    if ((player.x == player.tox) || (player.y == player)) {
        var newPosition = NextCoord(player.x, player.y, player.direction, -stepSize);
        if (CanIGoHere(newPosition[0], newPosition[1], player)) {
            MoveTheTankToHere(player, newPosition[0], newPosition[1]);
        }
    }
}

function Shoot(player) {
    if (!player.movingShot) {
        player.shotDirection = player.direction;
        player.movingShot = true;
        var newPosition = NextCoord(player.shotx, player.shoty, player.shotDirection, stepSize / 2);
        $(`#${player.name}shot`).css("left", newPosition[0] - halfShotSize);
        $(`#${player.name}shot`).css("top", newPosition[1] - halfShotSize);
        $(`#${player.name}`).addClass(`shot${player.shotDirection}`);
        $(`#${player.name}shot`).removeClass('invisible');
    }
}

function CanIGoHere(x, y, player) {
    if (x < 0 || y < 0 || x > xBoundry || y > yBoundry)
        return false;
    console.log(player.name);
    console.log("x=", x);
    console.log("y=", y);
    var tryx = (x - halfSquareSize) / squareSize;
    var tryy = (y - halfSquareSize) / squareSize;
    var squareType = GetSquareType(tryx , tryy);
    switch (squareType) {
        case 'wall':
            return false;
    }
    return true;
}

function GetSquareType(x, y) {
    console.log(x);
    console.log(y);
    var squareClasses = $(`.x${x}`).children(`.y${y}`).attr('class').split(/\s+/);
    console.log(squareClasses);
    for (var i = 0; i < squareClasses.length; i++) {
        for (var j = 0; j < squareTypes.length; j++) {
            if (squareClasses[i] == squareTypes[j])
                return squareTypes[j];
        }
    }
    return null;
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
        var values = input.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        return Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
        return 0;
    }
}

function GetTankMoving(player) {
    player.movementClass = `move${player.direction}`;
    $(`#${player.name}`).addClass(player.movementClass);
    player.moving = true;
}

function ValidateTankMovement(player) {
    var position = $(`#${player.name}`).position();
    var x = position.left + halfSquareSize;
    var y = position.top + halfSquareSize;
    if (HasTankMovedAllTheWay(x, y, player.toX, player.toY, player.direction)) {
        player.x = player.toX;
        player.y = player.toY;
        player.moving = false;
        $(`#${player.name}`).removeClass(player.movementClass);
    }
}

function RotateTheTank(player) {
    var currentAngle = GetRotationAngle(player.name);
    console.log("currentAngle=" + currentAngle);
    
    console.log("angle after reset=" + GetRotationAngle(player.name));
    if (HasTankRotatedAllTheWay(currentAngle, player)) {
        player.rotating = false;
    }
}

function ResetAngleToUnit(tank, newAngle) {
    tank.removeClass("smoothRotation");
    tank.css("transform", `rotate(${newAngle}deg)`);
    tank.addClass("smoothRotation");
}

function HasTankRotatedAllTheWay(currentAngle, player) {
    var toDegree = GetAngleFromDirection(player.direction);
    console.log(toDegree);
    console.log(currentAngle);
    if (currentAngle == toDegree) {
        
        return true;
    }
    return false;
}

function ShootTheOpponent(player,opponent) {
    opponent.hits++;
    if (opponent.hits == lives)
        GameOver(player);
    DrawRemainingLife(opponent);
}

function GameOver(player) {

}

function DrawRemainingLife(player) {
    $(`#${player.name}Life`).html("");
    for (var i = 0; i < lives - player.hits; i++) {

    }
    $(`#${player.name}Life`).appendTo('<img src="Static\img\PinkTank.png" class="lifeToken"');
}

function CanShotGoHere(player, opponent) {
    var nextSquare = NextCoord(player.shotx, player.shoty, player.shotDirection, squareSize);
    var nextX = (nextSquare[0] - halfSquareSize) / squareSize;
    var nextY = (nextSquare[1] - halfSquareSize) / squareSize;
    var nextSquareType = GetSquareType(nextX, nextY);
    if (nextSquareType == "wall" || nextSquareType == "bush")
        return 0;
    if (opponent.x == nextSquare[0] && opponent.y == nextSquare[1]) {
        ShootTheOpponent(player,opponent);
        return 2;
    }
    return 1;
}



function PerformShotMovement(player, opponent) {
    var shotPosition = $(`#${player.name}`).position();
    switch (player.shotDirection) {
        case DirectionEnum.UP:
            if (shotPosition[1] <= player.shotToY) {
                if (CanShotGoHere(player, opponent)) {
                    var nextPosition = NextCoord(player.shotx, player.shoty, player.shotDirection, gridSize);
                    player.shotToX = nextPosition[0];
                    player.shotToY = nextPosition[1];
                } else {
                    player.movingShot = false;
                    $(`#${player.name}shot`).addClass('invisible');
                }
                
            }
            break;
        case DirectionEnum.LEFT:
            if (shotPosition[0] <= player.shotToX)
                CanShotGoHere(player,opponent)
            
        default:
    }
}

function MoveObjects() {
    var players = [player1, player2];
    for (var i = 0; i < 2; i++) {
        thisPlayer = players[i];

        if (thisPlayer.moving) {
            ValidateTankMovement(thisPlayer);

        } else if (thisPlayer.x != thisPlayer.toX || thisPlayer.y != thisPlayer.toY) {
            GetTankMoving(thisPlayer);
        }

        if (thisPlayer.rotating) {
            RotateTheTank(thisPlayer);
        }

        if (thisPlayer.movingShot) {
            var opponentIndex = (i + 1) % 2;
            PerformShotMovement(players[i], players[opponentIndex]);
        }

    }
}




//var squareSize = 60; //square size in pixels

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

setInterval(MoveObjects, 100);