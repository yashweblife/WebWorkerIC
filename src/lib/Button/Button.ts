export class Button{
    public dom = document.createElement('button');
    constructor(public text:string="", parent:HTMLElement=document.body){
        this.dom.innerText = text;
        parent.appendChild(this.dom);
    }
    public addEvent(type:string, callback:any){
        this.dom.addEventListener(type,callback);
    }
}