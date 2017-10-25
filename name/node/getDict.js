//http://wuxing.bm8.com.cn/wap_wuxing/7055.html
//https://wenku.baidu.com/view/c0b7fe8502d276a200292e8d.html
const fs = require('fs');
const http = require('http');
const iconv = require('iconv-lite'); 
const cheerio = require('cheerio');

const baseUrl = "http://wuxing.bm8.com.cn/wap_wuxing/";
const wordDict = {};

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
                    reject(e.message);
                });
            });
        });
    },
    save(){
        fs.appendFile("dict","\r"+JSON.stringify(wordDict),'utf-8',(err)=>{
            if(err) throw err;
        });
    },
    async runSync(){
        for(let i =1;i<7055;i++){
            await this.getWord(i);
        }
        this.save();
    }
};

download.runSync();