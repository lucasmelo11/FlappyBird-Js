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
    Xcanvas: 0,
    Ycanvas: canvas.height - 55,
    
    draw() {
        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            floor.Xcanvas, floor.Ycanvas,
            floor.width, floor.height,
        );
        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            (floor.Xcanvas + floor.width), floor.Ycanvas,
            floor.width, floor.height,
        );
    }
}

const background = {
    spriteX:0,
    spriteY:0,
    width:144,
    height:256,
    Xcanvas:0,
    Ycanvas:canvas.height - 300,

    draw(){
        context.fillStyle ='#4ec0ca';
        context.fillRect(0,0, canvas.width, canvas.height);

        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            background.Xcanvas, background.Ycanvas,
            background.width, background.height,
        )
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.Xcanvas + background.width), background.Ycanvas,
            background.width, background.height,
        )
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.Xcanvas + 177), background.Ycanvas,
            background.width, background.height,
        )     
    }
}

const flappy = {
    spriteX: 113,
    spriteY: 328,
    width: 20,
    height: 14,
    Xcanvas: 10,
    Ycanvas: 50,
    
    gravity: 0.25,
    speed: 0,

    update(){
        flappy.speed = flappy.speed + flappy.gravity;
        flappy.Ycanvas = flappy.Ycanvas + flappy.speed;
    },

    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); sintaxe para drawr no canvas
    context.drawImage(
        sprites,                            //Imagen com vários elementos
        flappy.spriteX, flappy.spriteY,     //sprite x, sprite y 
        flappy.width, flappy.height,      // Tamanho do recorte na sprite
        flappy.Xcanvas, flappy.Ycanvas,
        flappy.width, flappy.height,
        );
    }
}

function loop() {

    flappy.update();

    background.draw();
    floor.draw();
    flappy.draw();
    
    requestAnimationFrame(loop);
}

loop();