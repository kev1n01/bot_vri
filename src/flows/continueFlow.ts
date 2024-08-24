import { EVENTS, addKeyword } from "@builderbot/bot"
import { listFlow } from "./options/listFlow"
import { byeFlow } from "./bye.flow"
import { start } from "./idle-custom"

export const continueFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(`Quieres escoger otra opción?\n 1️⃣ Si\n 2️⃣ No`, { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        start(ctx, gotoFlow, 30000)
        if (!['1', '2'].includes(ctx.body)) {
            return fallBack('Por favor elige una opción válida (1-2)')
        }
        if (['1'].includes(ctx.body)) {
            return gotoFlow(listFlow)
        }
        return gotoFlow(byeFlow)
    })