export class Vector{
    constructor(public x:number = 0, public y:number = 0, public z:number = 0){}
}

export class VectorMath{
    constructor(){}
    public static add(v1:Vector, v2:Vector){
        const output= new Vector();
        output.x = v1.x + v2.x;
        output.y = v1.y + v2.y;
        output.z = v1.z + v2.z;
        return output;
    }
    public distance(v1:Vector, v2:Vector){
        let output = 0;
        output += Math.pow(v1.x - v2.x, 2);
        output += Math.pow(v1.y - v2.y, 2);
        output += Math.pow(v1.z - v2.z, 2);
        return Math.sqrt(output);
    }
    public static magnitude(v:Vector){
        let output = 0;
        output += Math.pow(v.x, 2);
        output += Math.pow(v.y, 2);
        output += Math.pow(v.z, 2);
        return Math.sqrt(output);
    }
}