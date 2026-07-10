const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_ENDPOINT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        // Query para encontrar despachos pendientes hace más de 1 hora
        const [rows] = await connection.execute(
            'SELECT * FROM despachos WHERE estado = "PENDIENTE" AND fecha_creacion < NOW() - INTERVAL 1 HOUR'
        );
        
        console.log(`Se encontraron ${rows.length} despachos pendientes.`);
        
        // Aquí podrías agregar la lógica para enviar email o notificar
        return { statusCode: 200, message: `Procesados ${rows.length} registros` };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await connection.end();
    }
};