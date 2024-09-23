import { EVENTS, addKeyword } from '@builderbot/bot';
import { stop } from './idle-custom';
/**
 *  Responde cuando el usuario se despide
 */
export const byeFlow = addKeyword([EVENTS.ACTION, "bye", "adios", "adiós", "chao", "chau", "hasta luego"])
    .addAction({ delay: 2000 }, async (ctx, { endFlow }) => {
        if (ctx.from === process.env?.ADMIN_NUMBER) {
            return
        }
        stop(ctx)
        return endFlow(`Fue un placer ayudarlo estimado(a) ${ctx.name}, accede al *menu principal* escribiendo "*Menu*"`)
    }
    )
