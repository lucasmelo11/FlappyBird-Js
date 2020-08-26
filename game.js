console.log('[Lucas Dev] Flappy Bird');

const hit_sound = new Audio();
hit_sound.src = './sounds/hit_ground.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const ground = {
    spriteX: 292,
    spriteY: 0,
    width: 168,
    height: 55,
    canvasX: 0,
    canvasY: canvas.height - 55,
    
    draw() {
        context.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.width, ground.height,
            ground.canvasX, ground.canvasY,
            ground.width, ground.height,
        );
        context.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.width, ground.height,
            (ground.canvasX + ground.width), ground.canvasY,
            ground.width, ground.height,
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

function collision(flappy, ground) {
    const flappyBirdY = flappy.canvasY + flappy.height;
    const groundY = ground.canvasY;

    if(flappyBirdY >= groundY){
        return true;
    }
    return false;
}

function createFlappy() {
    const flappy = {
        spriteX: 113,
        spriteY: 328,
        width: 20,
        height: 14,
        canvasX: 10,
        canvasY: 50,
        
        jumped: 4.6,
        
        jump(){
            console.log('I have to jump');
            console.log('[BEFORE]', flappy.speed);
            flappy.speed = - flappy.jumped;
            console.log('[AFTER]', flappy.speed);
        },
        gravity: 0.25,
        speed: 0,
    
        update(){
            if(collision(flappy, ground)){
                console.log('make collision');
                hit_sound.play();

                setTimeout(() => {
                    changeScreen(screens.HOME);
                },250);
                
                return;  
            } 
        
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
    return flappy;
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
const global = {};
let screenActive = {};
function changeScreen(newScreen){
    screenActive = newScreen;

    if(screenActive.start){
        screenActive.start();
    }
}

const screens = {
    HOME: {
        start(){
            global.flappy = createFlappy();
        },
        draw(){
            background.draw();
            ground.draw();           
            getready.draw();
            tap.draw();
            global.flappy.draw();
        },
        click() {
            changeScreen(screens.GAME);
        },
        update() {

        }
    }
}

screens.GAME = {
    draw(){
        background.draw();
        ground.draw();
        global.flappy.draw();
    },
    click(){
        global.flappy.jump();
    },
    update(){
        global.flappy.update();
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

changeScreen(screens.HOME);
loop();