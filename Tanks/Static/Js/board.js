﻿function addDivs() {

    for (var x = 0; x < 15; x++) {
        $("#mainDiv").appendTo(`<div class="x${x}">`)
        for (var y = 0; y < 15; y++) {
            $(`.x${x}`).appendTo(`<div class="y${y}">`)


        }
    }
}

function setSquareType(x, y, type) {
    $(".x1").children(".y1").addClass("");
}

addDivs();