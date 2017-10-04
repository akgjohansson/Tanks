function addDivs() {
    $("#mainDiv").html("");
    for (var x = 0; x < 15; x++) {
        $("#mainDiv").append(`<div class="x${x}"></div>`);
        for (var y = 0; y < 15; y++) {
            $(`.x${x}`).append(`<div class="y${y}"></div>`)
            var child = $(`.x${x}`).children(`.y${y}`);

            child.addClass(squareType[boardLayout[x][y]]);
            child.css('left', x * squareSize);
            child.css('top', y * squareSize);
            child.addClass('square');
        }
    }
    $(".square").css("height", `${squareSize}px`);
    $(".square").css("width", `${squareSize}px`);
    $(".square").css("background-size", `${squareSize}px`);
    
    $("#lifeTokens").css("left", `${xBoundry[1]}px`);
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

function GetListOfOpponents(player,players) {
    var enemies = new Array(players.length - 1);
    var counter = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].name != player.name) {
            enemies[counter] = players[i];
            counter++;
        }
    }
    return enemies;
}

function GetOpponentLocation(player , players) {
    var enemies = GetListOfOpponents(player , players);
    var locations = new Array(enemies.length);
    for (var i = 0; i < enemies.length; i++) {
        var location = ConvertPositionToSquareIndex(enemies[i].x, enemies[i].y);
        locations[i] = location;
    }
    return locations;
}
function ConvertPositionToSquareIndex(x, y) {
    var output = {
        x: (x - x % squareSize) / squareSize,
        y: (y - y % squareSize) / squareSize
    }
    return output;
}
function RandomizeStartLocation(players) {
    var whereAreTheRoads = WhereAreTheRoads();
    var length = whereAreTheRoads.length;
    for (var i = 0; i < players.length; i++) {
        var enemyLocations = GetOpponentLocation(players[i] , players);
        var output;
        while (true) {
            var suggestLocation = whereAreTheRoads[Math.round(Math.random() * length)];
            var checkedEnemies = 0;
            for (var j = 0; j < enemyLocations.length; j++) {
                if (enemyLocations[j].x != suggestLocation.x && enemyLocations[j].y != suggestLocation.y)
                    checkedEnemies++;
            }
            if (checkedEnemies == enemyLocations.length) {
                output = suggestLocation;
                break;
            }

        }
        players[i].x = suggestLocation.x*squareSize + halfSquareSize;
        players[i].y = suggestLocation.y * squareSize + halfSquareSize;
        players[i].toX = players[i].x;
        players[i].toY = players[i].y;
    }
}

function WhereAreTheRoads() {
    var roadIndeces = [];
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < columns; y++) {
            var thisSquareType = GetSquareType(x, y);
            if (thisSquareType == "road" || /^bridge/.test(thisSquareType)) {
                var thisSquareCoords = { x: x, y: y };
                roadIndeces.push(thisSquareCoords);
            }
        }
    }
    return roadIndeces;
}

function PlaceTankAndShot(players) {
    for (var i = 0; i < players.length; i++) {

        $("#mainDiv").append(`<div id="${players[i].name}" class="tank smoothRotation"></div>`);
        players[i].image = tankImages[i%tankImages.length];
        
        var tank = $(`#${players[i].name}`);
        tank.css("left", players[i].x - halfSquareSize);
        tank.css("top", players[i].y - halfSquareSize);
        tank.css("height", squareSize);
        tank.css("width", squareSize);
        tank.css("background-image", `url('${players[i].image}')`);
        tank.css("background-size", `${tankSize}px`);
        RotateTheTankToDirection(players[i]);

        $("#mainDiv").append(`<div id="${players[i].name}shot" class="shot invisible"></div>`)
        var shot = $(`#${players[i].name}shot`);
        shot.css("width", `${shotSize}px`);
        shot.css("height", `${shotSize}px`);

        shot.css("background-image", "url('/Static/img/shot.png')"); //todo- rita shot!
        shot.css("background-size", `${shotSize}px`);

        $("#lifeTokens").append(`<div id="${players[i].name}lifeToken"></div>`);
        DrawRemainingLife(players[i]);
    }
    
}

function ForceTankToAngle(tank, angle) {
    tank.removeClass("smoothRotation");
    setTimeout(function () {
        tank.css("transform", `rotate(${angle}deg)`);
    }, 0);
    console.log(`rotate(${angle}deg)`);
    tank.addClass("smoothRotation");

}

function RotateTheTankToDirection(player , rotateDirection = null) {
    var degree = GetAngleFromDirection(player.direction); 
    if (rotateDirection == DirectionEnum.LEFT && player.direction == DirectionEnum.LEFT) {
        ForceTankToAngle($(`#${player.name}`), 359)
        setTimeout(function () { degree = 270; }, 0);
    } else if (rotateDirection == DirectionEnum.RIGHT && player.direction == DirectionEnum.UP) {
        degree = 359;
    }
    
    $(`#${player.name}`).css("transform", `rotate(${degree}deg)`);
    
}

function GetAngleFromDirection(direction) {
    switch (direction) {
        case DirectionEnum.LEFT:
            return 270;
        case DirectionEnum.DOWN:
            return 180;
        case DirectionEnum.RIGHT:
            return 90;
        default:
            return 0;
    }
}
/*
0: road
1:wall
2:water
3: bush
4: BridgeWE
5: BridgeNS
6: BridgeS
7: BridgeN

*/
var squareType = ['road' , 'wall', 'water', 'bush', 'bridgeWE', 'bridgeNS', 'bridgeN', 'bridgeS']
var boardLayout =
    [
        [0, 0, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 2, 2, 2],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2],
        [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 2, 2, 2],
        [1, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 2, 1, 1],
        [0, 1, 0, 0, 0, 1, 2, 2, 2, 4, 2, 2, 2, 0, 0],
        [1, 1, 0, 0, 1, 1, 2, 1, 1, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 1, 1, 1, 0],
        [2, 2, 7, 6, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 1, 1, 0, 0],];
function StartGame() {
    addDivs();
    RandomizeStartLocation(players);
    PlaceTankAndShot(players);
    gameIsStarted = true;
    setInterval(MoveObjects, 100);
}


