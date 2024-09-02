import "dotenv/config"

import { createBot, createProvider } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flows } from './flows';
import { httpInject } from "@builderbot-plugins/openai-assistants"
import ServerHttp from "./http/index"
import { numberClean } from "./utils/numberClean";

const PORT = process.env?.PORT

const main = async () => {
    const adapterProvider = createProvider(Provider, { writeMyself: false })
    const adapterDB = new Database({ filename: 'database.json' })

    const { httpServer, handleCtx } = await createBot({
        flow: flows,
        provider: adapterProvider,
        database: adapterDB,
    }, {
        queue: {
            timeout: 20000,
            concurrencyLimit: 100
        }
    })

    httpInject(adapterProvider.server)
    httpServer(+PORT)

    const server = new ServerHttp(adapterProvider)
    server.start()

    adapterProvider.server.post('/v1/message-to-support', handleCtx(async (bot, req, res) => {
        const { number, message, name } = req.body
        await bot.sendMessage(number, message, {})
        const toMute = numberClean(message)
        const check = bot.blacklist.checkIf(toMute)
        if (!check){
            bot.blacklist.add(toMute)
            await bot.sendMessage(number, `❌ bot desactivado para el número ${toMute} con nombre ${name}`, {})
        }else{
            bot.blacklist.remove(toMute)
            await bot.sendMessage(number, `✅ bot activado para el número ${toMute} con nombre ${name}`, {})
        }
        
        return res.end('send')
    }))
}

main()