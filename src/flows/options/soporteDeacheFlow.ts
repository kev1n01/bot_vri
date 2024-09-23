import { EVENTS, addKeyword } from "@builderbot/bot"
import { toAsk } from "@builderbot-plugins/openai-assistants"
import { typing } from "~/utils/presence"
import { TIMEOUT_LARGE, TIMEOUT_SMALL, reset } from "../idle-custom"
import { listFlow } from "./listFlow"

const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

export const soporteDeacheFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(`Ingresa tu consulta en *un solo mensaje*\n\n 0️⃣ Volver al menu principal`, { capture: true, delay: 3000 }, async (ctx, { gotoFlow, flowDynamic, provider, state }) => {
        if (ctx.body === '0') {
            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(listFlow)
        }
        try {
            const response = await toAsk(ASSISTANT_ID, ctx.body, state)
            await typing(ctx, provider)
            await flowDynamic([{ body: response.trim() }]);
            reset(ctx, gotoFlow, TIMEOUT_LARGE)
            return gotoFlow(soporteDeacheFlow)
        } catch (error) {
            await flowDynamic('Lo siento por el momento no puedo resolver tu consulta, intenta de nuevo más tarde');
            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(listFlow)
        }
    })