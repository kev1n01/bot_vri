import { EVENTS, addKeyword } from '@builderbot/bot'
import { BotContext, TFlow } from '@builderbot/bot/dist/types';

const TIMEOUT_SMALL = 30000;
const TIMEOUT_LARGE = 1200000;

// Object to store timers for each user
const timers = {};

// Flow for handling inactivity
const idleFlow = addKeyword(EVENTS.ACTION).addAction(
    async (ctx, { endFlow }) => {
        return endFlow();
    }
);

// Function to start the inactivity timer for a user
const start = (ctx: BotContext, gotoFlow: (a: TFlow) => Promise<void>, ms: number) => {
    timers[ctx.from] = setTimeout(() => {
        console.log(`User timeout: ${ctx.from} ${ctx.name} ${ms}`);
        return gotoFlow(idleFlow);
    }, ms);
}

// Function to reset the inactivity timer for a user
const reset = (ctx: BotContext, gotoFlow: (a: TFlow) => Promise<void>, ms: number) => {
    stop(ctx);
    if (timers[ctx.from]) {
        console.log(`reset countdown for the user: ${ctx.from} ${ctx.name} ${ms}`);
        clearTimeout(timers[ctx.from]);
    }
    start(ctx, gotoFlow, ms);
}

// Function to stop the inactivity timer for a user
const stop = (ctx: BotContext) => {
    if (timers[ctx.from]) {
        clearTimeout(timers[ctx.from]);
    }
}

const timerBot = {}

const startBotDesactive = (ctx: BotContext) => {
    console.log(`bot: ${ctx.from} ${ctx.name}`);
    timerBot[ctx.from] = setTimeout(async () => {
        await fetch(`${process.env?.SERVER_URL}/v1/message-to-support`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ number: process.env?.ADMIN_NUMBER, message: `bot ${ctx.from}`, name: ctx.name })
        }).then(() => {
            console.log("solicitud activar bot enviada");
        })
    }, TIMEOUT_LARGE)
}

export {
    start,
    reset,
    stop,
    startBotDesactive,
    idleFlow,
    TIMEOUT_SMALL,
    TIMEOUT_LARGE
}
