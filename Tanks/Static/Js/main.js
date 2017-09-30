function DrawRemainingLife(player) {
    var lifeToken = $(`#${player.name}lifeToken`);
    lifeToken.html("");
    var livesLeft = lives - player.hits;
    if (livesLeft == 0)
        GameOver(player);
    for (var i = 0; i < livesLeft; i++) {
        lifeToken.append(`<img src="${player.image}">`);

    }
}

function GameOver(player) {
    alert(`${player.name} just died!`);
}


function CreatePlayer(playerName) {
    var player = {
        name: playerName,
        x: 0,
        y: 0,
        toX: 0,
        toY: 0,
        moving: false,
        direction: DirectionEnum.UP,
        directionType: DirectionEnum.FORWARD,
        rotating: false,
        shotx: 0,
        shoty: 0,
        shotToX: 0,
        shotToY: 0,
        movingShot: false,
        shotDirection: DirectionEnum.DOWN,
        movementClass: "",
        hits: 0,
        image: ""
    };
    return player;
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
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        if (angle < 0)
            return angle + 360;
        else if (angle > 360)
            return angle - 360;
        return angle;
    } else {
        return 0;
    }
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
var shotSpeed = squareSize / 0.5;
var gameIsStarted = false;
var halfSquareSize = squareSize / 2;
console.log("halfSquareSize=", halfSquareSize);
var shotSize = 12;
var halfShotSize = shotSize / 2;
var tankSize = Math.round(squareSize * 0.8) - Math.round(squareSize * 0.8)%2;
var halfTankSize = tankSize / 2;
var xBoundry = [0, squareSize * columns];
var yBoundry = [0, squareSize * rows];
var stepSize = 1 * squareSize;
var squareTypes = ['road', 'wall', 'water', 'bush', 'bridge'];
var tankImages = ['/Static/img/CowTank.png', '/Static/img/PinkTank.png'];
var lives = 3;
var rows = 15;
var columns = 15;
var numberOfPlayers;
var players;
console.log($("#numberOfPlayers").children());
$("#namesChosen").click(function () {
    numberOfPlayers = $("#selectNPlayers").find(":selected").val();
    $("#playerNames").html("Skriv in namnen på spelarna:<br/>");
    for (var i = 0; i < numberOfPlayers; i++) {
        $("#playerNames").append(`Spelare ${i+1}:<br/><input type="text" id="player${i+1}name"/><br/>`)
    }
    $("#sendNamesButton").removeClass("invisible");
})
$(".sendNames").click(function () {
    var playerNames = new Array(numberOfPlayers);
    var allNamesIn = true;
    for (var i = 0; i < numberOfPlayers; i++) {
        playerNames[i] = $(`#player${i + 1}name`).val();
        if (playerNames[i].length == 0) {
            allNamesIn = false;
            break;
        }
    }
    if (allNamesIn) {
        players = new Array(numberOfPlayers);
        for (var i = 0; i < numberOfPlayers; i++) {
            players[i] = CreatePlayer(playerNames[i]);
            
        }
        StartGame();
    } else {
        $("#sendNamesMessage").html("You must fill all name fields!");
    }
})

