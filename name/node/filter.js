const fs = require('fs');

const filter = {
    names:[],
    run(){
        fs.readFile('name.json','utf-8',(err,data)=>{
            if(err) throw err;
            let name=JSON.parse(data);
            for (let key in name) {
                this.names.push({"key":key,"mean":name[key]})
            }
            this.showGoodName();
        });
    },
    showGoodName(){
        this.names.forEach((v,i,a)=>{
            if(v.mean.indexOf('成功')) console.log(v.key);
        });
        // fs.writeFile('nameArray.json',JSON.stringify(this.names),'utf-8',(err)=>{
        //     if(err) throw err;
        // });
    }
};

filter.run();
