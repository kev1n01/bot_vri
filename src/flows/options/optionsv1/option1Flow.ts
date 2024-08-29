import { EVENTS, addKeyword } from "@builderbot/bot"
import { continueFlow } from "../../continueFlow"
import { start } from "../../idle-custom"

export const option1Flow = addKeyword(EVENTS.ACTION)
    .addAnswer('Tienes que entrar a la plataforma *https://sigep.udh.edu.pe/*, y registrarte para poder iniciar el proceso de registro', null, async (ctx, { gotoFlow }) => {
        start(ctx, gotoFlow, 20000)
        return gotoFlow(continueFlow)
    })