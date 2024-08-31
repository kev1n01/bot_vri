import { addKeyword } from "@builderbot/bot"
import { numberClean } from "~/utils/numberClean"

const ADMIN_NUMBER = '51933865935'

export const userDisblock = addKeyword("mutear")
    .addAction(async (ctx, { blacklist, flowDynamic }) => {
        if (ctx.from === ADMIN_NUMBER) {
            const toMute = numberClean(ctx.body) //Mute +34000000 message incoming
            if (toMute.length != 11) {
                await flowDynamic(`Señorita wendy, el número ${toMute} es incorrecto o no existe`)
                return
            }
            const check = blacklist.checkIf(toMute)
            if (!check) {
                blacklist.add(toMute)
                await flowDynamic(`❌ bot muteado para el número ${toMute} `)
                return
            }
            blacklist.remove(toMute)
            await flowDynamic(`✅ bot desmuteado para el número ${toMute} `)
            return
        }
    })