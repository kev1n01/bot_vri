import { addKeyword } from "@builderbot/bot";
import { listFlow } from "./options/listFlow";
import { start } from "./idle-custom";
/**
 * Responde inicialmente vez que el usuario inicia el bot
 */
export const welcomeFlow = addKeyword(["ola","dias","dia","buen", "bueno" ,"buena","contesta","que tal","hola", "alo", "buenas tardes", "buenos dias", "buenas noches", "buenas", "buenos", "preguntar", "consultar", "quiero", 'necesito', 'ayuda', 'ayudeme', 'ayudame', 'algo', 'urgente', 'emergencia', "que", "por", "favor"])
    .addAction(
        async (ctx, { gotoFlow, flowDynamic }) => {
            await flowDynamic(
                `¡Hola ${ctx.name}! Soy VRIBOT UDH, tu asistente virtual 🤖`,
            )            
            start(ctx, gotoFlow, 20000)
            return gotoFlow(listFlow)
        },
    )
