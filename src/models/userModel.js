const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

const user = {
    getAll: async () => {
        const users = await sql`SELECT * FROM users_cadastro`;
        return users;
    },

    create: async (user) => {
        const newUser = await sql`INSERT INTO users_cadastro (name, email, senha) VALUES (${user.name}, ${user.email}, ${user.senha})`;
        return newUser;
    },

    findByEmail: async (email) => {
        const resultado = await sql`SELECT * FROM users_cadastro WHERE email = ${email}`;
        return resultado[0];
    }
   
}

module.exports = user