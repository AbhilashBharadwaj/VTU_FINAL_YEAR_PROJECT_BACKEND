module.exports.fact = (num)=>{
    if(num==1 || num==0)
        return 1
    return num * this.fact(num-1)
} 