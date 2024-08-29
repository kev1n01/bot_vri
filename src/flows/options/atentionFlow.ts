import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow"
import { TIMEOUT_SMALL, reset } from "../idle-custom"

export const atentionFlow = addKeyword(EVENTS.ACTION)
    .addAnswer('*Horario de atención*\nLunes a viernes de 8am - 1pm y de 3pm - 6pm'
        , null, async (ctx, { gotoFlow }) => {
            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(continueFlow)
        })