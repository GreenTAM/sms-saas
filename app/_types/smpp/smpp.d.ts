declare module "smpp" {
    export enum SmppCommandId {
        GenericNack = 0x80000000,
        BindReceiver = 0x00000001,
        BindReceiverResp = 0x80000001,
        BindTransmitter = 0x00000002,
        BindTransmitterResp = 0x80000002,
        QuerySm = 0x00000003,
        QuerySmResp = 0x80000003,
        SubmitSm = 0x00000004,
        SubmitSmResp = 0x80000004,
        DeliverSm = 0x00000005,
        DeliverSmResp = 0x80000005,
        Unbind = 0x00000006,
        UnbindResp = 0x80000006,
        ReplaceSm = 0x00000007,
        ReplaceSmResp = 0x80000007,
        CancelSm = 0x00000008,
        CancelSmResp = 0x80000008,
        BindTransceiver = 0x00000009,
        BindTransceiverResp = 0x80000009,
        Outbind = 0x0000000B,
        EnquireLink = 0x00000015,
        EnquireLinkResp = 0x80000015,
        SubmitMulti = 0x00000021,
        SubmitMultiResp = 0x80000021,
        AlertNotification = 0x00000102,
        DataSm = 0x00000103,
        DataSmResp = 0x80000103,
    }

    interface SmppBasePdu {
        command_id: SmppCommandId;
        command_status: number;
        sequence_number: number;
    }

    interface SubmitSM {
        source_addr_ton: number;
        source_addr_npi: number;
        source_addr?: string;
        dest_addr_ton: number;
        dest_addr_npi: number;
        destination_addr: string;
        message_payload: string;
        sm_length: number;
    }

    export function connect(url: Object, callback: Function)
    export function submit_sm(options: SubmitSM, callback: Function)
}
