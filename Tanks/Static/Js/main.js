
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

var windowHeight = getHeight();
var windowWidth = getWidth();
var maxSize;
if (windowHeight < windowWidth)
    maxSize = windowHeight;
else
    maxSize = windowWidth;

var rows = 15;
var columns = 15;

squareSize = Math.floor(maxSize / rows);
squareSize -= squareSize % 2;
