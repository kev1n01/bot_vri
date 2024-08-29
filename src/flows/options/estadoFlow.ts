import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../continueFlow";
import { validateStatusTransactionReal } from "../../services/google-sheets"
import { TIMEOUT_SMALL, reset } from "../idle-custom";
import { listFlow } from "./listFlow";


export const estadoFlow = addKeyword([EVENTS.ACTION, "estado", "avance"])
    .addAnswer(['Ingresa tu *APELLIDOS Y NOMBRES* (en ese orden y con acentos) o elige 0️⃣ para volver'],
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
            await flowDynamic(`Estimado(a) ${ctx.body}, el *estado* de tu trámite es el siguiente:}\n👉 ${res.estado}`);

            reset(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(continueFlow)
        })