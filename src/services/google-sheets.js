const validateStatusTransaction = async (code) => {
    try {
        // Hacer la petición a la API
        const data_api = await fetch('https://hook.us2.make.com/dtblakek4bq521ja92qp4ttsnzplwkt9');
        const data = await data_api.json();

        // Filtrar el estado según el código
        const transaction = data.find(item => item.codigo === code);

        // Si no se encuentra el código, lanzar un error
        if (!transaction) {
            return `El código ${code} no existe`;
        }

        // Retornar el estado si se encontró el código
        return `El estado de tu trámite está:  ${transaction.estado}`;
    } catch (error) {
        console.error('Error:', error);
        return `Error causita`;
    }
};

export default validateStatusTransaction