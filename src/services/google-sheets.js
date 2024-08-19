const validateStatusTransaction = async (code) => {
    try {
        // Hacer la petición a la API
        const data_api = await fetch('https://hook.us2.make.com/dtblakek4bq521ja92qp4ttsnzplwkt9');
        const data = await data_api.json();

        // Filtrar el estado según el código
        const transaction = data.find(item => item.codigo === code);

        // Retornar la informacion filtrada
        return transaction
    } catch (error) {
        console.error('Error: conexion con make no establecida', error);
    }
};

export default validateStatusTransaction