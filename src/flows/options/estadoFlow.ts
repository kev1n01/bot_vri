import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow";
import { validateStatusTransactionReal, normalizeName } from "../../services/google-sheets"
import { TIMEOUT_SMALL, reset } from "../idle-custom";
import { listFlow } from "./listFlow";


export const estadoFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(['Ingresa tu *APELLIDOS Y NOMBRES* (en ese orden) o elige 0️⃣ para volver'],
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body === '0') {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return gotoFlow(listFlow)
            }
            const res = await validateStatusTransactionReal(ctx.body)

            if (!res) {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return fallBack(`El nombre ${ctx.body} no se encuentra registrado, intenta de nuevo o elige 0️⃣ para volver`);
            }
            await flowDynamic(`Estimado(a) ${normalizeName(res.nombres)}, el estado de tu trámite está:  ${res.estado}`);

            // if (ctx.body.length != 10) {
            //     reset(ctx, gotoFlow, TIMEOUT_SMALL)
            //     return fallBack(`El código ${ctx.body} es incorrecto, intenta de nuevo o elige 0️⃣ para volver`);
            // }
            // const res = await validateStatusTransaction(ctx.body)
            // if (!res) {
            //     reset(ctx, gotoFlow, TIMEOUT_SMALL)
            //     return fallBack(`El código ${ctx.body} no se encuentra registrado, intenta de nuevo o elige 0️⃣ para volver`);
            // }
            // await flowDynamic(`Estimado(a) ${res.nombres}, el estado de tu trámite está:  ${res.estado}`);
            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(continueFlow)
        })