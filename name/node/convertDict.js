const fs = require('fs');

let wordDict = {};
const converter = {
    run(){
        fs.readFile('dict.json',(err,data)=>{
            if(err) throw err;
            let dictArray = JSON.parse(data);
            for(let word of dictArray){
                let key = word.key;
                let v = word.content.split(';');
                let d = {py:v[0].split(':')[1],ft:v[1].split(':')[1],wx:v[2].split(':')[1],jx:v[3].split(':')[1],sy:v[4].split(':')[1]};
                //console.log(JSON.stringify(d));
                //let content = JSON.parse(`{${word.content.replace(/;/gi,',')}}`);
                wordDict[key] = d;
            }
            fs.writeFile('newDict.json',JSON.stringify(wordDict),'utf-8',(err)=>{
                if(err) throw err;
            })
        })
    }
}

converter.run();