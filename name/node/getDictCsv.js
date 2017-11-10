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
download.run(7065);
//download.jsonToCsv(7065);