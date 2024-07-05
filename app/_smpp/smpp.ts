import smpp from 'smpp';
import type { SmppBasePdu } from 'smpp';
 
export interface SmppInterface {
	init: () => void
	sendMessage: (destination_addr: string, short_message: string, source_addr?: string, destination_country_code?: string) => Promise<Object>
}


class Smpp implements SmppInterface{
	reconnectRetry: number = 0;
	session: any;

	init(){
		this.session = smpp.connect({
			url: process.env.SMPP_URL,
			auto_enquire_link_period: 1000 * 120,//60000,
			debug: true
		}, (() =>{
			let session = this.session;
			session.bind_transceiver({
				system_id: process.env.SMPP_SYSTEM_ID,
				password: process.env.SMPP_SYSTEM_PASSWORD,
			}, function(pdu: SmppBasePdu) {
				console.log(pdu, '\n\n\n');
				if (pdu.command_status === 0) {
					// Successfully bound
					console.log("credentials ok");
					// session.close();
				}
			});

			session.on("connect", (pdu: SmppBasePdu) => {
				console.log("Connection maid");
			});
			
			session.socket.on("close", (pdu: SmppBasePdu) =>{
				// console.log(this.retry)
				// this.retry++;
				// return;
				console.log("connection closed");
				session.connect();
				// session.resume()
			});
			
			session.on("error", (error: any) =>{
				console.error("SMPP error: ", error);
				// session.connect();
			});
		}).bind(this));
	}

	async sendMessage (destination_addr: string, short_message: string, source_addr = process.env.SMPP_SENDER, destination_country_code = "221"): Promise<Object> {
		const isCountryCodePresent = String(destination_addr).startsWith(destination_country_code);
		return new Promise((resolve, reject) => {
			this.session.submit_sm({
				source_addr_ton: 1,
				source_addr_npi: 1,
				source_addr: source_addr,
				dest_addr_ton: 1,
				dest_addr_npi: 1,
				destination_addr:  `${isCountryCodePresent ? '' : destination_country_code}${destination_addr}`,
				message_payload : short_message,
				sm_length: 0	
			}, function(pdu: { command_status: number; message_id: any; }) {
				if (pdu.command_status === 0) {
					// Message successfully sent
					console.log(pdu.message_id);
					console.log('Message Sent');
					resolve({
                        success: true,
                        statusCode: 200,
                        message: "Message sent successfully",
                        response: pdu
                    });
				}else{
					console.error('\nmessage non evoye', pdu );
					reject({
                        success: false,
                        statusCode: 400,
                        message: "Message not sent",
                        response: pdu
                    });
				}
			});
		});
	};
}

export const Smppinstance = new Smpp();
// module.exports = new Smpp();