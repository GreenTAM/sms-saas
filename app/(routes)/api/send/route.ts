import { NextRequest, NextResponse } from "next/server";
import { MessageFields } from "./types";

const FIGED_TOKEN = process.env.FIGED_TOKEN;

export async function POST(req: NextRequest, res: NextResponse){

    //TODO: remove figed token
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if(!token || token !== FIGED_TOKEN) {
        return NextResponse.json({message: "Authentication failded"}, {status: 401});
    }

    const { to_number, message}: MessageFields = await req.json();
    //TODO: make validation of fields

    try {
        let data = await global.smpp.sendMessage(to_number, message);

        console.log("global variable", data);
        console.log("to: ", to_number, " msg: ", message);
        return NextResponse.json({message: "The SMS has been sent to " + to_number});
        
    } catch (error) {
        console.log("log ", error);
        return NextResponse.json({message: "An error occured."}, {status: 500});
    }
} 