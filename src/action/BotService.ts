import type {Response} from "../models/BotResponse";

export class BotService {
    public static async getBotMessage(
        userInput: string
    ) {
        try {
            const content = JSON.stringify({prompt: userInput});
            const response  =  (await fetch('https://ea87-111-202-60-158.ngrok-free.app', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: content,
                }
            ));
            const data: Response = await response.json();
            return data.response;
        } catch (error) {
            console.log(error);
        }
    }
}