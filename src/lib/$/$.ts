export class $ {
    private dom: HTMLElement;
    constructor(tag: string = "div") {
        this.dom = document.createElement(tag);
    }
    public get(): HTMLElement {
        return (this.dom);
    }
    public setText(text: string) {
        this.dom.innerText = text;
        return (this);
    }
    public setEvent(type: string, callback: any) {
        this.dom.addEventListener(type, callback);
    }
    public addChild(child: $) {
        this.dom.append(child.get());
    }
    public remove() {
        this.dom.remove();
    }
}