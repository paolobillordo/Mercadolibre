const express = require('express');
const cors = require('cors');
const { mainRouter } = require ('./routes/main.route')

const server = express()
server.use(cors())
server.use(express.json())
server.use('/api', mainRouter)


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log('server ready'))

