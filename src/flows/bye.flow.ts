import { EVENTS, addKeyword } from '@builderbot/bot';
import { stop } from './idle-custom';
/**
 *  Responde cuando el usuario se despide
 */
export const byeFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { endFlow }) => {
        stop(ctx)
        return endFlow(`Fue un placer ayudarlo estimado(a) ${ctx.name}, accede a las opciones escribiendo "*Opciones*"`)
    }
    )
