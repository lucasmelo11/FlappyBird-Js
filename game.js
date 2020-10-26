console.log('[Lucas Dev] Flappy Bird');

let frames = 0;
//SONS DO JOGO
const hit_sound = new Audio();
hit_sound.src = './sounds/hit_ground.wav';

//IMAGENS DO JOGO
const sprites = new Image();
sprites.src = './sprites.png';

//REFERENCIA HTML
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//FUNDO DO JOGO
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
//CHÃO DO JOGO
function createFloor(){
    const floor = {
        spriteX: 292,
        spriteY: 0,
        width: 167.1,
        height: 55,
        canvasX: 0,
        canvasY: canvas.height - 55,
        update(){
            const moveFloor = 1;
            const repeatFloor = floor.width / 15.2;
            const moviment = floor.canvasX - moveFloor;
            
            //console.log('Floor.canvasX', floor.canvasX);
            //console.log('repeatFloor', repeatFloor);
            //console.log('moviment', moviment % repeatFloor);

            floor.canvasX = moviment % repeatFloor;
        },
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
    return floor;
}
//LÓGICA DE COLISÃO COM O CHÃO
function collision(flappy, floor) {
    const flappyBirdY = flappy.canvasY + flappy.height;
    const floorY = floor.canvasY;

    if(flappyBirdY >= floorY){
        return true;
    }
    return false;
}
//CARACTERISTICAS E DADOS DO PERSONAGEM FLAPPY BIRD
function createFlappy() {
    const flappy = {
        spriteX: 115,
        spriteY: 381,
        width: 18,
        height: 12,
        canvasX: 10,
        canvasY: 50,
        
        jumped: 4.6,
        
        jump(){
            console.log('I have to jump');
            //console.log('[BEFORE]', flappy.speed);
            flappy.speed = - flappy.jumped;
            //console.log('[AFTER]', flappy.speed);
        },
        gravity: 0.25,
        speed: 0,
    
        update(){
            if(collision(flappy, global.floor)){
                //console.log('make collision');
                hit_sound.play();

                setTimeout(() => {
                    changeScreen(Screens.HOME);
                },250);
                
                return;  
            } 
        
        flappy.speed = flappy.speed + flappy.gravity;
        flappy.canvasY = flappy.canvasY + flappy.speed;
        },

        //MOVIMENTO DE BATER ASAS
        movimentsFlappy: [
            {spriteX: 115, spriteY: 381},//ASA PRA CIMA
            {spriteX: 115, spriteY: 407},//ASA NO MEIO
            {spriteX: 115, spriteY: 433},//ASA PRA BAIXO
        ],
        currentFrame: 0,
        updateCurrentFrame(){
            const framesInterval = 14;
            const passedInterval = frames % framesInterval === 0;
            //console.log(passedInterval);
            if(passedInterval){
                const incrementBase = 1;
                const increment = incrementBase + flappy.currentFrame;
                const repeatBase = flappy.movimentsFlappy.length;
                flappy.currentFrame = increment % repeatBase;
            }
        },
        draw() {
            flappy.updateCurrentFrame();
            const {spriteX, spriteY} = flappy.movimentsFlappy[flappy.currentFrame];
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); sintaxe para drawr no canvas
        context.drawImage(
            sprites,                            //Imagen com vários elementos
            spriteX, spriteY,     //sprite x, sprite y 
            flappy.width, flappy.height,      // Tamanho do recorte na sprite
            flappy.canvasX, flappy.canvasY,
            flappy.width, flappy.height,
            );
        }
    }
    return flappy;
}
//MENSAGEM DA TELA INICIAL
const getready = {
    spriteX: 295,
    spriteY: 59,
    width: 93,
    height: 25,
    canvasX: 65,
    canvasY: canvas.height - 200,
    
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
//MENSAGEM DA TELA INICIAL
const tap = {
    spriteX: 292,
    spriteY: 90,
    width: 57,
    height: 50,
    canvasX: 84,
    canvasY: canvas.height -150,
    
    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); sintaxe para drawr no canvas
    context.drawImage(
        sprites,                      //Imagen com vários elementos
        tap.spriteX, tap.spriteY,     //sprite x, sprite y 
        tap.width, tap.height,        // Tamanho do recorte na sprite
        tap.canvasX, tap.canvasY,
        tap.width, tap.height,
        );
    }
}
//CRIA OS CANOS
function createPipes(){
    const pipes = {
            width: 27,
            height: 166,
        top:{
            spriteX: 56,
            spriteY: 323,     
        },
        bottom:{
            spriteX: 84,
            spriteY: 323,       
        },
        draw(){
            pipes.pairs.forEach(function(pair){
            const yRandom =  pair.y;
            const spaceBetweenPipes = 75;
        //CANO CÉU
            const pipeTopX = pair.x;
            const pipeTopY = yRandom;

        context.drawImage(
            sprites,
            pipes.top.spriteX, pipes.top.spriteY,
            pipes.width, pipes.height,
            pipeTopX, pipeTopY,
            pipes.width, pipes.height, 
        )
        //CANO CHÃO
            const pipeBottomX = pair.x;
            const pipeBottomY = pipes.height + spaceBetweenPipes + yRandom;
        context.drawImage(
            sprites,
            pipes.bottom.spriteX, pipes.bottom.spriteY,
            pipes.width, pipes.height,
            pipeBottomX, pipeBottomY,
            pipes.width, pipes.height, 
        )
        pair.pipeTop = {
            x: pipeTopX,
            y: pipes.height + pipeTopY
        }
        pair.pipeBottom = {
            x: pipeBottomX,
            y: pipeBottomY
        }   
        })
    },
    //COLISÃO COM OS CANOS
    CollisionWithFlappy(pair){
        const flappyHead = global.flappy.canvasY; 
        const flappyFoot = global.flappy.canvasY + global.flappy.height;
        if(global.flappy.canvasX >= pair.x){
            console.log('VOCÊ INVAIDIU A AREA DOS CANOS');
            if(flappyHead <= pair.pipeTop.y){
                return true;
            }

            if(flappyFoot >= pair.pipeBottom.y){
                return true;
            }
        }
        return false;            
    },
    pairs: [],
    //A CADA 100 FRAMES A ALTURA DOS CANOS É ALTERADA
    update(){
        const passed100Frames = frames % 100 === 0;
        if(passed100Frames){
            console.log('Passou 100 frames');
            pipes.pairs.push({
                x: canvas.width,
                y: -40 * (Math.random()+ 1.7),
            });
        }

        pipes.pairs.forEach(function(pair){
            pair.x = pair.x - 1;
            
            if(pipes.CollisionWithFlappy(pair)){
                //console.log('ACERTOU O CANO');
                changeScreen(Screens.HOME);
            }
            
            if(pair.x + pipes.width <= 0){
                pipes.pairs.shift();
            }
        });
    }
}
    return pipes;
}
//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//
//TELAS DO GAME 
const global = {};
let screenActive = {};
function changeScreen(newScreen){
    screenActive = newScreen;

    if(screenActive.start){
        screenActive.start();
    }
}
//TELA INICILA DO JOGO
const Screens = {
    HOME: {
        start(){
            global.flappy = createFlappy();
            global.floor = createFloor();
            global.pipes = createPipes();
        },
        draw(){
            background.draw();                     
            getready.draw();
            tap.draw();
            global.pipes.draw();
            global.floor.draw();
            global.flappy.draw();
        },
        click() {
            changeScreen(Screens.GAME);
        },
        update() {
            global.floor.update();
        }
    }
}
//TELA DURANTE O JOGO
Screens.GAME = {
    draw(){
        background.draw();
        global.pipes.draw();
        global.floor.draw();
        global.flappy.draw();
    },
    click(){
        global.flappy.jump();
    },
    update(){
        global.pipes.update();
        global.floor.update();
        global.flappy.update();
    }
}

function loop() {
    
    screenActive.draw();
    screenActive.update();
   
    frames = frames + 1;
    requestAnimationFrame(loop);
}
//RECONHECE CLICKS NA TELA
window.addEventListener('click', function(){
    if(screenActive.click){
        screenActive.click();
    }
});

changeScreen(Screens.HOME);
loop();