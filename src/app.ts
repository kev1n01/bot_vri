import "dotenv/config"

import { createBot, createProvider } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flows } from './flows';

const PORT = process.env?.PORT ?? 3008

const main = async () => {
    const adapterProvider = createProvider(Provider, { useBaileysStore: true, timeRelease: 1080000, writeMyself: false })
    const adapterDB = new Database({ filename: 'database.json' })

    const { httpServer } = await createBot({
        flow: flows,
        provider: adapterProvider,
        database: adapterDB,
    }, {
        queue: {
            timeout: 20000,
            concurrencyLimit: 100
        }
    })

    httpServer(+PORT)
}


main()
