/*
 * Application: pocketTanks.js
 * Author: Rebecca Wolfinger
 * Class: 15-112 Fundamentals of Programming, Professor Kosbie
 * 4/28/13
 *
 * This program is a recreation of the online game pocketTanks. There are two tanks,
 * that fire weapons at each other and each tank has a score. The winner is the one who has the
 * least damage after a certain amount of moves.
 */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = 900;        //define all variables
var height = 600;
var terrainY = new Array();
var weapons = [[8,0.035,"black", "Regular"], [10, 0.035,"purple","Medium"],
               [12, 0.03,"red", "Large"], [5, 0.035, "navy","Triple Shot"],
               [5, 0.04, "maroon", "FastBall"], [8, 0.03, "darkolivegreen","Double Hit"]];
var tank1 = new tank(1);
var tank2 = new tank(2);
var currPlayer = 1;
var buttons = new Array();
var gamePaused = new Boolean();
var gamePlay = false;
var startButton;
var gameNotStarted = true;
gamePaused = false;
createTerrain();
startGame();

function startGame(){
    console.log("start!");
    var grd=ctx.createRadialGradient(450,100,100,450,300,500);
    grd.addColorStop(0,"lightskyblue");
    grd.addColorStop(0.5,"steelblue");
    grd.addColorStop(1,"purple");
    // Fill with gradient
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle= "black";
    ctx.font="80px Georgia";
    ctx.fillText("Pocket Tanks", 210,100);
    startButton = new button(350,300,200,150, "Start", "");
    startButton.drawButton();
    
}

function endGame(loser){
    gameNotStarted = true;
    console.log("end of game");
    ctx.clearRect(0,0,width,height);
    var grd=ctx.createRadialGradient(450,100,100,450,300,500);
    grd.addColorStop(0,"lightskyblue");
    grd.addColorStop(0.5,"steelblue");
    grd.addColorStop(1,"purple");
    // Fill with gradient
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,width,height);
    if(loser.getplayer() ==1){var other = 2}
    else{var other = 1;}
    ctx.fillStyle= "black";
    ctx.font="80px Georgia";
    ctx.fillText("Pocket Tanks", 210,100);
    ctx.font="60px Georgia";
    ctx.fillText("Player "+ other.toString() + " Won!" , 265,200);
    startButton = new button(350,300,200,150, "Play Again?", "");
    startButton.drawButton(); 
}

//classes: tank and button
function tank(start){
    this.w = 0;
    this.score = 100;
    this.player = start;
    this.moves = 100;
    this.steepb = false;
    if(start ==1){
        this.px = 40;
        this.theta = Math.PI/4;
        }
    else{
        this.px = 820;
        this.theta = 3*Math.PI/4;
        }
    this.angle = angle;
    this.getplayer=getplayer;
    this.setpx=setpx;
    this.getpx=getpx;
    this.setpy=setpy;
    this.getpy=getpy;
    this.setnx=setnx;
    this.getnx=getnx;
    this.setny=setny;
    this.getny=getny;
    this.setphi=setphi;
    this.getphi=getphi;
    this.settheta=settheta;
    this.gettheta=gettheta;
    this.setscore=setscore;
    this.getscore=getscore;
    this.seti=seti;
    this.geti=geti;
    this.changeWeapon=changeWeapon;
    this.getweapon=getweapon;
  //  this.drawTank = drawTank;
    this.getmoves=getmoves;
    this.moved = moved;
    this.toosteep = toosteep;
    this.notsteep = notsteep;
    this.steep = steep;
    this.getpower = getpower;
    function getpower(){return 100 - (100-this.score)/5}
    function toosteep(){this.steepb = true}
    function notsteep(){this.steepb = false}
    function steep(){return this.steepb}
    function angle(){return this.theta+this.phi}
    function getmoves(){return this.moves}
    function moved(){this.moves = this.moves-1}
    function getplayer(){return this.player}
    function setpx(x){this.px = x}
    function getpx(){return this.px}
    function setpy(y){this.py = y}
    function getpy(){return terrainY[this.px]}
    function setnx(x){this.nx = x}
    function getnx(){return this.nx}
    function setny(y){this.ny = y}
    function getny(){return this.ny}
    function setphi(x){this.phi = x}
    function getphi(){return this.phi}
    function settheta(x){this.theta = x}
    function gettheta(){return this.theta}
    function setscore(x){this.score = x}
    function getscore(){return this.score}
    function seti(x){this.i = x}
    function geti(){return this.i}
    function changeWeapon(){this.w = (this.w+1)%6;}
    function getweapon(){return this.w;}
}

function button(x, y, w, h, text1, text2){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text2 = text2;
    this.text1 = text1;
    this.drawButton = drawButton;
    this.clicked=clicked;
    this.checkClicked = checkClicked;
    function drawButton(){
        var my_gradient1=ctx.createLinearGradient(0,this.y,0,this.y+this.h);
        my_gradient1.addColorStop(0,"silver");
        my_gradient1.addColorStop(1,"lightskyblue");
        ctx.fillStyle = my_gradient1;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.strokeStyle = "dimgray";
        ctx.strokeRect(this.x,this.y,this.w,this.h);
        ctx.fillStyle = "dimgray";
        ctx.font="15px Georgia";
        if(this.text1 == "Start" ){
            ctx.font = "30px Georgia";
            ctx.fillText(this.text1, this.x+this.w/4+15,this.y+this.h/2);

        }
        else if(this.text1 == "Play Again?"){
            ctx.font = "30px Georgia";
            ctx.fillText(this.text1, this.x+this.w/8,this.y+this.h/2);
        }
        else if(this.text1 == "Pause"){
            ctx.fillText(this.text1, this.x+this.w/4+5,this.y+this.h-15);
        }
        else if(this.text1 == "Restart"){
            ctx.fillText(this.text1, this.x+this.w/4,this.y+this.h-15);
        }
        else if(this.text1 == "Change"){
            ctx.fillText(this.text1, this.x+this.w/4,this.y+this.h/2-3);
            ctx.fillText(this.text2, this.x+this.w/4,this.y+3*this.h/4+2);   
        }
        else{
            ctx.fillText(this.text1, this.x+this.w/4-5,this.y+this.h/2-3);
            ctx.fillText(this.text2, this.x+this.w/4+5,this.y+3*this.h/4+2);
        }
    }
    function checkClicked(event,i){
        if((event.x>=this.x && event.x<=this.x+this.w) &&(event.y>=this.y && event.y<=this.y+this.h)){
            this.clicked(i);
        }
    }
    function clicked(i){
        if(i == 0){pauseGame()}
        else if(i == 1){runGame()}
        else if(i == 2){currPlayer.changeWeapon()}
        else if(i == 3){pauseGame()}
    }
}

//starts a new game
function runGame(){
    gameNotStarted = false;
    createTerrain();
    drawTerrain();
    tank1 = new tank(1);
    tank2 = new tank(2);
    currPlayer = tank1;
    otherPlayer = tank2;
    createTanks(currPlayer,otherPlayer);
    drawTank(currPlayer);
    drawTank(otherPlayer);
    createButtons();
    gamePaused = false;
    gamePlay = true;
    redrawAll();
}

function onMouseDown(event) {
    if(gameNotStarted==true){
        startButton.checkClicked(event, 1);
    }
    if(gameNotStarted == false){
        for(i = 0; i <buttons.length; i++){
        buttons[i].checkClicked(event, i);
        }
        redrawAll();
    } 
}
//this function changes info about the tank through pressed keys
function onKeyPress(event) {
    if(gameNotStarted == false){
        ctx.restore();
        ctx.clearRect(0, 0, width, height);
        drawTerrain();
        if (event.keyCode == 38 && !gamePaused && gamePlay){
            moveBarrel(currPlayer,1);  //up should change nozzel
        }
        else if(event.keyCode == 39 && !gamePaused && gamePlay){
            moveTank(currPlayer, 5);    //move tanks to the right
        }
        else if(event.keyCode == 40 && !gamePaused && gamePlay){
            moveBarrel(currPlayer,-1);       //down should move nozzel
        }
        else if(event.keyCode ==37 && !gamePaused && gamePlay){
            moveTank(currPlayer, -5);    //move tanks to the left
        }
        else if(event.keyCode == 32 && !gamePaused && gamePlay){   //spacebar shoots!!
          //  currPlayer.weaponFired();
            fireAway(currPlayer);
        }
        else if(event.keyCode == 80){   //'p' Pauses the game
            pauseGame();
        }
        else if(event.keyCode == 82){   //'r' restarts the game
            runGame();
        }
        else if(event.keyCode == 87 && gamePlay){   //'w' changes the weapons
            currPlayer.changeWeapon();
        }
        redrawAll();
    }

}

function pauseGame(){
    if(gamePaused==false){
        gamePaused = true;
        gamePlay = false;
        }
    else{
        gamePaused = false;
        gamePlay = true;
        }
}

function showRules(){
    ctx.fillStyle = "black";
    ctx.font="20px Georgia";
    ctx.fillText("How You Play:", 25, 250);
    ctx.fillText("What You Do:", 530, 250);
    ctx.font="18px Georgia";
    ctx.fillText("Fire weapons against your opponent to lower their health.", 25, 275);
    ctx.fillText("Direct hits will have the most impact.", 25, 300);
    ctx.fillText("The different weapons have different speeds and size;", 25, 325);
    ctx.fillText("the weapons with the largest size will have the most impact.", 25, 350);
    ctx.fillText("You have a limited number of moves; so use them wisely.", 25, 375);
    ctx.fillText("The last tank standing wins!", 25, 400);
    ctx.fillText("Hit the SpaceBar to fire!", 530, 275);
    ctx.fillText("Left and right arrows will move the tank!", 530, 300);
    ctx.fillText("Up and down arrows will move the barrel" , 530, 325);
    ctx.fillText("clockwise and counterclockwise" , 545, 350);
    ctx.fillText("Hit 'w' to change your weapon!", 530, 375);
    ctx.fillText("Hit 'p' to pause the game!", 530, 400);
    ctx.fillText("Hit 'r' to restart the game!", 530, 425);
}

function drawPausedScreen(){
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "purple";
    ctx.fillRect(0,0,width,height);
    ctx.globalAlpha = 1;
    ctx.fillStyle= "black";
    ctx.font="30px Georgia";
    ctx.fillText("Pocket Tanks", 355,40);
    ctx.font="40px Georgia";
    ctx.fillText("Game Paused!", 325, 200);
    showRules();
    
    
}
//this function creates a randomized terrain
function createTerrain(){
    terrainY[0] = 500;
    for (var i = 1; i <= width; i++){
        if(i<width/2){terrainY[i] = terrainY[i-1] - 0.75*Math.random() }
       else{terrainY[i] = terrainY[i-1] + 0.75*Math.random()  }    
    }
}

//this function draws the terrain
function drawTerrain(){
    var my_gradient1=ctx.createLinearGradient(0,0,0,200);
    my_gradient1.addColorStop(0,"gray");
    my_gradient1.addColorStop(1,"deepskyblue");
    ctx.fillStyle=my_gradient1;
    ctx.fillRect(0,0,width,height);
    var my_gradient=ctx.createLinearGradient(0,100,0,900);
    my_gradient.addColorStop(0,"green");
    my_gradient.addColorStop(0.5,"darkgreen");
    my_gradient.addColorStop(1,"black");
    ctx.fillStyle=my_gradient;
    for (var i = 0; i <= width; i++){
        my_gradient=ctx.createLinearGradient(0,terrainY[i],0,900);
        my_gradient.addColorStop(0,"limegreen");
        my_gradient.addColorStop(0.15,"green");
        my_gradient.addColorStop(0.25,"darkgreen");
        my_gradient.addColorStop(0.5,"black");
        ctx.fillStyle= my_gradient;
        ctx.fillRect(i,terrainY[i],5,height-terrainY[i]);
    }
}

//this function creates starting info about the tanks
function createTanks(currPlayer,otherPlayer){
    currPlayer.setpy(terrainY[currPlayer.getpx]-20);
    otherPlayer.setpy(terrainY[currPlayer.getpx]-20);
}

//this function draws the tanks
function drawTank(tank){  
    ctx.fillStyle = "gray";
    console.log(tank.getpx());
    //body of player
    ctx.beginPath();
    ctx.moveTo(tank.getpx(),terrainY[tank.getpx()]);
    tank.seti(30);
    for(i=0; i<=30; i++){
        if(Math.sqrt((i*i)+(terrainY[tank.getpx()+i]-terrainY[tank.getpx()])*(terrainY[tank.getpx()+i]-terrainY[tank.getpx()]))<=31 &&
           Math.sqrt((i*i)+(terrainY[tank.getpx()+i]-terrainY[tank.getpx()])*(terrainY[tank.getpx()+i]-terrainY[tank.getpx()]))>=29){
            tank.seti(i);
            break;
        }
    }
    tank.setphi(Math.acos(i/30));
    changeDelta(tank);
    if(terrainY[tank.getpx()+i]>terrainY[tank.getpx()]){tank.setphi(2*Math.PI-tank.getphi());}
    ctx.lineTo(tank.getpx()+i,terrainY[tank.getpx()+i]);
    ctx.lineTo((tank.getpx()+tank.geti())-20*Math.sin(tank.getphi()),(terrainY[tank.getpx()+tank.geti()])-20*Math.cos(tank.getphi()));
    ctx.lineTo(tank.getpx()-20*Math.sin(tank.getphi()),terrainY[tank.getpx()]-20*Math.cos(tank.getphi()));
    ctx.closePath();
    ctx.fill();
   // delta = Math.abs(terrainY[hitPlayer.getpx()]-terrainY[hitPlayer.getpx()+hitPlayer.geti()]);
    var midx1= tank.getpx()+25*Math.cos(0.927293432+tank.getphi()); //0.927293432 is the angle in a 3:4:5 Triangle
    if(terrainY[tank.getpx()] >terrainY[tank.getpx()+tank.geti()]){
        var midy1=terrainY[tank.getpx()]-Math.abs(25*Math.sin((0.696706709+tank.getphi())%Math.PI));
    }
    else{
        var midy1=terrainY[tank.getpx()+tank.geti()]-Math.abs(25*Math.cos(Math.abs(0.927293432+tank.getphi())));
    }
    ctx.beginPath();
    ctx.arc(midx1,midy1, 8, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    //barrel 
    ctx.beginPath();
    mx = midx1-3*Math.sin(tank.gettheta());
    my = midy1-3*Math.cos(tank.gettheta());
    ctx.moveTo(mx, my);
    ctx.lineTo(mx+6*Math.sin(tank.angle()),my+6*Math.cos(tank.angle()));
    ctx.lineTo((mx+6*Math.sin(tank.angle()))+25*Math.cos(tank.angle()),(my+6*Math.cos(tank.angle()))-25*Math.sin(tank.angle()));
    ctx.lineTo(mx+25*Math.cos(tank.angle()),my-25*Math.sin(tank.angle()));
    ctx.closePath();
    ctx.fill();
    tank.setnx(mx+25*Math.cos(tank.angle()));
    tank.setny(my-25*Math.sin(tank.angle()));
    
}

//this function changes the angle of the barrel
function moveBarrel(currPlayer, dir){
    if(currPlayer.getplayer()==2){
        //dir= -dir;
    }
    if((dir*0.01+currPlayer.gettheta())%(2*Math.PI)>=0 && (dir*0.01+currPlayer.gettheta())%(2*Math.PI)<= Math.PI){
        currPlayer.settheta((dir*0.1+currPlayer.gettheta())%(2*Math.PI));
    }
    else if((dir*0.01+currPlayer.gettheta())%(2*Math.PI)<0){
        currPlayer.settheta(0);
    }
        else if((dir*0.01+currPlayer.gettheta())%(2*Math.PI)>Math.PI){
        currPlayer.settheta(Math.PI);
    }
}

//this function moves the tank left and right
function moveTank(currPlayer, dir){
    if(currPlayer.getmoves() != 0){
        currPlayer.setpx(currPlayer.getpx()+dir);
        delta = Math.abs(terrainY[currPlayer.getpx()]-terrainY[currPlayer.getpx()+currPlayer.geti()]);
      //  console.log(delta);
        if(delta>15){
            currPlayer.setpx(currPlayer.getpx()-dir);
            currPlayer.toosteep();
          //  console.log("too steep!", delta);
        }
        else{
            currPlayer.notsteep();
            currPlayer.moved();
        }
    }


}

//this function fires the weapon
function fireAway(){
    gamePlay = false;
    console.log("fire!!!");
    weapon = currPlayer.getweapon();
    var t = 0;
    var x = currPlayer.getnx();
    var y = currPlayer.getny();
    var x1 = currPlayer.getnx();
    var y1 = currPlayer.getny();
    var x2 = currPlayer.getnx();
    var y2 = currPlayer.getny();
    var clear1 = false;
    var clear2 = false;
    var clear3 = false;
    var int1 = setInterval(function(){projectile1()}, 10);
    if(weapons[weapon][3]=="Triple Shot"){    //if this weapon breaks off into 3
        var int2 = setInterval(function(){projectile2()}, 10);
        var int3 = setInterval(function(){projectile3()}, 10);
    }
    function projectile1(){
        if(gamePaused== false){
            t+=200;
            redrawAll();
            if(y<terrainY[Math.round(x)] && x<=width && x>=0&&clear1==false){
                x = currPlayer.getnx() + (weapons[weapon][1])*Math.cos(currPlayer.angle())*t;
                y = currPlayer.getny() - (weapons[weapon][1])*Math.sin(currPlayer.angle())*t + (0.5*(0.0000015))*(t*t);
                circle(ctx, x, y,weapons[weapon][0],weapons[weapon][2]);
                clear1 = checkDirectHit(x,y,weapons[weapon][0],otherPlayer);
            }
            else if((y>terrainY[Math.round(x)] || x>width || x<0) && clear1 ==false){
                if(x2<width || x2>0){
                    if(weapons[weapon][3] == "Double Hit"){
                        blowUp(x+5,y,weapons[weapon][0]*4,otherPlayer);
                    }
                    else{
                        blowUp(x,y,weapons[weapon][0]*2,otherPlayer);
                    }
                    
                }
                clear1 = true;
            }
        if(weapons[weapon][3]=="Triple Shot"){
            if(y1<terrainY[Math.round(x1)] && x1<=width && x1>=0&&clear2==false){
                x1 = currPlayer.getnx() + ((currPlayer.getpower()/100)*weapons[weapon][1])*Math.cos(currPlayer.angle()-0.09817)*t;
                y1 = currPlayer.getny() - (weapons[weapon][1])*Math.sin(currPlayer.angle()-0.09817)*t + (0.5*(0.0000015))*(t*t);
                clear2 = checkDirectHit(x1,y1,weapons[weapon][0],otherPlayer);
                circle(ctx, x1, y1,weapons[weapon][0],weapons[weapon][2]);
            }
            else if((y1>terrainY[Math.round(x1)] || x1>width || x1<0) && clear2 == false){
                if(x1<width || x1>0){
                    blowUp(x1,y1,weapons[weapon][0]*2,otherPlayer);
                }
                clear2 = true;
            }
            
            if(y2<terrainY[Math.round(x2)] && x2<=width && x2>=0&&clear3==false){
                x2 = currPlayer.getnx() + (weapons[weapon][1])*Math.cos(currPlayer.angle()+0.09817)*t;
                y2 = currPlayer.getny() - (weapons[weapon][1])*Math.sin(currPlayer.angle()+0.09817)*t + (0.5*(0.0000015))*(t*t);
                clear3 = checkDirectHit(x2,y2,weapons[weapon][0],otherPlayer);
                circle(ctx, x2, y2,weapons[weapon][0],weapons[weapon][2]);
            }
            else if((y2>terrainY[Math.round(x2)] || x2>width || x2<0) && clear3 ==false){
                if(x2<width || x2>0){
                    blowUp(x2,y2,weapons[weapon][0]*2, otherPlayer);
                }
                clear3 = true;
            }   
        }
        else{
            clear3 = true;
            clear2 = true;
        }
        }
        if(clear1==true&& clear2== true &&clear3==true){
            clearInterval(int1);
            if(currPlayer.getplayer()==1){
                currPlayer = tank2;
                otherPlayer = tank1;
            }
            else{
                currPlayer = tank1;
                otherPlayer = tank2; 
            }
            gamePlay=true;
            redrawAll();
        }
    }
}

//this function takes out a chunk of the terrain where the weapon lands
function blowUp(x,y,radius,player){
    x = Math.round(x);
    y = Math.round(y);
    for(i=x-radius;i<x+radius; i++){
        terrainY[i]=Math.max(y+Math.sqrt((radius*radius)-(x-i)*(x-i)),terrainY[i]);
    }
    checkIndirectHit(x,y,radius,player);
    console.log("done with explosion");
}

function changeDelta(hitPlayer){
    delta = Math.abs(terrainY[hitPlayer.getpx()]-terrainY[hitPlayer.getpx()+hitPlayer.geti()/2]);
   // console.log(delta);
    while(delta>15){
    //    console.log("detla",delta);
        if(hitPlayer.getplayer() == 2){
            hitPlayer.setpx(hitPlayer.getpx()+5);
        }
        else{
            hitPlayer.setpx(hitPlayer.getpx()-5);
        }
        delta = Math.abs(terrainY[hitPlayer.getpx()]-terrainY[hitPlayer.getpx()+hitPlayer.geti()]);
    }
    console.log("final delta", delta);
}

//this function checks if the weapon hits the tank
function checkDirectHit(cx,cy,radius,hitPlayer){
    console.log("checking hit",cx,cy,hitPlayer.getpx(), hitPlayer.getpy(),terrainY[hitPlayer.getpx()]);
    //check if weapon hits tank directly
    changeDelta(hitPlayer);
    if((cx>=hitPlayer.getpx() && cx<=hitPlayer.getpx()+30 )&&(cy>=terrainY[hitPlayer.getpx()]-20 && cy<=terrainY[hitPlayer.getpx()])){
        hitPlayer.setscore(hitPlayer.getscore()-25);
        checkEndGame();
        console.log("Direct Hit");
        return true;
    }
    return false;


}
function checkIndirectHit(cx,cy,radius,hitPlayer){
        //else, check if weapon lands within certain radius of the tank
    if((cx>=hitPlayer.getpx()-radius && cx<=hitPlayer.getpx()+30+radius )&&
        (cy>=terrainY[hitPlayer.getpx()]-20-radius && cy<=terrainY[hitPlayer.getpx()]+radius)){
        hitPlayer.setscore(hitPlayer.getscore()-10);
        checkEndGame();
        console.log("Indirect Hit");
    }
}


function drawHealthBar(tank1,tank2){
    var score1 = tank1.getscore();
    var score2 = tank2.getscore();
    ctx.fillStyle= "black";
    ctx.font="20px Georgia";
    ctx.fillText("Player 1 Health: "+score1.toString(),40,75);
    ctx.fillText("Player 2 Health: "+score2.toString(),690,75);
    //health bar for player 1
    var my_gradient=ctx.createLinearGradient(50,0,150,0);
    my_gradient.addColorStop(0,"firebrick");
    my_gradient.addColorStop(0.75,"gold");
    my_gradient.addColorStop(1,"limegreen");
    ctx.fillStyle = "black"
    ctx.fillRect(50,85,150,50);
    ctx.fillStyle=my_gradient;
    ctx.strokeStyle = "black";
    if(score1>=0){
        ctx.fillRect(50,85,score1*3/2,50);
    }
    ctx.strokeRect(50,85,150,50);
    //health bar for player 2
    var my_gradient1=ctx.createLinearGradient(700,0,800,0);
    my_gradient1.addColorStop(0,"firebrick");
    my_gradient1.addColorStop(0.75,"gold");
    my_gradient1.addColorStop(1,"limegreen");
    ctx.fillStyle = "black"
    ctx.fillRect(700,85,150,50);
    ctx.fillStyle=my_gradient1;
    ctx.strokeStyle = "black";
    if(score2>=0){
        ctx.fillRect(700,85,score2*3/2,50);
    }
    ctx.strokeRect(700,85,150,50);
}

function drawGameScreen(currPlayer){
    ctx.fillStyle= "black";
    ctx.font="30px Georgia";
    ctx.fillText("Pocket Tanks", 355,40);
    ctx.font="20px Georgia";
    ctx.fillText("It is Player "+ currPlayer.getplayer().toString() + "'s turn!", 360, 75);
    ctx.fillText("Your current weapon is: "+ weapons[currPlayer.getweapon()][3].toString() , 320, 100);
    if(currPlayer.getplayer() == 1){
        ctx.fillText("Angle: " + ((currPlayer.gettheta()*360/(2*Math.PI))-(currPlayer.gettheta()*360/(2*Math.PI))%1).toString(), 290, 125);
    }
    else {
        ctx.fillText("Angle: " + (((Math.PI-currPlayer.gettheta())*360/(2*Math.PI))-((Math.PI-currPlayer.gettheta())*360/(2*Math.PI))%1).toString(), 290, 125);
    }
    ctx.fillText("Power: " + currPlayer.getpower().toString(), 400, 125);
    ctx.fillText("Moves: " + currPlayer.getmoves().toString(), 530, 125);
    if(currPlayer.getmoves() == 0 ){
        currPlayer.notsteep();
        ctx.font = "25px Georgia"
        ctx.fillText("No More Moves!", 360, 155);
    }
    if(currPlayer.steep() == true){
            ctx.font = "25px Georgia";
            ctx.fillText("That is too steep!", 355, 155);
    }
}

function createButtons(){
    buttons = [new button(20,5,100,40,"Pause", ""), new button(170,5,100,40,"Restart", ""),
                new button(630,5,100,40,"Change","Weapon"), new button(780,5,100,40,"Info and ","Rules")];
}

function drawButtons(){
    for(i = 0; i < buttons.length; i++){buttons[i].drawButton();}
}
function checkEndGame(){
    if(tank1.getscore()<= 0){
        tank1.setscore(0);
        endGame(tank1);
    }
    else if(tank2.getscore()<=0){
        tank2.setscore(0);
        endGame(tank2);
    }
}
function redrawAll(){
    ctx.restore();
    ctx.clearRect(0, 0, width, height);
    drawTerrain();
    drawTank(tank1);
    drawTank(tank2);
    if(gamePaused == true){drawPausedScreen();}
    drawGameScreen(currPlayer);
    drawHealthBar(tank1,tank2);
    drawButtons();
    checkEndGame();
}

function circle(ctx, cx, cy, radius, color) {      //this function has been taken from 15-237 course notes, taught by Kosbie
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
}

ctx.beginPath();
canvas.addEventListener('keydown', onKeyPress, false);

canvas.addEventListener('mousedown', onMouseDown, false);
// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();