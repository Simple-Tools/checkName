//http://wuxing.bm8.com.cn/wap_wuxing/7055.html
//https://wenku.baidu.com/view/c0b7fe8502d276a200292e8d.html
const fs = require('fs');
const http = require('http');
const iconv = require('iconv-lite'); 
const cheerio = require('cheerio');

const baseUrl = "http://wuxing.bm8.com.cn/wap_wuxing/";
const wordDict = {};
const wordArray = [];
const count = {items:0,downloadItems:0};

const download = {
    getWord(i){
        let url = baseUrl+i+".html";
        return new Promise((resolve,reject)=>{
            http.get(url,(res)=>{
                let buffers = [];
                let bufferLength = 0;
                res.on('data',  (chunk)=> {
                    buffers.push(chunk);
                    bufferLength += chunk.length;
                });
                res.on('end', ()=> {
                    console.log(`downloaded id:${i}`);
                    let data = Buffer.concat(buffers,bufferLength)
                    let html = iconv.decode(data,'GBK')
                    let word = html.match(/<h2>(.)/)[1];
                    let content = html.match(/<ul class=\"list-group\">([\s\S]*?)<\/ul>/)[1].replace(/<[^>]*>/gi,"").replace(/[\r\n]/g,"-").replace(/[\s ]/g,'');
                    content = content.replace("--------(adsbygoogle=window.adsbygoogle||[]).push({});","");
                    content = content.replace(/;/g,"；").replace(/:/g,"：").replace(/------/g,";").replace(/--/g,":").replace(/::/g,"");
                    wordDict[word]=content;
                    let wordObj = {id:i,key:word,content};
                    wordArray.push(wordObj);
                    count.downloadItems++;
                    this.checkSave();
                    resolve(content);
                    //console.log(wordDict);
                    /*
                    let $ = cheerio.load(html, {decodeEntities: false});
                    let word = $('h2').text().substr(0,1);
                    let info = $(".list-group-item").text().trim().replace('\n','');
                    console.log(word+" "+info);
                    */
                    //html = iconv.decode(html, 'gb2312');
                    //console.log(html);
                }).on('error', (e) => {
                    this.save();
                    reject(e.message);
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
        fs.writeFile("dict.json","\r"+JSON.stringify(wordArray),'utf-8',(err)=>{
            if(err) throw err;
        });
    },
    async runSync(){
        for(let i =1;i<items;i++){
            await this.getWord(i);
        }
        //this.save();
    },
    run(num){
        count.items = num; 
        for(let i =1;i<count.items+1;i++){
            this.getWord(i);
        }
    }
};

//download.runSync();
download.run(7055);