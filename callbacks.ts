const takeFunc = (cb:Function)=>{
    cb() // callback function
};
takeFunc(()=>console.log('hello'))