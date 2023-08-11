import { Vector } from "../Vector/Vector";

export class Canvas{
    public dom = document.createElement('canvas');
    public ctx = this.dom.getContext('2d')!;
    constructor(public size:Vector = new Vector(300,300), parent:HTMLElement=document.body){
        this.dom.width = size.x;
        this.dom.height = size.y;
        parent.appendChild(this.dom);
        this.fill();
    }
    public getImage(){
        return this.ctx.getImageData(0,0,this.size.x,this.size.y);
    }
    public line(start:Vector, end:Vector){
        this.ctx.beginPath();
        this.ctx.moveTo(start.x,start.y);
        this.ctx.lineTo(end.x,end.y);
        this.ctx.stroke();
    }
    public rect(start:Vector, end:Vector, color:string="black"){
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.rect(start.x,start.y,end.x-start.x,end.y-start.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    public clear(){
        this.ctx.clearRect(0,0,this.size.x,this.size.y);
    }
    public fill(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,this.size.x,this.size.y);
    }
    public drawImage(img:CanvasImageSource){
        this.ctx.drawImage(img,0,0, this.size.x, this.size.y);
    }
    public arc(pos:Vector, size:number=10, color:string="black"){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(pos.x,pos.y,size,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    public addEvent(type:string, callback:any){
        this.dom.addEventListener(type,callback);
    }
}