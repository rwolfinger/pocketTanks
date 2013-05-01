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
/*var img = document.getElementById("Surf");
var unpauseButton = document.getElementById("unpause");
var restartButton = document.getElementById("restart");
var changeWeaponButton = document.getElementById("changeWeapon");
var info = document.getElementById("info");
var titleImage = document.getElementById("title");
var pause = document.getElementById("pause");
*/
var terrainY = new Array();
var weapons = [[5,0.035,"black"], [10, 0.035,"purple"], [15, 0.03,"red"]];
var tank1 = new tank(1);
var tank2 = new tank(2);
var currPlayer = 1;
var buttons = new Array();
var gamePaused = new Boolean();
gamePaused = false;
runGame();


//classes: tank and button
function tank(start){
    this.w = 0;
    this.score = 100;
    this.player = start;
    if(start ==1){
        this.px = 40;
        this.theta = Math.PI/4;
        }
    else{
        this.px = 820;
        this.theta = 3*Math.PI/4;
        }
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
    this.drawTank = drawTank;
    this.getmoves=getmoves;
    function getmoves(){return 20}
    function getplayer(){return this.player}
    function setpx(x){this.px = x}
    function getpx(){return this.px}
    function setpy(y){this.py = y}
    function getpy(){return this.py}
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
    function changeWeapon(){this.w = (this.w+1)%3;}
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
        ctx.fillStyle = "steelblue";
        ctx.font="15px Georgia";
        if(this.text1 == "Pause"){
            ctx.fillText(this.text1, this.x+this.w/4+5,this.y+this.h-15);
        }
        else if(this.text1 == "Restart"){
            ctx.fillText(this.text1, this.x+this.w/4,this.y+this.h-15);
        }
        else if(this.text1 == "Change"){
            ctx.fillText(this.text1, this.x+this.w/4,this.y+this.h/2-5);
            ctx.fillText(this.text2, this.x+this.w/4,this.y+3*this.h/4);   
        }
        else{
            ctx.fillText(this.text1, this.x+this.w/4-5,this.y+this.h/2-5);
            ctx.fillText(this.text2, this.x+this.w/4+5,this.y+3*this.h/4);
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
    tank1 = new tank(1);
    tank2 = new tank(2);
    currPlayer = tank1;
    otherPlayer = tank2;
    createTerrain();
    createTanks(currPlayer,otherPlayer);
    drawTank(currPlayer);
    drawTank(otherPlayer);
    createButtons();
    redrawAll();
    gamePaused = false;

    
}

function onMouseDown(event) {
    for(i = 0; i <buttons.length; i++){
        buttons[i].checkClicked(event, i);
    }
    redrawAll();
    
}
//this function changes info about the tank through pressed keys
function onKeyPress(event) {
    ctx.restore();
    ctx.clearRect(0, 0, width, height);
    drawTerrain();
    if (event.keyCode == 38 && !gamePaused){
        moveBarrel(currPlayer,-1);  //up should change nozzel
    }
    else if(event.keyCode == 39 && !gamePaused){
        moveTank(currPlayer, 5);    //move tanks to the right
    }
    else if(event.keyCode == 40 && !gamePaused){
        moveBarrel(currPlayer,1);       //down should move nozzel
    }
    else if(event.keyCode ==37 && !gamePaused){
        moveTank(currPlayer, -5);    //move tanks to the left
    }
    else if(event.keyCode == 32 && !gamePaused){   //spacebar shoots!!
      //  currPlayer.weaponFired();
        fireAway(currPlayer);
    }
    else if(event.keyCode == 80){   //'p' Pauses the game
        pauseGame();
    }
    else if(event.keyCode == 82){   //'r' restarts the game
        runGame();
    }
    else if(event.keyCode == 87){   //'w' changes the weapons
        currPlayer.changeWeapon();
    }

    redrawAll();
}

function pauseGame(){
    if(gamePaused==false){gamePaused = true}
    else{gamePaused = false}
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
    ctx.fillText("Up and down arrows will move the barrel!", 530, 325);
    ctx.fillText("Hit 'w' to change your weapon!", 530, 350);
    ctx.fillText("Hit 'p' to pause the game!", 530, 375);
    ctx.fillText("Hit 'r' to restart the game!", 530, 400);
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
    for (var i = 1; i < width; i++){
        if(i<width/2){terrainY[i] = terrainY[i-1] - 0.5*Math.random() }
       else{terrainY[i] = terrainY[i-1] + 0.5*Math.random()  }    
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
    for (var i = 1; i < width; i++){
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
    
    //body of player
    ctx.beginPath();
    ctx.moveTo(tank.getpx(),terrainY[tank.getpx()]);
    for(i=0; i<=30; i++){
        if(Math.sqrt((i*i)+(terrainY[tank.getpx()+i]-terrainY[tank.getpx()])*(terrainY[tank.getpx()+i]-terrainY[tank.getpx()]))<=30.5 &&
           Math.sqrt((i*i)+(terrainY[tank.getpx()+i]-terrainY[tank.getpx()])*(terrainY[tank.getpx()+i]-terrainY[tank.getpx()]))>=29.5){
            ctx.lineTo(tank.getpx()+i,terrainY[tank.getpx()+i]);
            tank.setphi(Math.acos(i/30));
            if(terrainY[tank.getpx()+i]>terrainY[tank.getpx()]){tank.setphi(2*Math.PI-tank.getphi());}
            tank.seti(i);
            break;
        }
    }
    ctx.lineTo((tank.getpx()+tank.geti())-20*Math.sin(tank.getphi()),(terrainY[tank.getpx()+tank.geti()])-20*Math.cos(tank.getphi()));
    ctx.lineTo(tank.getpx()-20*Math.sin(tank.getphi()),terrainY[tank.getpx()]-20*Math.cos(tank.getphi()))
    ctx.closePath();
    ctx.fill();
    
    var midx1= tank.getpx()+25*Math.cos(0.927293432+tank.getphi()) //0.927293432 is the angle in a 3:4:5 Triangle
    var midy1=((terrainY[tank.getpx()]+terrainY[tank.getpx()+tank.geti()])/2)-25*Math.sin(0.927293432+tank.getphi())//-20*Math.cos(Math.PI-phi1);
    
    ctx.beginPath();
    ctx.arc(midx1,midy1, 8, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();

    //barrel 

    ctx.beginPath();
    ctx.moveTo(midx1, midy1);
    ctx.lineTo(midx1+6*Math.sin(tank.gettheta()),midy1+6*Math.cos(tank.gettheta()));
    ctx.lineTo((midx1+6*Math.sin(tank.gettheta()))+25*Math.cos(tank.gettheta()),(midy1+6*Math.cos(tank.gettheta()))-25*Math.sin(tank.gettheta()));
    ctx.lineTo(midx1+25*Math.cos(tank.gettheta()),midy1-25*Math.sin(tank.gettheta()));
    ctx.closePath();
    ctx.fill();
    tank.setnx(midx1+25*Math.cos(tank.gettheta()));
    tank.setny(midy1-25*Math.sin(tank.gettheta()));
    
}

//this function changes the angle of the barrel
function moveBarrel(currPlayer, dir){
    currPlayer.settheta((dir*0.1+currPlayer.gettheta())%(2*Math.PI));
}

//this function moves the tank left and right
function moveTank(currPlayer, dir){
    currPlayer.setpx(currPlayer.getpx()+dir);
    delta = (terrainY[currPlayer.getpx()]-terrainY[currPlayer.getpx()+currPlayer.geti()]);
    if(delta>20){
        this.px-=dir;
        console.log("too steep!");
    }

}

//this function fires the weapon
function fireAway(){
    console.log("fire!!!");
    weapon = currPlayer.getweapon();
    var t = 0;
    var x,y;
    var int1 = setInterval(function(){projectile1()}, 10);
    function projectile1(){
        x = currPlayer.getnx() + (weapons[weapon][1])*Math.cos(currPlayer.gettheta())*t;
        y = currPlayer.getny() - (weapons[weapon][1])*Math.sin(currPlayer.gettheta())*t + (0.5*(0.0000015))*(t*t);
        t+=200;
        if(y<terrainY[Math.round(x)] && x<=width && x>=0){
            redrawAll();
            circle(ctx, x, y,weapons[weapon][0],weapons[weapon][2]);
            
        }
        else if(y>terrainY[Math.round(x)] || x>width || x<0){
            if(currPlayer.getplayer()==1){
                currPlayer = tank2;
                otherPlayer = tank1;
            }
            else{
                currPlayer = tank1;
                otherPlayer = tank2; 
            }
            blowUp(x,y,weapons[weapon][0]*2,otherPlayer);
            clearInterval(int1);
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
    checkHit(x,y,radius,player);
    console.log("done with explosion");
    redrawAll();
}

//this function checks if the weapon hits the tank
function checkHit(cx,cy,radius,hitPlayer){
    console.log("checking hit");
    //check if weapon hits tank directly
    if((cx>=hitPlayer.getpx() && cx<=hitPlayer.getpx()+30 )||(cy>=hitPlayer.getpy()-20 && cy<=hitPlayer.getpy())){
        hitPlayer.setscore(hitPlayer.getscore()-25);
        console.log("Direct Hit");
    }
    //else, check if weapon lands within certain radius of the tank
    else if((cx>=hitPlayer.getpx()-radius && cx<=hitPlayer.getpx()+30+radius )||(cy>=hitPlayer.getpy()-20-radius && cy<=hitPlayer.getpx()+radius)){
        hitPlayer.setscore(hitPlayer.getscore()-10);
        console.log("Indirect Hit");
    }
    
}


function drawHealthBar(tank1,tank2){
    var score1 = tank1.getscore();
    var score2 = tank2.getscore();
    ctx.fillStyle= "black";
    ctx.font="20px Georgia";
    ctx.fillText("Player 1 Health:"+score1.toString(),40,75);
    ctx.fillText("Player 2 Health:"+score2.toString(),690,75);
    //health bar for player 1
    var my_gradient=ctx.createLinearGradient(50,0,150,0);
    my_gradient.addColorStop(0,"firebrick");
    my_gradient.addColorStop(0.75,"gold");
    my_gradient.addColorStop(1,"limegreen");
    ctx.fillStyle = "gray"
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
    ctx.fillText("It is Player "+ currPlayer.player.toString() + "'s turn!", 360, 75);
    ctx.fillText("Your current weapon is: "+ weapons[currPlayer.getweapon()][2].toString() , 320, 100);
    ctx.fillText("Angle: " + ((currPlayer.gettheta()*360/(2*Math.PI))-(currPlayer.gettheta()*360/(2*Math.PI))%1).toString(), 280, 125);
    ctx.fillText("Power: " + currPlayer.getscore().toString(), 390, 125);
    ctx.fillText("Moves: " + currPlayer.getmoves().toString(), 520, 125);
}

function createButtons(){
    buttons = [new button(20,5,100,40,"Pause", ""), new button(170,5,100,40,"Restart", ""),
                new button(630,5,100,40,"Change","Weapon"), new button(780,5,100,40,"Info and ","Rules")];
}

function drawButtons(){
    for(i = 0; i < buttons.length; i++){buttons[i].drawButton();}
}

function redrawAll(){
    ctx.restore();
    ctx.clearRect(0, 0, width, height);
    drawTerrain();
    drawButtons();
    drawTank(tank1);
    drawTank(tank2);
    if(gamePaused == true){drawPausedScreen();}
    drawGameScreen(currPlayer);
    drawHealthBar(tank1,tank2);
    drawButtons();
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