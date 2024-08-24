import { EVENTS, addKeyword } from "@builderbot/bot"
import { listFlow } from "./options/listFlow"
import { byeFlow } from "./bye.flow"
import { reset, start, stop } from "./idle-custom"

export const continueFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(`Quieres escoger otra opción?\n 1️⃣ Si\n 2️⃣ No`, { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        if (!['1', '2'].includes(ctx.body)) {
            reset(ctx, gotoFlow, 200000)
            return fallBack('Por favor elige una opción válida (1-2)')
        }
        if (['1'].includes(ctx.body)) {
            start(ctx, gotoFlow, 200000)
            return gotoFlow(listFlow)
        }
        stop(ctx)
        return gotoFlow(byeFlow)
    })