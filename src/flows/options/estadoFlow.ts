import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow";
import { validateStatusTransactionReal, normalizeName } from "../../services/google-sheets"
import { TIMEOUT_SMALL, reset } from "../idle-custom";
import { listFlow } from "./listFlow";


export const estadoFlow = addKeyword([EVENTS.ACTION])
    .addAnswer(['Ingrese su *código* universitario\n\n0️⃣ Volver al menu principal'],
        { capture: true, delay: 2000 },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body === '0') {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return gotoFlow(listFlow)
            }
            if (ctx.body.length != 10) {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return fallBack(`El código ${ctx.body} es incorrecto *(debe contener 10 números)*, intenta de nuevo\n\n0️⃣ Volver al menu principal`);
            }

            const res = await validateStatusTransactionReal(ctx.body)

            if (!res) {
                reset(ctx, gotoFlow, TIMEOUT_SMALL)
                return fallBack(`El código ${ctx.body} no se encuentra registrado, intenta de nuevo\n\n0️⃣ Volver al menu principal`);
            }

            await flowDynamic(`Estimado(a) ${normalizeName(res.nombres)}, el *estado* de tu trámite es el siguiente:\n👉 ${res.estado}\nRevisado el ${res.fecha_atencion}`);
            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(continueFlow)
        })