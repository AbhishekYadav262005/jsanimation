const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let paddle={
   width:130,
    height:10,
x : (canvas.width / 2) - 50 ,
y : canvas.height - 20 ,
speed : 10 ,
vx:0 
} ;

let ball = {
    x:canvas.width /2 ,
    y:50 ,
    radius : 15 ,
    speed:8,
    vx:5,
    vy:5
};
let score = 0 ;

 function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y , ball.radius , 0 , 2*Math.PI);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
 }

 function drawPaddle(){
 ctx.fillStyle = "#333" ;
 ctx.fillRect(paddle.x , paddle.y , paddle.width , paddle.height);
 }

 function movePaddle(){
    paddle.x+=paddle.vx ;

    if(paddle.x < 0){
        paddle.x=0;
    
    }
    if(paddle.x + paddle.width > canvas.width){
        paddle.x = canvas.width - paddle.width ;
    }
 } 

 function moveBall(){
  ball.x +=ball.vx ;
  ball.y +=ball.vy ;


  if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
    ball.vx *=-1 ;
  }
if(ball.y - ball.radius < 0 ){
    ball.vy *=-1;
}
 
if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x <paddle.x + paddle.width){
    ball.vy *= -1 ;
    score++ ;
    document.getElementById('score').innerText = `Score : ${score}` ;
 }

    if(ball.y + ball.radius > canvas.height){
        alert("Game Over ! ");
        setTimeout(restartGame,.5);
    }
 }



function update(){
    ctx.clearRect(0,0,canvas.width , canvas.height);

    drawPaddle();
    drawBall();

    movePaddle();
    moveBall();

    requestAnimationFrame(update);
}

function restartGame() {

    paddle.x = (canvas.width / 2) - 50;
    paddle.vx = 0;

    ball.x = canvas.width / 2;
    ball.y = 50;
    ball.vx = 5;
    ball.vy = 5;

    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
}
 function keyDown(e){
if(e.key=="Right" || e.key=="ArrowRight") paddle.vx = paddle.speed ;
if(e.key=="Left" || e.key =="ArrowLeft") paddle.vx = -paddle.speed ;


 }

 function keyUp(e){
   if(e.key=="Right" || e.key=="ArrowRight" || e.key=="Left" || e.key =="ArrowLeft") paddle.vx = 0 
 }

 document.addEventListener('keydown',keyDown);
 document.addEventListener('keyup' , keyUp);

 update();