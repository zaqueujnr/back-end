import app from "./app";
// import pgp from "pg-promise";


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is runing on port${PORT}`)
})

// async function testConnection(): Promise<void> {
//     const connection = pgp()("postgres://postgres:postgre@localhost:5432/api_tdd");

//     try {
//         await connection.connect(); // Conectar ao banco
//         console.log('✅ Conectado ao banco com sucesso!');

//         const result = await connection.query('SELECT * FROM company');

//         console.log('📌 Dados encontrados:', result);
//     } catch (err) {
//         console.error('❌ Erro ao conectar no banco:', err);
//     } finally {
//         await connection.$pool.end(); // Fechar a conexão
//         console.log('🔌 Conexão encerrada');
//     }
// }

// Executar a função de teste
// testConnection();