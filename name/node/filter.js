const fs = require('fs');
const words = {
    good:["巧","智","成","功","全","隆","吉","聪","荣","贵","美","好","幸","福","祥","睦","旺","双","才","名","利","良","盛","祥","兴","寿"],
    bad:["克","艰","难","苦","伤","劳","忧","病","弱","灾","厄","破","亡","困","败","欠","祸","短","烦","疾","忌","薄","怕","孤","沉","无"]
};
Array.prototype.isContains = function(string){
    return this.some((v)=>{
      if(string.indexOf(v)>=0) return true;
    });
    return false;
};
const filter = {
    names:[],
    dict:{},
    run(){
        fs.readFile('newDict.json','utf-8',(err,data)=>{
            if(err) throw err;
            this.dict = JSON.parse(data);
            this.generate();
        });
    },
    generate(){
        fs.readFile('name.json','utf-8',(err,data)=>{
            if(err) throw err;
            let name=JSON.parse(data);
            for (let key in name) {
                this.names.push({"key":key,"mean":name[key]})
            }
            let good = this.getNames();
            this.saveNames('good.html',good);
        });
    },
    getNames(){
        let cGood = this.names.filter((n)=>{
            return words.good.isContains(n.mean);
        });
        return cGood.filter((n)=>{
            return !words.bad.isContains(n.mean);
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
        //console.log()
        let lines = "";
        names.forEach((v)=>{
            if(this.dict[v.key])
            lines+="<a href='http://hanyu.baidu.com/s?wd="+v.key+"&ptype=char'>"+v.key+"</a> : "+this.dict[v.key].py+"，"+this.dict[v.key].wx+"，"+this.dict[v.key].jx+" "+v.mean+"\r\n<br>";
            else lines+="<a href='http://hanyu.baidu.com/s?wd="+v.key+"&ptype=char'>"+v.key+"</a> : "+v.mean+"\r\n<br>";
        });
        let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>起名好字</title>
        </head>
        <body>
            ${lines}
        </body>
        </html>`
        fs.writeFile(fileName,/*JSON.stringify(names)*/html,'utf-8',(err)=>{
            if(err) throw err;
        })
    }
};

filter.run();
