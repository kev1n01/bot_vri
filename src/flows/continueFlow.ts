import { EVENTS, addKeyword } from "@builderbot/bot"
import { listFlow } from "./options/listFlow"
import { byeFlow } from "./bye.flow"
import { TIMEOUT_SMALL, reset, stop } from "./idle-custom"

export const continueFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(`Quieres escoger otra opción?\n 1️⃣ Si\n 2️⃣ No`, { capture: true}, async (ctx, { gotoFlow, fallBack }) => {
        if (!['1', '2'].includes(ctx.body)) {
            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return fallBack('Por favor elige una opción válida entre *(1-2)*')
        }
        if (['1'].includes(ctx.body)) {
            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(listFlow)
        }
        stop(ctx)
        return gotoFlow(byeFlow)
    })