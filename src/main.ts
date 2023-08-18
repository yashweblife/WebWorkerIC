//A simple neural network to approximate the sin function

const test = [];
for(let i=-Math.PI;i<Math.PI;i+=0.1){
    test.push(Math.sin(i))
}
const test1 = [[
    0,0,0,0,0,0,
    0,0,0,1,0,0,
    0,0,0,1,0,0,
    0,0,0,1,0,0,
    0,0,0,1,0,0,
    0,0,0,1,0,0,
],
[
    0,0,0,0,0,0,
    1,0,0,0,0,0,
    1,0,0,0,0,0,
    1,0,0,0,0,0,
    1,0,0,0,0,0,
    1,0,0,0,0,0,
],
[
    0,0,0,0,0,0,
    0,0,0,0,0,1,
    0,0,0,0,0,1,
    0,0,0,0,0,1,
    0,0,0,0,0,1,
    0,0,0,0,0,1,
]
]


class Matrix2D{
    public components:number[][]=[]
    constructor(public size=[3,3]){
        for(let i=0;i<size[0];i++){
            this.components.push([])
            for(let j=0;j<size[1];j++){
                this.components[i].push(0)
            }
        }
    }
    public set(val:number[][]){
        this.components=[...val];
    }
    public transpose(){
        const newMat = new Matrix2D([this.size[1],this.size[0]]);
        for(let i=0;i<this.size[0];i++){
            for(let j=0;j<this.size[1];j++){
                newMat.components[j][i]=this.components[i][j];
            }
        }
        return newMat;
    }
    public addVector(val:number[]){
        if(val.length!==this.size[1]){
            throw new Error("Matrix size mismatch")
        }
        const newMat = new Matrix2D([this.size[0],this.size[1]]);
        for(let i=0;i<this.size[0];i++){
            for(let j=0;j<this.size[1];j++){
                newMat.components[i][j]=this.components[i][j]+val[i];
            }
        }
        return newMat;
    }
    public dot(val:Matrix2D){
        
        if(this.size[1]!=val.size[0]){
            throw new Error("Matrix size mismatch")
        }
        const newMat = new Matrix2D([this.size[0],val.size[1]]);
        for(let i=0;i<this.size[0];i++){
            for(let j=0;j<val.size[1];j++){
                let sum = 0;
                for(let k=0;k<this.size[1];k++){
                    sum+=this.components[i][k]*val.components[k][j];
                }
                newMat.components[i][j]=sum;
            }
        }
        return newMat;
    }
    public static random(r:number,c:number){
        const newMat = new Matrix2D([r,c]);
        for(let i=0;i<r;i++){
            for(let j=0;j<c;j++){
                newMat.components[i][j]= 0.1 * (Math.random()-0.5)*2;
            }
        }
        return newMat;
    }
    public static zeros(r:number,c:number){
        const newMat = new Matrix2D([r,c]);
        for(let i=0;i<r;i++){
            for(let j=0;j<c;j++){
                newMat.components[i][j]=0;
            }
        }
        return newMat;
    }
    public static maximum(val:number, mat:Matrix2D){
        const newMat = new Matrix2D(mat.size);
        for(let i=0;i<mat.size[0];i++){
            for(let j=0;j<mat.size[1];j++){
                newMat.components[i][j]=Math.max(val,mat.components[i][j]);
            }
        }
        return newMat;
    }
    public static f(val:Matrix2D, func:(x:number)=>number){
        const newMat = new Matrix2D(val.size);
        for(let i=0;i<val.size[0];i++){
            for(let j=0;j<val.size[1];j++){
                newMat.components[i][j]=func(val.components[i][j]);
            }
        }
        return newMat;
    }

}

class RELU{
    public output:Matrix2D|null=null;
    public forward(inputs:Matrix2D){
        this.output = Matrix2D.f(inputs, (x)=>Math.max(0,x));
    }
}

class SIGMA{
    public output:Matrix2D|null=null;
    public forward(inputs:Matrix2D){
        this.output = Matrix2D.f(inputs,(x)=>1/(1+Math.exp(-x)));
    }
}


class Layer{
    public weights:Matrix2D;
    public bias:Matrix2D;
    public output:Matrix2D|null=null;
    constructor(inputs_size:number, n_neurons:number){
        this.weights = Matrix2D.random(inputs_size,n_neurons);
        this.bias = Matrix2D.zeros(1,n_neurons);
    }
    public forward(inputs:Matrix2D){
        this.output = inputs.dot(this.weights).addVector(this.bias.components[0]);
    }
}

function makeRandArr(size:number=10){
    const arr = [];
    for(let i=0;i<size;i++){
        arr.push((Math.random()-0.5)*2);
    }
    return arr;
}

const inp = new Matrix2D([2,36]);
inp.set(test1);

const l = new Layer(36, 5);
l.forward(inp);
const activation = new SIGMA();
activation.forward(l.output!);

const l1 = new Layer(5, 36);
l1.forward(activation.output!);
const activation1 = new SIGMA();
activation1.forward(l1.output!);
console.log(activation1.output!.components)


