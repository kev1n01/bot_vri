import { addKeyword } from "@builderbot/bot";
import { listFlow } from "./options/listFlow";
import { TIMEOUT_SMALL, start } from "./idle-custom";
/**
 * Responde inicialmente vez que el usuario inicia el bot
 */
export const welcomeFlow = addKeyword(["hey", "ey", "oye", "oiga", "ola", "dias", "dia", "buen", "bueno", "buena", "contesta", "que tal", "hola", "alo", "buenas tardes", "buenos dias", "buenas noches", "buenas", "buenos", "preguntar", "consultar", "quiero", 'necesito', 'ayuda', 'ayudar', 'ayudeme', 'ayudame', 'urgente', 'emergencia', "favor"])
    .addAction(
        async (ctx, { gotoFlow, flowDynamic }) => {
            await flowDynamic(
                `¡Hola ${ctx.name}! Soy VRIBOT UDH, tu asistente virtual 🤖`,
            )
            start(ctx, gotoFlow, TIMEOUT_SMALL)
            return gotoFlow(listFlow)
        },
    )
