function addDivs() {
    $("#mainDiv").html("hej");
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

function PlaceTankAndShot(player) {
    $("#mainDiv").append(`<div id="${player.name}" class="tank smoothRotation"></div>`);
    var tankType;
    if (player.name == "player1")
        tankType = "/Static/img/PinkTank.png";
    else
        tankType = "/Static/img/CowTank.png";
    var tank = $(`#${player.name}`);
    tank.css("left", player.x - halfSquareSize);
    tank.css("top", player.y - halfSquareSize);
    tank.css("height", squareSize);
    tank.css("width", squareSize);
    tank.css("background-image", `url('${tankType}')`);
    tank.css("background-size", `${tankSize}px`);
    RotateTheTankToDirection(player);

    $("#mainDiv").append(`<div id="${player.name}shot" class="shot invisible"></div>`)
    var shot = $(`#${player.name}shot`);
    shot.css("width", `${shotSize}px`);
    shot.css("height", `${shotSize}px`);

    shot.css("background-image", "url('/Static/img/shot.png')"); //todo- rita shot!
    shot.css("background-size", `${shotSize}px`);

    $("#lifeTokens").append(`<div id="${player.name}lifeToken"></div>`);
    DrawRemainingLife(player);
    
}

function RotateTheTankToDirection(player , rotateDirection = null) {
    var degree = GetAngleFromDirection(player.direction); 
    /*
    var currentAngle = GetRotationAngle(player.name);
    var difference = currentAngle - degree;
    if (Math.abs(difference) > 90) {
        degree += 360 * Math.sign(difference);
    }*/
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
addDivs();
PlaceTankAndShot(player1);
PlaceTankAndShot(player2);


