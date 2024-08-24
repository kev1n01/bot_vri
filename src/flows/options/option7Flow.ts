import { EVENTS, addKeyword } from "@builderbot/bot"
import { toAsk } from "@builderbot-plugins/openai-assistants"
import { typing } from "~/utils/presence"
import { continueFlow } from "../continueFlow"
import { stop } from "../idle-custom"

const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

export const option7Flow = addKeyword(EVENTS.ACTION)
    .addAnswer(`Brindame tu consulta, por favor (trata de ser lo más específico posible):`, { capture: true }, async (ctx, { state, flowDynamic, gotoFlow, provider  }) => {
        const response = await toAsk(ASSISTANT_ID, ctx.body, state)
        await typing(ctx, provider)
        await flowDynamic([{ body: response.trim() }]);
        stop(ctx)
        return gotoFlow(continueFlow)
    })