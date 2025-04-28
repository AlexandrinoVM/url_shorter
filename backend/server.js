const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const functions = require('./functions.js')

app.use(express.json())
app.use(cors())

app.get('/:domain/:id',(req,res)=>{
  const  {domain,id}  = req.params;
  const database = functions.ReadDb();
  const originalUrl = database[domain+"/"+id];
  if(originalUrl){
    res.redirect(originalUrl)
  }else{
    res.status(404).send('URL not Found')
  }
})

app.post('/shortUrl/shorten',(req,res)=>{
  const {originalUrl} = req.body
  const database = functions.ReadDb();
  const URLexists = Object.entries(database).find(([short,url]) => url === originalUrl)
  if(URLexists){
    const [existingShortUrl] = URLexists
    return res.json({shortUrl: `http://localhost:3000/${existingShortUrl}`})
  }
  
  const shortUrl = functions.GenerateShortUrl(originalUrl)
  database[shortUrl] = originalUrl
  functions.insertData(database)

  res.json({shortUrl: `http://localhost:3000/${shortUrl}`})
})

app.listen(port,()=>{
  console.log(`listen ${port}`)
})