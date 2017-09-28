function addDivs() {

    for (var x = 0; x < 15; x++) {
        $("#mainDiv").appendTo(`<div class="x${x}">`)
        for (var y = 0; y < 15; y++) {
            $(`.x${x}`).appendTo(`<div class="y${y}">`)

            var child = $(`.x${x}`).children(`y${y}`);

            child.addClass(squareType[boardLayout[x][y]]);
            child.css('left', x * squareSize);
            child.css('top', y * squareSize);
            child.addClass('square');
        }
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
var squareSize = 60;
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

