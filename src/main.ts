import { Button, Canvas, Mouse, Vector } from "./lib";

let points:Vector[] = []
const canvas = new Canvas();
const mouse = new Mouse();
const clearCanvasButton = new Button("Clear Canvas");
clearCanvasButton.addEvent("click",()=>{
    canvas.clear();
})
const submitButton = new Button("Hello");
submitButton.addEvent("click",()=>{
    const newCanvas = new Canvas(new Vector(100,100));
    newCanvas.dom.style.border = "1px solid black";
    newCanvas.drawImage(canvas.dom);
    newCanvas.addEvent("click",()=>{
        canvas.drawImage(newCanvas.dom);
    })
    newCanvas.addEvent("dblclick",()=>{
        newCanvas.dom.remove();
    })
})
canvas.addEvent("mousemove",(e:MouseEvent)=>{
    mouse.pos.x = e.clientX;
    mouse.pos.y = e.clientY;
    if(mouse.clicked){
        points.push(new Vector(mouse.pos.x,mouse.pos.y));
        canvas.arc(mouse.pos,3,"black");
    }else{
        points = [];
    }
})
document.body.addEventListener("mousedown",(e:MouseEvent)=>{
    mouse.clicked = true;
})
document.addEventListener("mouseup",(e:MouseEvent)=>{
    for(let i=0;i<points.length-1;i++){
        canvas.line(points[i],points[i+1]);
    } 
    mouse.clicked = false;
})