function addDivs() {
    $("#mainDiv").html("hej");
    for (var x = 0; x < 15; x++) {
        $("#mainDiv").append(`<div class="x${x}"></div>`);

        var text = $("#mainDiv").text();
        for (var y = 0; y < 15; y++) {
            $(`.x${x}`).append(`<div class="y${y}"></div>`)
            var child = $(`.x${x}`).children(`.y${y}`);

            child.addClass(squareType[boardLayout[x][y]]);
            child.css('left', x * squareSize);
            child.css('top', y * squareSize);
            child.addClass('square');

            
            var childClass = child.attr('class');
            console.log(childClass);
        }
    }
    $(".square").css("height", `${squareSize}px`);
    $(".square").css("width", `${squareSize}px`);
}

function PlaceTankAndShot(player) {
    $("#mainDiv").append(`<div id="${player.name}" class="tank"></div>`);
    var tankType;
    if (player.name == "player1")
        tankType = "../img/PinkTank.png";
    else
        tankType = "../img/CowTank.png";
    $(`#${player.name}`).css("background-image", `url('${tankType}')`);
    $("#mainDiv").append(`<div id="${player.name}shot" class="shot invisible"></div>`)
    $(`#${player.name}shot`).css("background-image", "url('../img/shot.png')"); //todo- rita shot!
    $(`#${player.name}`).css("left", player.x + halfSquareSize);
    $(`#${player.name}`).css("top", player.y + halfSquareSize);
    $(`#${player.name}`).css("height", squareSize);
    $(`#${player.name}`).css("width", squareSize);
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
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 2, 1, 1],
        [0, 1, 0, 0, 0, 1, 2, 2, 1, 4, 1, 1, 2, 0, 0],
        [1, 1, 0, 0, 1, 1, 2, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 2, 1, 1],
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