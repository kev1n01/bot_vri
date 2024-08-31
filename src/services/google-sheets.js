const normalizeName = (name) => {
    try {
        return name
            .toLowerCase()           // Convertir a minúsculas
            .replace(/[.,;]/g, ' ')   // Eliminar comas, puntos, y punto y comas
            .replace(/\s+/g, ' ')    // Reemplazar múltiples espacios por un solo espacio
            .trim();                 // Eliminar espacios al inicio y al final
    }catch{
        console.log('Error: no se pudo normalizar el nombre');
    }
};

const validateStatusTransactionReal = async (code) => {
    try {
        const data_api = await fetch('https://hook.us2.make.com/73qjefn3kmdtexbemm143l84yfftf338');
        const data = await data_api.json();

        const transaction = data.find(item => item.codigo === code);

        return transaction;
    } catch (error) {
        console.error('Error: conexion con make no establecida', error);
    }
};


export {
    validateStatusTransactionReal,
    normalizeName
}