console.log('[Lucas Dev] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const floor = {
    spriteX: 292,
    spriteY: 0,
    width: 168,
    height: 55,
    canvasX: 0,
    canvasY: canvas.height - 55,
    
    draw() {
        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            floor.canvasX, floor.canvasY,
            floor.width, floor.height,
        );
        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            (floor.canvasX + floor.width), floor.canvasY,
            floor.width, floor.height,
        );
    }
}

const background = {
    spriteX:0,
    spriteY:0,
    width:144,
    height:256,
    canvasX:0,
    canvasY:canvas.height - 300,

    draw(){
        context.fillStyle ='#4ec0ca';
        context.fillRect(0,0, canvas.width, canvas.height);

        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            background.canvasX, background.canvasY,
            background.width, background.height,
        )
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.canvasX + background.width), background.canvasY,
            background.width, background.height,
        )
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.canvasX + 177), background.canvasY,
            background.width, background.height,
        )     
    }
}

const flappy = {
    spriteX: 113,
    spriteY: 328,
    width: 20,
    height: 14,
    canvasX: 10,
    canvasY: 50,
    
    gravity: 0.25,
    speed: 0,

    update(){
        flappy.speed = flappy.speed + flappy.gravity;
        flappy.canvasY = flappy.canvasY + flappy.speed;
    },

    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); sintaxe para drawr no canvas
    context.drawImage(
        sprites,                            //Imagen com vários elementos
        flappy.spriteX, flappy.spriteY,     //sprite x, sprite y 
        flappy.width, flappy.height,      // Tamanho do recorte na sprite
        flappy.canvasX, flappy.canvasY,
        flappy.width, flappy.height,
        );
    }
}

const getready = {
    spriteX: 295,
    spriteY: 59,
    width: 93,
    height: 25,
    canvasX: 100,
    canvasY: canvas.height - 290,
    
    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); sintaxe para drawr no canvas
    context.drawImage(
        sprites,                            //Imagen com vários elementos
        getready.spriteX, getready.spriteY,     //sprite x, sprite y 
        getready.width, getready.height,      // Tamanho do recorte na sprite
        getready.canvasX, getready.canvasY,
        getready.width, getready.height,
        );
    }
}

const tap = {
    spriteX: 292,
    spriteY: 90,
    width: 57,
    height: 50,
    canvasX: 120,
    canvasY: canvas.height -250,
    
    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); sintaxe para drawr no canvas
    context.drawImage(
        sprites,                            //Imagen com vários elementos
        tap.spriteX, tap.spriteY,     //sprite x, sprite y 
        tap.width, tap.height,      // Tamanho do recorte na sprite
        tap.canvasX, tap.canvasY,
        tap.width, tap.height,
        );
    }
}

//TELAS DO GAME
let screenActive = {};
function changeScreen(newScreen){
    screenActive = newScreen;
}

const Screens = {
    HOME: {
        draw(){
            background.draw();
            floor.draw();           
            getready.draw();
            tap.draw();
            flappy.draw();
        },
        click() {
            changeScreen(Screens.GAME);
        },
        update() {

        }
    }
}

Screens.GAME = {
    draw(){
        background.draw();
        floor.draw();
        flappy.draw();
    },
    update(){
        flappy.update();
    }
}

function loop() {
    
    screenActive.draw();
    screenActive.update();
   
    
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(screenActive.click){
        screenActive.click();
    }
});

changeScreen(Screens.HOME);
loop();