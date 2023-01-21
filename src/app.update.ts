import { Ctx, Hears, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf'
import { OpenAIApiService } from './services/openaiApiService';

@Update()
export class AppUpdate {
    private frendlyUserNames: Array<string>

    constructor() {
        this.frendlyUserNames = JSON.parse(process.env.FRENDLY_USERNAMES ?? "[]");
    }

    private readonly openaiApiService: OpenAIApiService = new OpenAIApiService();

    @Start()
    async start(@Ctx() ctx: Context) {
        await ctx.reply('Hello! I am send your message to openAI');
    }

    @Hears(new RegExp(`.*`))
    async hears(@Ctx() ctx: Context) {
        if (ctx.from?.username && this.frendlyUserNames.includes(ctx.from.username)) {
            if (ctx.message) {
                try {
                    var aiRespondMessage = await this.openaiApiService.sendMessage((ctx.message as any).text, ctx.from.username)
                    ctx.reply(aiRespondMessage);
                }
                catch(er){
                    console.log(er);
                    ctx.reply("Ooops! Error! Please try again.");
                }
                
                return;
            }
        }
        await ctx.reply(`Sorry you are not friend for me`);
    }
}