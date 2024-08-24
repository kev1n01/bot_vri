import { createReadStream } from 'fs'
import { join } from 'path'
import express from 'express'

const router = express.Router()

const chatWoot = async (req, res) => {
    const providerWs = req.providerWs
    const body = req.body
    console.log(body);
    if (body?.private) { //para no duplicar mensajes
        res.send(null)
        return
    }
    const phone = body?.conversation?.meta?.sender?.phone_number.replace('+', '')
    console.log(phone);
    await providerWs.sendText(`${phone}@c.us`, body.content)
    res.send(body)
}

router.post('/chatwoot', chatWoot)

router.get("/get-qr", async (_, res) => {
    const PATH = join(process.cwd(), 'bot.qr.png')
    const fileStream = createReadStream(PATH)

    res.writeHead(200, {
        'Content-Type': 'image/png',
    })
    fileStream.pipe(res)
})

export default router