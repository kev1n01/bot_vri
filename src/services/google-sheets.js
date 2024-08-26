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

const normalizeName = (name) => {
    return name
        .toLowerCase()           // Convertir a minúsculas
        .replace(/[.,;]/g, ' ')   // Eliminar comas, puntos, y punto y comas
        .replace(/\s+/g, ' ')    // Reemplazar múltiples espacios por un solo espacio
        .trim();                 // Eliminar espacios al inicio y al final
};

const validateStatusTransactionReal = async (full_name) => {
    try {
        const data_api = await fetch('https://hook.us2.make.com/73qjefn3kmdtexbemm143l84yfftf338');
        const data = await data_api.json();
        console.log(data[0].nombres);

        const normalizedFullName = normalizeName(full_name);

        const transaction = data.find(item => normalizeName(item.nombres) === normalizedFullName);

        return transaction;
    } catch (error) {
        console.error('Error: conexion con make no establecida', error);
    }
};


export {
    validateStatusTransactionReal,
    validateStatusTransaction,
    normalizeName
}