const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

function getDbPath(){
    return path.join(__dirname,'database.json')
}

function insertData(data){
    fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2))
}

function GenerateShortUrl(data) {
    let urlDomain =""
    let count =0
    for(let i =0;i<data.length;i++){
        if(data[i] === '.'){
            count ++
            if(count == 1){
                continue
            } 
            if(count === 2){
                break
            }
        }
        if(count === 1){
            urlDomain += data[i]
        }
    }
     let domain = urlDomain + "/"+crypto.randomBytes(3).toString('hex');
    return domain;
}

function getShortUrl(data){

}

function InsertOnDb(data){
    
}

function ReadDb(){
    const path = getDbPath()
    if(!path) return {}
    const data = fs.readFileSync(path,'utf-8')
    try{
        if (!data) {
            fs.writeFileSync(path, JSON.stringify({}), 'utf8');
            return {};
          }
          return JSON.parse(data)
    }catch(err){
        console.error('Erro ao ler ou parsear o arquivo JSON:', err);
        return {}; 
      
    }
}

module.exports = {
    insertData,
    ReadDb,
    GenerateShortUrl
}