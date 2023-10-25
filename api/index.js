import express from 'express'

import cors from 'cors'
const app = express()
const port = 4000 
//import das rotas da app
import rotasPrestadores from './routes/prestador.js'
import rotasUsuarios from './routes/usuario.js'

//Habilita o CORS Cross-Origin resource sharing
app.use(cors({
    origin: ['http://127.0.0.1:5500'] //informe outras URL´s se necessário
  }));
app.use(express.json()) // irá fazer o parse de arquivos JSON
//Rotas de conteúdo público
app.use('/', express.static('public'))

//Configura o favicon
app.use('/favicon.ico', express.static('public/images/computer.png'))

//Rotas da API
app.use('/api/prestadores', rotasPrestadores)
app.use('/api/usuarios', rotasUsuarios)

app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'API Fatec 100% funcional🖐',
        version: '1.0.1'
    })
})
//Rotas de Exceção - deve ser a última!
app.use(function (req, res) {
    res.status(404).json({
        errors: [{
            value: `${req.originalUrl}`,
            msg: `A rota ${req.originalUrl} não existe nesta API!`,
            param: 'invalid route'
        }]
    })
})
app.listen(port, function(){
    console.log(`🖥 Servidor rodando na porta ${port}`)
})