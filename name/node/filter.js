const fs = require('fs');
const words = {
    good:["巧","智","成功","隆","吉","聪","荣","贵","美","好","幸","福","祥","睦","旺","双"],
    bad:["克","艰","难","苦","伤","劳","忧","病","弱","灾","厄","破","亡","困","败","欠","祸","短","烦","疾"]
};
Array.prototype.isContains = function(string){
    return this.some((v)=>{
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
            let good = this.getGoodNames();
            let bad = this.getBadNames();
            this.saveNames('good.json',good);
            this.saveNames('bad.json',bad);
        });
    },
    getGoodNames(){
        return this.names.filter((n)=>{
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
        return this.names.filter((n)=>{
            return words.bad.isContains(n.mean);
        });
    },
    saveNames(fileName,names){
        fs.writeFile(fileName,JSON.stringify(names),'utf-8',(err)=>{
            if(err) throw err;
        })
    }
};

filter.run();
