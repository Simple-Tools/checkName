//http://wuxing.bm8.com.cn/wap_wuxing/7055.html
//https://wenku.baidu.com/view/c0b7fe8502d276a200292e8d.html
const fs = require('fs');
const http = require('http');
const iconv = require("iconv-lite"); 

const baseUrl = "http://wuxing.bm8.com.cn/wap_wuxing/";

const download = {
    getWord(i){
        let url = baseUrl+i+".html";
        http.get(url,(res)=>{
            let buffers = [];
            let bufferLength = 0;
            res.on('data',  (chunk)=> {
                buffers.push(chunk);
                bufferLength += chunk.length;
            });
            res.on('end', ()=> {
                console.log("downloaded id:"+i);
                let data = Buffer.concat(buffers,bufferLength)
                let html = iconv.decode(data,'GBK')
                //html = iconv.decode(html, 'gb2312');
                console.log(html);
            });
        });
    }
};
download.getWord(1);