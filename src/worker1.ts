onmessage = (e:MessageEvent)=>{
    console.log("HELLO")
    // const data = e.data;
    // console.log(data);
    // const output = []
    // for(let i=0;i<data.length;i+=4){
    //     const avg = (data[i]+data[i+1]+data[i+2])/3;
    //     if(avg<128){
    //         output.push(1);
    //     }else{
    //         output.push(0);
    //     }
    // }
    self.postMessage("output");
}