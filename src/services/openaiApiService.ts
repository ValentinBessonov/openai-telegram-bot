import { Injectable, Scope } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";

enum Model {
    TextDavinci003 = 'text-davinci-003',
    TextCurie001 = 'text-curie-001',
  }

@Injectable({ scope: Scope.TRANSIENT })
export class OpenAIApiService {

    async sendMessage(message: string): Promise<string> {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion({
            model: Model.TextDavinci003,
            prompt: message,
            temperature: 0.9,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
        });

        return response.data.choices[0].text ?? "oops";
    }
}