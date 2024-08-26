import { EVENTS, addKeyword } from "@builderbot/bot"
import { toAsk } from "@builderbot-plugins/openai-assistants"
import { typing } from "~/utils/presence"
import { continueFlow } from "../../continueFlow"
import { reset, start, stop } from "../../idle-custom"

const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

export const option7Flow = addKeyword(EVENTS.ACTION)
    .addAnswer(`Si es *Si* escribe tu consulta o escribe 0️⃣ para cancelar`, { capture: true }, async (ctx, { state, flowDynamic, gotoFlow, provider }) => {
        if (ctx.body === '0') {
            stop(ctx)
            start(ctx, gotoFlow, 20000)
            return gotoFlow(continueFlow)
        }
        const response = await toAsk(ASSISTANT_ID, ctx.body, state)
        await typing(ctx, provider)
        await flowDynamic([{ body: response.trim() }]);
        reset(ctx, gotoFlow, 30000)
        return gotoFlow(option7Flow)
    })