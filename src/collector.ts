import { Button, Canvas, Mouse, Vector } from "./lib";

let points:Vector[] = []
const canvas = new Canvas();
const mouse = new Mouse();
const clearCanvasButton = new Button("Clear Canvas");
clearCanvasButton.addEvent("click",()=>{
    canvas.fill();
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
    const {data} = canvas.getImage();
    const newImageData = [];
    const bw = new Vector(0,0);
    for(let i=0;i<data.length;i+=4){
        const avg = (data[i]+data[i+1]+data[i+2])/3;
        if(avg<120){
            newImageData.push(0);
            bw.x+=1;
        }else{
            newImageData.push(1);
            bw.y+=1;
        }
    }
    let minXY = new Vector(100000000,100000000);
    let maxXY = new Vector(0,0);
    let longestLine = 0;
    for(let i=0;i<newImageData.length;i++){
        if(newImageData[i]===0){
            const x = i%canvas.size.x;
            const y = Math.floor(i/canvas.size.x);
            if(x<minXY.x){
                minXY.x = x;
            }
            if(y<minXY.y){
                minXY.y = y;
            }
            if(x>maxXY.x){
                maxXY.x = x;
            }
            if(y>maxXY.y){
                maxXY.y = y;
            }
            let tester1 = false;
            let j=0;
            while(!tester1){
                if(newImageData[i+j] && newImageData[i+j] === 1){
                    tester1 = true;
                }else{
                    j+=1;
                }
            }
            if(j>longestLine){
                longestLine = j;
            }
        }
    }
    canvas.rect(minXY,maxXY, "red");
    console.log(maxXY.x-minXY.x, maxXY.y-minXY.y,longestLine,bw)
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
document.body.addEventListener("mousedown",()=>{
    mouse.clicked = true;
})
document.addEventListener("mouseup",()=>{
    for(let i=0;i<points.length-1;i++){
        canvas.line(points[i],points[i+1]);
    } 
    mouse.clicked = false;
})