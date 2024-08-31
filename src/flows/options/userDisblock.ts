import { addKeyword } from "@builderbot/bot"
import { numberClean } from "~/utils/numberClean"

export const userDisblock = addKeyword("bot")
    .addAction(async (ctx, { blacklist, flowDynamic }) => {
        if (ctx.from === process.env?.ADMIN_NUMBER) {
            const toMute = numberClean(ctx.body) //Mute +34000000 message incoming
            if (toMute.length === 0) {
                await flowDynamic(`Señorita wendy, es obligatorio ingreasar un número para usar este comando`)
                return
            }
            if (toMute.length != 11) {
                await flowDynamic(`Señorita wendy, el número ${toMute} es incorrecto o no existe`)
                return
            }
            const check = blacklist.checkIf(toMute)
            if (!check) {
                blacklist.add(toMute)
                await flowDynamic(`❌ bot desactivado para el número ${toMute} `)
                return
            }
            blacklist.remove(toMute)
            await flowDynamic(`✅ bot activado para el número ${toMute} `)
            return
        } else {
            await flowDynamic(`How are you? 🤬 %$%$% !!#! @$! @$% ! @`)
            return
        }
    })