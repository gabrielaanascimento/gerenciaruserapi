import postgres from "postgres"
import env from 'dotenv'

env.config()

export const selectAll = async () => {
    try {
        const sql = postgres(process.env.DATABASE_URL)
        const response = await sql`SELECT * FROM usuarios`
        await sql.end()
        return (response)
    } catch (error) {
        return console.error('Erro ao conectar ao Neon DB', error);
    }
}

export const selectUser = async (id) => {
    try {
        const sql = postgres(process.env.DATABASE_URL)
        const response = await sql`SELECT * FROM usuarios WHERE id = ${id}`
        await sql.end()
        return (response)
    } catch (error) {
        return console.error('Erro ao conectar ao Neon DB', error);
    }
}

export const insertUser = async (nome, email, telefone, data_nascimento, senha, status) => {
    try {
        const sql = postgres(process.env.DATABASE_URL)
        const response = await sql`INSERT INTO usuarios (nome, email, telefone, data_nascimento, senha, status) VALUES (${nome}, ${email}, ${telefone}, ${data_nascimento}, ${senha}, ${status})`
        await sql.end()
        return (response)
    } catch (error) {
        return console.error('Erro ao conectar ao Neon DB', error);
    }
}

export const deleteUser = async (id) => {
    try {
        const sql = postgres(process.env.DATABASE_URL)
        const response = await sql`DELETE FROM usuarios WHERE id = ${id}`
        await sql.end()
        return (response)
    } catch (error) {
        return console.error('Erro ao conectar ao Neon DB', error);
    }
}

export const updateUser = async (id, propriedade, novo) => {

    if(propriedade === "nome") {
        try {
            const sql = postgres(process.env.DATABASE_URL)
            const response = await sql`UPDATE usuarios SET nome = ${novo} WHERE id = ${id}`
            await sql.end()
            return (response)
        } catch (error) {
            return console.error('Erro ao conectar ao Neon DB', error);
        }
    } 
    else if (propriedade === "email") {
        try {
            const sql = postgres(process.env.DATABASE_URL)
            const response = await sql`UPDATE usuarios SET email = ${novo} WHERE id = ${id}`
            await sql.end()
            return (response)
        } catch (error) {
            return console.error('Erro ao conectar ao Neon DB', error);
        }
    } 
    else if (propriedade === "telefone") {
        try {
            const sql = postgres(process.env.DATABASE_URL)
            const response = await sql`UPDATE usuarios SET telefone = ${novo} WHERE id = ${id}`
            await sql.end()
            return (response)
        } catch (error) {
            return console.error('Erro ao conectar ao Neon DB', error);
        }
    } 
    else if (propriedade === "senha") {
        try {
            const sql = postgres(process.env.DATABASE_URL)
            const response = await sql`UPDATE usuarios SET senha = ${novo} WHERE id = ${id}`
            await sql.end()
            return (response)
        } catch (error) {
            return console.error('Erro ao conectar ao Neon DB', error);
        }
    } 
    else if (propriedade === "data_nascimento") {
        try {
            const sql = postgres(process.env.DATABASE_URL)
            const response = await sql`UPDATE usuarios SET data_nascimento = ${novo} WHERE id = ${id}`
            await sql.end()
            return (response)
        } catch (error) {
            return console.error('Erro ao conectar ao Neon DB', error);
        }
    } else {
        return "Propriedade invalida"
    } 

}

export const loginUser = async (nome, senha) => {
    try {
        const sql = postgres(process.env.DATABASE_URL)
        const response = await sql`SELECT * FROM usuarios WHERE nome = ${nome} and senha= ${senha}`
        await sql.end()
        return (response)
    } catch (error) {
        return console.error('Erro ao conectar ao Neon DB', error);
    }
}


