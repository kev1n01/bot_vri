import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow"
import { TIMEOUT_SMALL, reset } from "../idle-custom"

export const atentionFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow, flowDynamic }) => {
        await flowDynamic('*Horario de atención:*\nLunes a viernes\n8am - 1pm y 3pm - 6pm')
        reset(ctx, gotoFlow, TIMEOUT_SMALL)
        return gotoFlow(continueFlow)
    })