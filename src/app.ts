import "dotenv/config"

import { createBot, createProvider } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flows } from './flows';
import { httpInject } from "@builderbot-plugins/openai-assistants"
import ServerHttp from "./http/index"

const PORT = process.env?.PORT ?? 3008

const main = async () => {
    const adapterProvider = createProvider(Provider, { writeMyself: false, useBaileysStore: true, timeRelease: 1080000 })
    const adapterDB = new Database({ filename: 'database.json' })

    const { httpServer } = await createBot({
        flow: flows,
        provider: adapterProvider,
        database: adapterDB,
    }, {
        queue: {
            timeout: 60000,
            concurrencyLimit: 100
        }
    })

    httpInject(adapterProvider.server)
    httpServer(+PORT)

    const server = new ServerHttp(adapterProvider)
    server.start()
}

main()