const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path')
const cors = require('cors')
const port = 3030

app.use(cors())

app.get('/getData', (req, res) => {
 const readable = fs.createReadStream(path.join(__dirname, 'db.json'))
 readable.pipe(res)
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`))