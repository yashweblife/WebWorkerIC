import { Vector } from "../Vector/Vector";

// 1 Dimensional Matrix
export class Matrix {
    public components: Float32Array;
    constructor(size: number = 3) {
        this.components = new Float32Array(size);
    }
    public set(index: number, value: number) {
        this.components[index] = value;
    }
    public add(a: Matrix) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] += a.components[i];
        }
        return (this);
    }
    public sub(a: Matrix) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] -= a.components[i];
        }
        return (this);
    }
    public mult(a: Matrix) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] *= a.components[i];
        }
        return (this);
    }
    public div(a: Matrix) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] /= a.components[i];
        }
        return (this);
    }
    public magnitude() {
        let sum = 0;
        for (let i = 0; i < this.components.length; i++) {
            sum += this.components[i] ** 2;
        }
        return (Math.sqrt(sum));
    }
    public normalize(scale: number = 1) {
        const mag = this.magnitude();
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] *= scale / mag;
        }
        return (this);
    }
}

// 2 Dimensional Matrix
export class Matrix2D {
    public components: Float32Array;
    constructor(public size: Vector = new Vector(3, 3)) {
        this.components = new Float32Array(size.x * size.y);
    }
    public get(x: number, y: number) {
        return (this.components[y * this.size.x + x]);
    }
    public set(x: number, y: number, value: number) {
        this.components[y * this.size.x + x] = value;
    }
    public getSection(start_x: number, start_y: number, end_x: number, end_y: number) {
        const newMatrix = new Matrix2D(new Vector(end_x - start_x, end_y - start_y));
        for (let i = start_x; i < end_x; i++) {
            for (let j = start_y; j < end_y; j++) {
                newMatrix.set(i - start_x, j - start_y, this.get(i, j));
            }
        }
        return (newMatrix);
    }
    public static random(size_x: number, size_y: number) {
        const newMatrix = new Matrix2D(new Vector(size_x, size_y));
        for (let i = 0; i < size_x; i++) {
            for (let j = 0; j < size_y; j++) {
                newMatrix.set(i, j, Math.random());
            }
        }
        return (newMatrix);
    }
    public print() {
        let output = "\n";
        for (let i = 0; i < this.size.x; i++) {
            output += "|\t"
            for (let j = 0; j < this.size.y; j++) {
                output += this.get(i, j) + "\t\t\t\t";
            }
            output += "\t|\n";
        }
        console.log(output+"\n");
    }
}

// 2D matrix of Vectors
export class Matrix2DVector {
    public components:Vector[][] = [];
    constructor(public size: Vector = new Vector(3, 3)) {
        for (let i = 0; i < size.x; i++) {
            this.components.push([]);
            for (let j = 0; j < size.y; j++) {
                this.components[i].push(new Vector());
            }
        }
    }
    set(x: number, y: number, value: Vector) {
        this.components[x][y] = value;
    }
    get(x: number, y: number) {
        return (this.components[x][y]);
    }
    public getSection(start_x: number, start_y: number, end_x: number, end_y: number) {
        const newMatrix = new Matrix2DVector(new Vector(end_x - start_x, end_y - start_y));
        for (let i = start_x; i < end_x; i++) {
            for (let j = start_y; j < end_y; j++) {
                newMatrix.set(i - start_x, j - start_y, this.get(i, j));
            }
        }
        return (newMatrix);
    }
    public static random(size_x: number, size_y: number) {
        const newMatrix = new Matrix2DVector(new Vector(size_x, size_y));
        for (let i = 0; i < size_x; i++) {
            for (let j = 0; j < size_y; j++) {
                newMatrix.set(i, j, new Vector(Math.random(), Math.random()));
            }
        }
        return (newMatrix);
    }
}