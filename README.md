
## Pasos para instalación desde cero
1. **Instalar Node.js v.20:**
   - [Descargar e instalar Node.js](https://nodejs.org/)

2. **Instalar builderbot:**
    ```bash
    pnpm create builderbot@latest
    ```

3. **Instalar los paquetes necesarios:**
    ```bash
    pnpm install or  npm install
    ```

4. **Iniciar el servidor:**
    ```bash
    pnpm run dev o npm run dev
    ```

## Endpoints

### Enviar mensaje de soporte humano / desactiva y activa el bot para un usuario

- **Método:** POST
- **URL:** `http://localhost:3008/v1/message-to-support`
- **Body (JSON):**
    ```json
    {
      "message":"bot 51924233222",
      "number":"51933865935",
      "name":"usuario que selecciona la option de soporte"
    }
    ```