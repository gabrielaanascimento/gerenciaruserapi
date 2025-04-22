import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import { selectAll, selectUser, insertUser, updateUser, deleteUser,loginUser } from './connection.js'
env.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req,res) => {
    try {
        const response = await selectAll()
        res.status(220).json(response)
    } catch (error) {
        console.error(error);
        
    }
})

app.get('/user/:id', async (req,res) => {
    try {
        const id = req.params.id
        const response = await selectUser(id)
        res.status(220).json(response)
    } catch (error) {
        console.error(error);
        
    }
})

app.post('/add/user', async (req, res) => {
    const {nome, email, telefone, data_nascimento, senha, status} = req.body
    if(!nome) {
       return res.status(420).json({ msg: 'Nome Invalido'})
    }
    if(!email) {
        return res.status(420).json({ msg: 'Email Invalido'})
     }
     if(!telefone) {
        return res.status(420).json({ msg: 'Telefone Invalido'})
     }
     if(!data_nascimento) {
        return res.status(420).json({ msg: 'Data de Nascimento Invalida'})
     }
     if(!senha) {
        return res.status(420).json({ msg: 'Senha Invalida'})
     }
    try {
        const result = await insertUser(nome, email, telefone, data_nascimento, senha, status)
    
        if(result.length == 0){
        res.status(220).json({ status:true, msg: "Cadastrado com sucesso" })
        }
    } catch (error) {
        console.error(error);
        
    }
})

app.put('/alterar', async (req, res) => {
    const { id, propriedade, novo } = req.body;
    
    if(!id) {
        return res.status(400).json({ update: false, error: "ID inválido" });
    }
    if(!propriedade) {
        return res.status(400).json({ update: false, error: "Propriedade inválida" });
    }
    if(!novo) {
        return res.status(400).json({ update: false, error: "Novo inválido" });
    }

    try {
        const result = await updateUser( id, propriedade, novo )

    if(result.length == 0){
       res.status(220).json({ status:true, msg: "Modificado com sucesso" })
    }

    } catch (error) {
        console.error(error);
        
    }
})

//Deletar Usuarios
app.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await deleteUser(id)

        if(result.length == 0){
        res.status(220).json({ status:true, msg: "Deletado com sucesso" })
        }
    } catch (error) {
        console.error(error);
        
    }


})

app.post('/login', async (req, res) => {
    const {nome, senha} = req.body
    if(!nome || !senha) {
        return res.status(400).json({ login: false, error: "Usuario ou senha invalidos" });
    }
    const result = await loginUser(nome, senha)
    if(result.length == 1) {
    res.status(200).json({ login: true, user: result[0]});
    }
    
})

const PORT = process.env.PORT
app.listen(PORT)