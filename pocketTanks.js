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
var p1x = 40;
var p2x= 820;
var p1y,p2y, nx1, ny1, nx2, ny2, phi1, phi, j, k;
var theta1 = Math.PI/4; // initial angle
var theta2 = Math.PI/4;
var terrainY = new Array();
var weapons = new Array([5,0.03]);
console.log(weapons);
var currPlayer = 1;
createTerrain();
drawTerrain();
createTanks();
drawTanks();
theta1+=phi;
theta2+=phi1;
redrawAll();

//this function changes info about the tank through pressed keys
function onKeyDown(event) {
    ctx.restore();
    ctx.clearRect(0, 0, width, height);
    drawTerrain();
    console.log(event.keyCode); 
    if (event.keyCode == 38){
        moveNozzel(currPlayer,-1);  //up should change nozzel
    }
    else if(event.keyCode == 39){
        moveTank(currPlayer, 5);    //move tanks to the right
    }
    else if(event.keyCode == 40){
        moveNozzel(currPlayer,1);       //down should move nozzel
    }
    else if(event.keyCode ==37){
        moveTank(currPlayer, -5);    //move tanks to the left
    }
    else if(event.keyCode == 32){   //spacebar shoots!!
        console.log(currPlayer);        // notFired = false;
        fireAway(currPlayer);
    }
    redrawAll();
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
    my_gradient.addColorStop(0,"lightgreen");
    my_gradient.addColorStop(0.5,"darkgreen");
    my_gradient.addColorStop(1,"black");
    ctx.fillStyle=my_gradient;
    for (var i = 1; i < width; i++){
        ctx.fillRect(i,terrainY[i],5,height-terrainY[i]);
    }
}

//this function creates starting info about the tanks
function createTanks(){
    p1y = terrainY[p1x]-20;
    p2y = terrainY[p2x]-20;
}

//this function draws the tanks
function drawTanks(){
    p1y = terrainY[p1x]-20;
    p2y = terrainY[p2x]-20;   
    ctx.fillStyle = "gray";
    //body of player 1
   ctx.beginPath();
    ctx.moveTo(p1x,terrainY[p1x]);
    for(i=0; i<=30; i++){
        if(Math.sqrt((i*i)+(terrainY[p1x+i]-terrainY[p1x])*(terrainY[p1x+i]-terrainY[p1x]))<=30.5 &&
           Math.sqrt((i*i)+(terrainY[p1x+i]-terrainY[p1x])*(terrainY[p1x+i]-terrainY[p1x]))>=29.5){
            ctx.lineTo(p1x+i,terrainY[p1x+i]);
            phi1 = Math.acos(i/30);
            console.log(phi1);
            if(terrainY[p1x+i]>terrainY[p1x]){phi1=2*Math.PI-phi1;}
            j = i;
            break;
        }
    }
    ctx.lineTo((p1x+j)-20*Math.sin(phi1),(terrainY[p1x+j])-20*Math.cos(phi1));
    ctx.lineTo(p1x-20*Math.sin(phi1),terrainY[p1x]-20*Math.cos(phi1))
    ctx.closePath();
    ctx.fill();

    var midx1= p1x+15*Math.cos(phi1) - 15*Math.sin(phi1);
    var midy1 =((terrainY[p1x]+terrainY[p1x+j])/2)-20*Math.sin(phi1)-20*Math.cos(phi1);
    
    ctx.beginPath();
    ctx.arc(midx1,midy1, 8, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    //body player 2
    ctx.beginPath();
    ctx.moveTo(p2x,terrainY[p2x]);
    for(i=0; i<=30; i++){
        if(Math.sqrt((i*i)+(terrainY[p2x+i]-terrainY[p2x])*(terrainY[p2x+i]-terrainY[p2x]))<=30.5 &&
           Math.sqrt((i*i)+(terrainY[p2x+i]-terrainY[p2x])*(terrainY[p2x+i]-terrainY[p2x]))>=29.5){
            console.log(Math.sqrt((i*i)+(terrainY[p2x+i]-terrainY[p2x])*(terrainY[p2x+i]-terrainY[p2x])));
            ctx.lineTo(p2x+i,terrainY[p2x+i]);
            phi = 2*Math.PI-Math.acos(i/30);
            if(terrainY[p2x+i]<terrainY[p2x]){phi=2*Math.PI-phi;}
            k = i;
            break;
        }
    }
    ctx.lineTo((p2x+k)-20*Math.sin(phi),(terrainY[p2x+k])-20*Math.cos(phi));
    ctx.lineTo(p2x-20*Math.sin(phi),terrainY[p2x]-20*Math.cos(phi))
    ctx.closePath();
    ctx.fill();
      
    var midx2= p2x+15*Math.cos(phi) - 15*Math.sin(phi);
    var midy2 =((terrainY[p2x]+terrainY[p2x+k])/2)-30*Math.sin(phi)-30*Math.cos(phi);
    
    ctx.beginPath();
    ctx.arc(midx2,midy2, 8, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    

    //barrel one

    ctx.beginPath();
    ctx.moveTo(midx1, midy1);
    ctx.lineTo(midx1+6*Math.sin(theta1),midy1+6*Math.cos(theta1));
    ctx.lineTo((midx1+6*Math.sin(theta1))+25*Math.cos(theta1),(midy1+6*Math.cos(theta1))-25*Math.sin(theta1));
    ctx.lineTo(midx1+25*Math.cos(theta1),midy1-25*Math.sin(theta1));
    ctx.closePath();
    ctx.fill();
    nx1 = midx1+25*Math.cos(theta1);
    ny1 = midy1-25*Math.sin(theta1);
    
    //barrel two
    ctx.beginPath();
    ctx.moveTo(midx2,midy2);
    ctx.lineTo(midx2-6*Math.sin(theta2),midy2+6*Math.cos(theta2));
    ctx.lineTo((midx2-6*Math.sin(theta2))-25*Math.cos(theta2),(midy2+6*Math.cos(theta2))-25*Math.sin(theta2));
    ctx.lineTo(midx2-25*Math.cos(theta2),midy2-25*Math.sin(theta2));
    ctx.closePath();
    ctx.fill();
    nx2 = midx2-25*Math.cos(theta2);
    ny2 = midy2-25*Math.sin(theta2);
    
}

//this function changes the angle of the barrel
function moveNozzel(player, dir){
    if(player ==1){theta1 += dir*0.1}
    else{theta2+=dir*0.1}
}

//this function moves the tank left and right
function moveTank(player, dir){
    if(player == 1){
        p1x+=dir;
        delta = (terrainY[p1x]-terrainY[p1x+j]);
        if(delta>20){
            p1x-=dir;
            console.log("too steep!");
        }
    }
    else{
        p2x+=dir;
        delta = Math.abs(terrainY[p2x]-terrainY[p2x+k]);
        if(delta>20){p2x-=dir}
    }
}

//this function fires the weapon
function fireAway(player, weapon){
    console.log("fire!!!");
    var t = 0;
    var x,y;
    if(player ==1) {
        var int1 = setInterval(function(){projectile1()}, 10);
        function projectile1(){
            x = nx1 + (0.03)*Math.cos(theta1)*t;
            y = ny1 - (0.04)*Math.sin(theta1)*t + (0.5*(0.0000015))*(t*t);
            t+=200;
            if(y<terrainY[Math.round(x)]){
                redrawAll();
                circle(ctx, x, y, 5);
            }
            else if(y>terrainY[Math.round(x)]){
                currPlayer = 2;
                blowUp(x,y,20);
                clearInterval(int1);  
            }
        }
    }
    else{
        int2 = setInterval(function(){projectile2()}, 10);
        function projectile2(){
            x = (nx2) - (0.03)*Math.cos(theta2)*t;
            y = ny2 - (0.035)*Math.sin(theta2)*t + (0.5*(0.0000015))*(t*t);
            t+=200;
            if(y<terrainY[Math.round(x)]){
                redrawAll();
                circle(ctx, x, y, 5);
            }
            else if(y>=terrainY[Math.round(x)]){
                currPlayer = 1;
                blowUp(x,y,20);
                clearInterval(int2);
            }
    }
    
    }
    
}

//this function takes out a chunk of the terrain where the weapon lands
function blowUp(x,y,radius){
    x = Math.round(x);
    y = Math.round(y);
    for(i=x-radius;i<x+radius; i++){
        terrainY[i]=Math.max(y+Math.sqrt((radius*radius)-(x-i)*(x-i)),terrainY[i]);
    }
    console.log("done with explosion");
    redrawAll();
}

function redrawAll(){
    ctx.restore();
    ctx.clearRect(0, 0, width, height);
    drawTerrain();
    drawTanks();
}

function circle(ctx, cx, cy, radius) {      //this function has been taken from 15-237 course notes, taught by Kosbie
    redrawAll();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
}

ctx.beginPath();
canvas.addEventListener('keydown', onKeyDown, false);
// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();