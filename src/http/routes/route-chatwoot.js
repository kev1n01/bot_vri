import { createReadStream } from 'fs'
import { join } from 'path'
import express from 'express'

const router = express.Router()
/**
 * Routes
 * 
 * @param {*} req 
 * @param {*} res
 */
const chatWoot = async (req, res) => {
    const providerWs = req.providerWs 
    const body = req.body
    const phone = body?.conversation?.meta?.sender?.phone_number.replace('+','')
    console.log(phone);
    await providerWs.sendText(`${phone}@c.us`, body.content)
    res.send(body)
}


/**
 * Controller
 */
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