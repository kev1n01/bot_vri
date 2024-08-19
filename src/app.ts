import "dotenv/config"

import { createBot, createProvider, createFlow, addKeyword, EVENTS, utils } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { toAsk, httpInject } from "@builderbot-plugins/openai-assistants"
import { join } from "path";
import ServerHttp from "./http/index"
import sendMessageFromChatWood from "./services/chatwood-conexion";
import validateStatusTransaction from "./services/google-sheets";

const PORT = process.env?.PORT ?? 3008
const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

const aiFlow = addKeyword<Provider, Database>(utils.setEvent('AI_FLOW'))
    .addAnswer(`Con qué otra consulta te puedo ayudar? `, { capture: true }, async (ctx, { state }) => {
        await state.update({ consultai: ctx.body })
    })
    .addAction(async (_, { flowDynamic, gotoFlow, state }) => {
        // await typing(ctx, provider)
        const response = await toAsk(ASSISTANT_ID, state.get('consultai'), state)
        await flowDynamic([{ body: response.trim() }]);
        return gotoFlow(aiFlow)
    })

const flowContinueMenu = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(`Quieres escoger otra opción?\n1️⃣ Si\n2️⃣ No`, { capture: true }, async (ctx, { gotoFlow }) => {
        if (ctx.body.toLocaleLowerCase().includes('1')) {
            return gotoFlow(flowSelectOption)
        }
        return gotoFlow(byeFlow)
    })

const flowSelectOption = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(`Escoge otra opción:\n1️⃣ ¿Cómo me registro en el concurso de proyectos de investigación?\n2️⃣ ¿Cómo ingreso a tu coach?\n3️⃣ Quiero saber el estado de mi trámite\n4️⃣ ¿Cuál es el procedimiento para la revisiones?\n5️⃣ ¿Porqué tengo observaciones?\n6️⃣ Quiero hablar con el soporte\n7️⃣ Quiero hacer una pregunta más específica`,
        { capture: true },
        async (ctx, { gotoFlow }) => {
            switch (ctx.body) {
                case '1':
                    return gotoFlow(flowToOption1)
                case '2':
                    return gotoFlow(flowToOption2)
                case '3':
                    return gotoFlow(flowToOption3)
                case '4':
                    return gotoFlow(flowToOption4)
                case '5':
                    return gotoFlow(flowToOption5)
                case '6':
                    return gotoFlow(flowToOption6)
                case '7':
                    return gotoFlow(aiFlow)
                default:
                    return gotoFlow(flowSelectOption)
            }
        }
    )

const byeFlow = addKeyword<Provider, Database>(['bye', 'gracias', 'adios', 'hasta pronto', 'ok', EVENTS.ACTION])
    .addAction(async (ctx, { flowDynamic }) => {
        const name = ctx.name
        await flowDynamic([`Fue un placer ayudarlo estimado(a) ${name}`])
    })

const flowToOption1 = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer('Tienes que entrar a la plataforma https://sigep.udh.edu.pe/, registrarte para poder iniciar el proceso de registro', null, async (ctx, { gotoFlow }) => {
        return gotoFlow(flowContinueMenu)
    })


const flowToOption2 = addKeyword<Provider, Database>(EVENTS.ACTION)

    .addAction(async (_, { gotoFlow, flowDynamic }) => {
        const MENSAJE = 'Ingresa a la plataforma tu coach desde el enlace https://tucoach.udh.edu.pe/ y sigue el manual de usuario'
        await flowDynamic(MENSAJE)
        await flowDynamic([{ body: 'waa', media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') }])
        return gotoFlow(flowContinueMenu)
    }
    )

const flowToOption3 = addKeyword<Provider, Database>(utils.setEvent('STATUS_FLOW'))
    .addAnswer('Cuál es tu código?', { capture: true }, async (ctx, { state }) => {
        await state.update({ code: ctx.body })
    })
    .addAction(async (_, { flowDynamic, gotoFlow, state }) => {
        const code = state.get<string>('code')
        if (code.length != 10) {
            await flowDynamic(`El código ${code} es incorrecto, intenta de nuevo`);
            return gotoFlow(flowToOption3)
        } else {
            const res = await validateStatusTransaction(code)
            if (!res) {
                await flowDynamic(`El código ${code} no se encuentra registrado, intenta de nueva`);
                return gotoFlow(flowToOption3)
            }
            await flowDynamic(`El estado de tu trámite está:  ${res.estado}`);
            return gotoFlow(flowContinueMenu)
        }
    })

const flowToOption4 = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer('el procedimiento es el siguiente:', { media: join(process.cwd(), 'assets', 'pasos_para_constancia_originalidad.jpg') })
    .addAnswer('El manual para la constancia de Tu Coach UDH, es el siguiente:', { media: join(process.cwd(), 'assets', 'manual_de_usuario_tu_coach.pdf') })
    .addAnswer('Luego de la recepción, la tesis primero pasa por la revisión de buenas prácticas, si no hay observaciones pasa a turnitin, caso contrario se le envía a su correo las observaciones para que pueda subsanarlas; lo que se revisa es lo siguiente:', { media: join(process.cwd(), 'assets', 'que_debo_evitar_en_mi_informe_final.pdf') })
    .addAnswer('Para que pueda revisar su tesis antes de enviar, active lo siguiente en su archivo', { media: join(process.cwd(), 'assets', 'activar_antes_de_enviar_tesis_para_su_revision.jpeg') }, async (_, { gotoFlow }) => {
        return gotoFlow(flowContinueMenu)
    })

const flowToOption5 = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer('Es posible que usted no hay cumplido con el formato del documento, asegurese de revisar lo siguiente:\n-Activar esta herramienta en su archivo ', { media: join(process.cwd(), 'assets', 'activar_antes_de_enviar_tesis_para_su_revision.jpeg') })
    .addAnswer('-Verificar en su archivos que no haya estos errores', { media: join(process.cwd(), 'assets', 'que_debo_evitar_en_mi_informe_final.pdf') }, async (_, { gotoFlow }) => {
        return gotoFlow(flowContinueMenu)
    })

const flowToOption6 = addKeyword<Provider, Database>([EVENTS.ACTION, 'comunicarme', 'hablar'])
    .addAction(async (_, { flowDynamic }) => {
        const MENSAJE = 'Si deseas comunicarte con nuestro personal para una consulta más especifica contactanos al: \n-933865935\n-soporte_vri@udh.edu.pe'
        try {
            await sendMessageFromChatWood('Necesito soporte personalizado', 'incoming')
        } catch (error) {
            console.log(error)
        }
        await flowDynamic(MENSAJE)
    })

const welcomeFlow = addKeyword<Provider, Database>(EVENTS.WELCOME)
    .addAnswer(
        [
            `Hola!!🤗 Bienvenido gracias por comunicarte con el VRI`,
            `Escoja la mejor opción para su consulta:\n1️⃣ ¿Cómo me registro en el concurso de proyectos de investigación?\n2️⃣ ¿Cómo ingreso a tu coach?\n3️⃣ Quiero saber el estado de mi trámite\n4️⃣ ¿Cuál es el procedimiento para la revisiones?\n5️⃣ ¿Porqué tengo observaciones?\n6️⃣ Quiero hablar con el soporte\n7️⃣ Quiero hacer una pregunta más específica`,
        ],
        { capture: true },
        async (ctx, { gotoFlow }) => {
            switch (ctx.body) {
                case '1':
                    return gotoFlow(flowToOption1)
                case '2':
                    return gotoFlow(flowToOption2)
                case '3':
                    return gotoFlow(flowToOption3)
                case '4':
                    return gotoFlow(flowToOption4)
                case '5':
                    return gotoFlow(flowToOption5)
                case '6':
                    return gotoFlow(flowToOption6)
                case '7':
                    return gotoFlow(aiFlow)
                default:
                    return gotoFlow(flowSelectOption)
            }
        },
    )

const comunicationFlow = addKeyword<Provider, Database>(['comunicate', 'comunicarme', 'comunicar', 'hablar', 'charlar', 'conversar', 'comunico', EVENTS.ACTION])
    .addAnswer(['Si deseas comunicarte con nuestro personal para una consulta más especifica llama al número 933865935 o escribe a soporte_vri@udh.edu.pe'])

// Apagar el bot para un usuario
const flowOffOneUser = addKeyword<Provider>('apagaruser')
    .addAction(async (_, { state, endFlow }) => {
        const botOffForThisUser = state.get<boolean>('botOffForThisUser')
        await state.update({ botOffForThisUser: !botOffForThisUser })
        if (botOffForThisUser) return endFlow()
    })
    .addAnswer('Hello!')

// Apagar el bot para todos los usuarios
const flowOffEveryOne = addKeyword<Provider>('apagartodos')
    .addAction(async (_, { globalState, endFlow }) => {
        const botOffForEveryOne = globalState.get<boolean>('botOffForEveryOne')
        await globalState.update({ botOffForEveryOne: !botOffForEveryOne })
        if (botOffForEveryOne) return endFlow()
    })
    .addAnswer('Hello!')


const main = async () => {
    const adapterFlow = createFlow([welcomeFlow, comunicationFlow, flowToOption3, flowToOption6, flowToOption1, flowToOption2, flowToOption5, flowToOption4, flowOffOneUser, flowOffEveryOne, aiFlow, byeFlow, flowContinueMenu, flowSelectOption])
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database({ filename: 'database.json' })

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpInject(adapterProvider.server)
    httpServer(+PORT)

    const server = new ServerHttp(adapterProvider)
    server.start()
}

main()
