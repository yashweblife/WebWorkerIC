export function createCanvas(){
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.border = '1px solid black';
    document.body.appendChild(canvas);
    return {canvas: canvas, c:canvas.getContext('2d')}
}