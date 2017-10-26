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
            this.saveNames('../good.html',good);
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
            let info = "";
            if(this.dict[v.key]){
                info= `<span class="py">${this.dict[v.key].py}</span>
                    <span class="wx">${this.dict[v.key].wx}</span>
                    <span class="jx">${this.dict[v.key].jx}</span>`
            }
            lines+= `
                <div id="${v.key}" class="w"> 
                  <a href="http://hanyu.baidu.com/s?wd=${v.key}&ptype=zici">${v.key}</a>
                  ${info}
                  <span class="addBtn">备选</span>
                  <br><span class="mean">${v.mean}</span>
                </div>
            `;
        });
        let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="name.css">
            <title>起名好字</title>
        </head>
        <body>
            <div class="menu">
                <span id="toggleSlectedBtn">显示已选字</span> 
                <form id="searchForm"> 
                    <input name="search" id="search"/>
                </form>
            </div>
            <div class="nameList">
            ${lines}
            </div>
            <script src="name.js"></script>
            <script src="good.js"></script>
        </body>
        </html>`
        fs.writeFile(fileName,/*JSON.stringify(names)*/html,'utf-8',(err)=>{
            if(err) throw err;
        })
    }
};

filter.run();
