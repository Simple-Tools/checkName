//http://wuxing.bm8.com.cn/wap_wuxing/7055.html
//http://m.xingming.com/zidian/hz7065.html
//https://wenku.baidu.com/view/c0b7fe8502d276a200292e8d.html
const fs = require('fs');
const http = require('http');
const baseUrl = "http://m.xingming.com/zidian/hz";
let wordArray = [];
const count = {items:0,downloadItems:0};

const download = {
    getWord(i){
        let url = baseUrl+i+".html";
        return new Promise((resolve,reject)=>{
            let html;
            http.get(url,(res)=>{
                res.on('data',  data=> {
                   html+=data;
                });
                res.on('end', ()=> {
                    console.log(`downloaded id:${i}`);
                    let key = html.match(/(.+)字的拼音/)[1];
                    let py = html.match(/拼音：([^<]*)/)[1];
                    let ft = html.match(/繁体字：([^<]*)/)[1].substr(0,1);
                    let bh = html.match(/笔画数：([^<]*)/)[1];
                    let wx = html.match(/属什么：([^<]*)/)[1];
                    let xs = html.match(/姓氏：([^<]*)/)[1];
                    let wordObj = {id:i,key,py,ft,bh,wx,xs};
                    wordArray.push(wordObj);
                    count.downloadItems++;
                    this.checkSave();
                    resolve(wordObj);
                }).on('error', (e) => {
                    this.save();
                    //reject(e.message);
                });
            });
        });
    },
    checkSave(){
        //console.log(count.downloadItems);
        if(count.downloadItems==count.items || count.downloadItems%100==0 ) this.save();
    },
    save(){
        console.log(`save items:${count.downloadItems}`)
        fs.writeFile("dictNew.json","\r"+JSON.stringify(wordArray),'utf-8',(err)=>{
            if(err) throw err;
        });
        this.jsonToCsv();
    },
    jsonToCsv(){
        //loadJson();
        let csv = "序号\t简体\t拼音\t繁体\t笔画\t五行\t姓氏\n";
        for(let i =1;i<count.items+1;i++){
            let w = wordArray.find(v=>v.id==i);
            if(w)
            csv+= `${w.id}\t${w.key}\t${w.py}\t${w.ft}\t${w.bh}\t${w.wx}\t${w.xs}\n`;
        }
        fs.writeFile("dictNew.csv",csv,'utf-8',e=>{
            if(e) throw e;
        });
    },
    async runSync(){
        for(let i =1;i<items;i++){
            await this.getWord(i);
        }
        //this.save();
    },
    loadJson(){
        let data = fs.readFileSync("dictNew.json","utf-8");
        wordArray = JSON.parse(data);
        count.downloadItems = wordArray.length;
    },
    addBhToDict(){
        this.loadJson();
        fs.readFile("newDict.json","utf-8",(err,data)=>{
            let wordObjs = JSON.parse(data);
            for(let i in wordObjs){
                let w = wordArray.find(v=>v.key==i);
                if(w){
                    wordObjs[i] = {...wordObjs[i],"bh":w.bh}
                }
            }
            fs.writeFile("newDict.json",JSON.stringify(wordObjs),(err)=>{
                if(err) throw err;
            })
        });
    },
    generateBhHtml(){
        let first = [ 1, 2, 4, 7, 9, 10, 11, 17, 18, 19, 21, 23, 25, 27 ];
        let second = [ 2, 4, 6, 7, 10, 12, 14, 15, 17, 20, 22, 23, 24, 30 ];
        this.loadJson();
        let sorted = wordArray.sort((a,b)=>{return a.bh -b.bh});
        let classed = {};
        for(let w of sorted){
            if(!classed[w.bh]) classed[w.bh]={"水":[],"木":[],"金":[],"火":[],"土":[]};
            if(!classed[w.bh][w.wx]) classed[w.bh][w.wx] = [];
            classed[w.bh][w.wx].push(w.key); 
        }
        let lines = "";
        for(let i in classed){
            let mark = "";
            if(first.indexOf(i-0)>-1) mark+=" first";
            if(second.indexOf(i-0)>-1) mark+=" second";
            lines+=`<div id="${i}" class="w classed${mark}">笔画数为：${i}<br>`;
            for(let k in classed[i]){
                lines+=`
                <p>${k}: `
                for(let w of classed[i][k]){
                    lines+= `
                    <a href="http://hanyu.baidu.com/s?wd=${w}&ptype=zici">${w}</a> `;
                } 
                lines += `
                </p> `;
            }
            lines+=`
            </div>
            `
        }
        let html = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="name.css">
            <title>五行笔画</title>
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
            <script src="good.js"></script>
        </body>
        </html>`;
        fs.writeFile("../allClassed.html",html,'utf-8',(err)=>{
            if(err) throw err;
        })
        //console.log(classed);
    },
    run(num){
        count.items = num; 
        this.loadJson();
        for(let i =1,j=1;i<count.items+1;i++){
            if(wordArray.find(v=>v.id==i)) continue;
            j++;
            setTimeout(()=>{
                this.getWord(i);
            },(300)*j);  
        }
        this.jsonToCsv();
    }
};

//download.runSync();
// download.run(7065);
download.generateBhHtml();
//download.jsonToCsv(7065);