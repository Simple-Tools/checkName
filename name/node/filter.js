const fs = require('fs');
const words = {
    good:[""],
    bad:[""]
};
Array.prototype.isContains = (string)=>{
    this.forEach((v)=>{
        if(string.indexOf(v)>=0) return true;
    });
    return false;
};
const filter = {
    names:[],
    run(){
        fs.readFile('name.json','utf-8',(err,data)=>{
            if(err) throw err;
            let name=JSON.parse(data);
            for (let key in name) {
                this.names.push({"key":key,"mean":name[key]})
            }
            let good = this.getGoodName();
            let bad = this.getBadName();
            this.saveNames('good.json',good);
            this.saveNames('bad.json',bad);
        });
    },
    getGoodNames(){
        this.names.filter((n)=>{
            // words.good.forEach((v,i,a)=>{
            //     if(n.mean.indexOf(v)>0) return true;
            // })
            // return false;
            return words.good.isContains(n.mean);
        });

        // this.names.forEach((v,i,a)=>{
        //     if(v.mean.indexOf('成功')) console.log(v.key);
        // });
        // fs.writeFile('nameArray.json',JSON.stringify(this.names),'utf-8',(err)=>{
        //     if(err) throw err;
        // });
    },
    getBadNames(){
        this.names.filter((n)=>{
            return words.bad.isContains(n.mean);
        });
    },
    saveNames(file,names){
        fs.write(file,JSON.stringify(names),'utf-8',(err)=>{
            if(err) throw err;
        })
    }
};

filter.run();
