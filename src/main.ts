import { createCanvas } from './helpers';
import Worker from "./worker1.ts?worker";
const {canvas, c} = createCanvas();
const w1 = new Worker();
const col = [];

const holder = document.createElement('div');
document.body.appendChild(holder);

const submitButton = document.createElement('button');
submitButton.innerText = 'Submit';
document.body.appendChild(submitButton);
submitButton.addEventListener('click', () => {
  if(c){
    const newCanvas = document.createElement('canvas');
    newCanvas.width = 100;
    newCanvas.height = 100;
    newCanvas.style.border = '1px solid black';
    const newC = newCanvas.getContext('2d');
    if(newC){
      newC.drawImage(canvas,0,0,100,100);
      holder.appendChild(newCanvas);
      col.push(newCanvas);
    }
    c.clearRect(0,0,300,300);
  }
})

const trainButton = document.createElement('button');
trainButton.innerText = 'Train';
document.body.appendChild(trainButton);
trainButton.addEventListener('click', () => {
  w1.postMessage(c?.getImageData(0,0,300,300));
})

w1.onmessage = (e:MessageEvent)=>{
  console.log(11);
}

const mouse = {
  pos:{
    x:0,
    y:0
  },
  clicked:false
}
canvas.addEventListener("mousemove",(e:MouseEvent)=>{
  mouse.pos.x = e.clientX;
  mouse.pos.y = e.clientY;
  if(mouse.clicked){
    if(c){
      c.beginPath();
      c.arc(mouse.pos.x,mouse.pos.y,3,0,Math.PI*2,false);
      c.fill();
      c.closePath()
    }
  }
});
canvas.addEventListener("mousedown",()=>{
  mouse.clicked = true;
});
canvas.addEventListener("mouseup",()=>{
  mouse.clicked = false;
});
