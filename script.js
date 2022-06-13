let spin = document.querySelector(".spinContainer");
let dx = 0;
let dy = 0;
let modalOn = false;
let dickCatch = false;
let docWidth = document.documentElement.clientWidth;
let docHeight = document.documentElement.clientHeight;
document.getElementById("dick").ondragstart = () => false;

sizeCenter(spin,0.25,1);

function sizeCenter(elem,perFromLeft,widthToHeight) {
    docWidth = document.documentElement.clientWidth;
    docHeight = document.documentElement.clientHeight;
    let elemWidth = docWidth*(1-perFromLeft*2);
    let elemHeight = elemWidth/widthToHeight;
    elem.style.top = (docHeight-elemHeight)/2+dx+"px";
    elem.style.left = (docWidth-elemWidth)/2+dy+"px";
    if(elemHeight>docHeight){
        elemHeight = docHeight;
        elemWidth = elemHeight*widthToHeight;
        elem.style.top = 0+dx+"px";
        elem.style.left = (docWidth-elemWidth)/2+dy+"px";
    }
    if(docHeight>docWidth){
        elemWidth = docWidth;
        elemHeight = docWidth/widthToHeight;
        elem.style.top = (docHeight-elemHeight)/2+dx+"px";
        elem.style.left = 0+dy+"px";
    }
    //console.log(elem.style.top+"eh "+elemWidth+"ew "+docHeight+"dh "+docWidth+"dw")
    elem.style.width = Math.abs(elemWidth)+"px";
    elem.style.height = Math.abs(elemHeight)+"px";
}

//window.addEventListener("resize", ()=>{sizeCenter(spin,0.25,1)});

let dick = document.querySelector("#dick");
let interval = setInterval(()=>{
    dick.style.transform = "translate(-50%, -50%) rotateZ("+rotation()+"deg)";
    /*dick.style.transform = "matrix("+Math.cos(rotation())+", "+Math.sin(rotation())
    +", "+(-1)*Math.sin(rotation())+", "+Math.cos(rotation())+", -131.6, -65.6)";
    console.log(dick.style.transform)*/
},1000/60);

let initPhi = Math.PI*0
let L = 200
let dt = 1/60
let g = 5500
let t = 0
let y = 0.00005
penis = {
    phi: initPhi,
    v: 0,
    a: 0
}
function antiNum(x){
    x = +x;
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x < 0 ? 1 : -1;
}
function rotation(){
    if(dickCatch) return penis.phi;   
    penis.a = -(g/L)*Math.sin(penis.phi)
	penis.v +=  penis.a*dt+((y*Math.abs(penis.v*(180/Math.PI))*(antiNum(penis.v))))
	penis.phi += penis.v*dt
    //penis.phi=e*Math.cos(w*t+initPhi)
    t += dt
    document.getElementById("speed").innerHTML = "Speed: "+/*Math.abs*/(Math.round(penis.v));
    if(Math.abs(penis.v)>50){
        let rand = 1;
        let speed = Math.abs(Math.round(penis.v))
        if(Math.random()>0.5){
            rand = 1;
        }else rand = -1;
        dx = Math.round(speed*Math.random()*rand*0.01**(1/(speed/50)));
        dy = Math.round(speed*Math.random()*rand*0.01**(1/(speed/50)));
        sizeCenter(spin,0.25,1)
        //console.log(dx+" "+dy)
    }else {
        dx = dy = 0;
        sizeCenter(spin,0.25,1);
    }
    if(Math.abs(penis.v)>=100 && !modalOn){
        spin.dispatchEvent(new Event("win",{bubbles: true}));
    }
    return toDeg(penis.phi);
}
function toDeg(pi){
    let angle = 0;
    if(pi>=0) angle = 180-180*pi/Math.PI;
    if(pi<0) angle = -180*pi/Math.PI+180;
    if(Math.abs(angle)>360) angle = 360*(angle/360-Math.round(angle/360));
    return angle;    
}

function toRad(grad){
    if(grad>180){
        return (180-grad)*Math.PI/180;
    }else{
        return (180-grad)*Math.PI/180;
    }
}

document.addEventListener("wheel", function(e){
    if(modalOn)return
    if(e.deltaY>1){
        penis.v +=1;
    }else{
        penis.v += -1;
    }
});

document.addEventListener("win", function(){
    modalOn = true;
    let modalWin = creatModal();
    modalWin.innerHTML = "<b1></b1><p></p><input type='button' id='buttonWin'>";
    modalWin.querySelector("b1").innerHTML = "Win!"
    let buttonWin = document.getElementById("buttonWin");
    buttonWin.className = "modal button";
    buttonWin.value = "Try again";
    modalWin.querySelector("p").innerHTML = "Great! You're real dickspiner"
    buttonWin.onclick = function(){
        modalWin.remove();
        shadow.remove();
        penis.v = 0;
        penis.a = 0;
        penis.phi = 0;
        modalOn = false;
        surpriseButton();
    }
});

function creatModal(){
    let modal = document.createElement("div");
    modal.className = "modal";
    document.body.append(modal);
    return modal;
}

function createShadow(){
    let shadow = document.createElement("div");
    shadow.className = "shadowDiV";
    shadow.style.height = docHeight+"px";
    shadow.style.width = docWidth+"px";
    document.body.append(shadow);
    return shadow; 
}

function surpriseButton(){
    let buttonSize = 70;
    let button = document.createElement("div");
    button.className = "surpriseButton";
    button.innerHTML = "<p>Dont click</p>"
    document.body.append(button);
    button.style.height = button.style.width = buttonSize+"px";
    button.style.top = docHeight-70-50+"px";
    button.style.left = docWidth-70-50+"px";
    button.onclick = function(){
        let modal = creatModal();
        let shadow = createShadow();
        modal.innerHTML = "<b1>Хуй будешь?</b1><p></p>"
        but1 = document.createElement("input");
        but2 = document.createElement("input");
        modal.append(but1);
        modal.append(but2);
        but1.className = but2.className = "modal button";
        but1.type = but2.type = "button";
        but1.value = but2.value = "Да.";
        but1.onclick = but2.onclick = function(){
            modal.remove();
            shadow.remove();
            but1.remove();
            but2.remove();
            surpModal();
        }
    }
}
function surpModal(){
    let modal2 = creatModal();
    let shadow2 = createShadow();
    modal2.innerHTML = "<b1>Теперь ты пидор</b1><p></p>";
    but3 = document.createElement("input");
    modal2.append(but3);
    but3.className = "modal button";
    but3.type = "button"
    but3.value = "Пойти нахуй";
    but3.onclick = function(){
        modal2.remove();
        shadow2.remove();
        but3.remove();
    }
}

document.addEventListener("pointerdown", function(e){
    if(e.target.id != "dick") return;
    //console.log("catch")
    penis.v = 0;
    dickCatch = true;
    let x = e.pageX;
    let y = e.pageY;
    let ballsPlace = document.getElementById("balls").getBoundingClientRect();
    let centerY = ballsPlace.top+window.pageYOffset+ballsPlace.height/2;
    let centerX = ballsPlace.left+window.pageXOffset+ballsPlace.width/2;
    penis.phi = calcAngle(x,y,centerX,centerY);
    let preLastAngle = penis.phi;
    let lastAngle = penis.phi;
    let countier = setInterval(()=>{
        preLastAngle = lastAngle;
        lastAngle = penis.phi;
    },1000/60);
    document.addEventListener("pointermove", move)
    function move(e){
        //console.log("move")
        let mX = e.pageX;
        let mY = e.pageY;
        penis.phi = calcAngle(mX,mY,centerX,centerY);
    }
    function up(e){
        document.removeEventListener("pointermove", move);
        penis.initPhi = penis.phi = toRad(penis.phi);
        penis.v = ((lastAngle-preLastAngle)*3.14/180)*antiNum(lastAngle-preLastAngle)/(1/60);
        console.log(penis.v)
        dickCatch = false;
        document.removeEventListener("pointerup", up);
    }
    document.addEventListener("pointerup", up);
    
});

function calcAngle(x,y,centerX,centerY){
    let x0 = x-centerX;
    let y0 = y-centerY;
    let a = Math.atan(x0/y0)*180/3.14;
    if(a>0){
        if(y0<0){
            a=360-a;
        }else{
            a=180-a;
        }
    }else{
       if(y0<0){
        a=Math.abs(a);
       }else{
        a=Math.abs(a)+180;
       }
    }
    //console.log(a+" "+penis.phi);
    return a;
}