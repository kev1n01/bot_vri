import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../../continueFlow";
import { validateStatusTransaction } from "../../../services/google-sheets"
import { reset, start, stop } from "../../idle-custom";

export const option3Flow = addKeyword(EVENTS.ACTION)
    .addAnswer(['Ingresa tu código o escribe 0️⃣ para cancelar'],
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body === '0') {
                stop(ctx)
                return gotoFlow(continueFlow)
            }
            if (ctx.body.length != 10) {
                reset(ctx, gotoFlow, 20000)
                return fallBack(`El código ${ctx.body} es incorrecto, intenta de nuevo o escribe 0️⃣ para cancelar`);
            }
            const res = await validateStatusTransaction(ctx.body)
            if (!res) {
                reset(ctx, gotoFlow, 20000)
                return fallBack(`El código ${ctx.body} no se encuentra registrado, intenta de nuevo o escribe 0️⃣ para cancelar`);
            }
            await flowDynamic(`Estimado ${res.nombres}, el estado de tu trámite está:  ${res.estado}`);
            reset(ctx, gotoFlow, 20000)
            return gotoFlow(continueFlow)
        })