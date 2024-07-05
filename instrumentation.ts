import { SmppInterface } from "@/app/_smpp/smpp";

declare global {
    namespace globalThis {
        var smpp: SmppInterface;
    }
}

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { Smppinstance } = await import("@/app/_smpp/smpp");
        Smppinstance.init();
        global.smpp = (global.smpp ? global.smpp : Smppinstance);
    }
}