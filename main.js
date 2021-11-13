var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 변수 설정
let screenSize = 1;
let keyList = [];
let playerX = 250;
let playerY = 650;
let playerDx = 0;
let playerDy = 0;
let playerTouchDown = false;
let playerTouchUp = false;
let playerTouchRight = false;
let playerTouchLeft = false;
let map = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,1],
[1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]] // 사용시 map[y좌표][x좌표] 이렇게 사용

// 이미지 불러오기
let image = {"dust": new Image(),"box": new Image()}
image.dust.src = "./images/dust.png";
image.box.src = "./images/box.png";

// 키보드 버튼 누르기
function keyPress() {
    if(keyList.indexOf(event.keyCode) === -1){
        keyList.push(event.keyCode);
    }
}

function keyUnpress() {
    keyList.splice(keyList.indexOf(event.keyCode), 1);
}

// 벽에 닿았는가

function checkTouchDown() { // 플레이어가 땅에 닿았는지 확인하는 코드

    if(map[Math.ceil(playerY / 100)][Math.floor(playerX / 100)] === 1 || map[Math.ceil(playerY / 100)][Math.ceil(playerX / 100)] === 1){
        playerTouchDown = true;
    }else{
        playerTouchDown = false;
    }

}

function checkTouchUp(){ // 플레이어가 천장에 닿았는지 확인하는 코드

    if(map[Math.floor(playerY / 100)][Math.floor(playerX / 100)] === 1 || map[Math.floor(playerY / 100)][Math.ceil(playerX / 100)] === 1){
        playerTouchUp = true;
    }else{
        playerTouchUp = false;
    }

}

function checkTouchRight(){ // 플레이어가 오른쪽에 닿았는지 확인하는 코드

    if(map[Math.floor(playerY / 100)][Math.ceil(playerX / 100)] === 1 || map[Math.ceil(playerY / 100)][Math.ceil(playerX / 100)] === 1){
        playerTouchRight = true;
    }else{
        playerTouchRight = false;
    }

}

function checkTouchLeft(){ // 플레이어가 왼쪽에 닿았는지 확인하는 코드

    if(map[Math.floor(playerY / 100)][Math.floor(playerX / 100)] === 1 || map[Math.ceil(playerY / 100)][Math.floor(playerX / 100)] === 1){
        playerTouchLeft = true;
    }else{
        playerTouchLeft = false;
    }

}


function move() {

    if(keyList.includes(39)){playerDx += 2;} // 오른쪽으로 이동
    if(keyList.includes(37)){playerDx -= 2;} // 왼쪽으로 이동
    if(keyList.includes(38) && playerTouchDown){playerDy = -40;} // 점프하기

    playerY += playerDy;
    checkTouchDown();
    if(playerTouchDown){
        playerY = Math.ceil(playerY / 100) * 100 - 100;
        playerDy = 0;
    }else{
        playerDy += 4;
    }
    checkTouchUp()
    if(playerTouchUp){
        playerY = Math.floor(playerY / 100) * 100 + 100;
        playerDy = playerDy * -0.5;
    }

    playerX += playerDx;
    checkTouchRight()
    if(playerTouchRight){
        playerX = Math.ceil(playerX / 100) * 100 - 100;
        playerDx = 0;
    }
    checkTouchLeft()
    if(playerTouchLeft){
        playerX = Math.floor(playerX / 100) * 100 + 100;
        playerDx = 0;
    }

    playerDx = playerDx * 0.9;

}

function draw() {

    if((window.innerWidth - 80) * 9 < (window.innerHeight - 80) * 16){
        canvas.width = window.innerWidth - 80;
        canvas.height = canvas.width * 9 / 16;
        canvas.style.left = "40px";
        canvas.style.top = `${(window.innerHeight - canvas.height) / 2}px`;
    }else{
        canvas.height = window.innerHeight - 80;
        canvas.width = canvas.height * 16 / 9;
        canvas.style.top = "40px";
        canvas.style.left = `${(window.innerWidth - canvas.width) / 2}px`;
    }
    canvasSize = canvas.width / 1600;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image.dust, playerX * canvasSize, playerY * canvasSize, 100 * canvasSize, 100 * canvasSize);

    for(var y = 0; y < 9; y++){
        for(var x = 0; x < 16; x++){
            if(map[y][x] === 1){
                ctx.drawImage(image.box, x * 100 * canvasSize, y * 100 * canvasSize, 100 * canvasSize, 100 * canvasSize);
            }
        }
    }

}

function main() {

    move()
    draw()

}

setInterval(main, 30);