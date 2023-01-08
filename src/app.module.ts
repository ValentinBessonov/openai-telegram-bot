import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { AppUpdate } from './app.update';
import { OpenAIApiService } from './services/openaiApiService';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      botName: process.env.TELEGRAM_BOT_NAME ?? "",
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN ?? "",
        middlewares: [session()]
      }),
    }),
    AppUpdate
  ],
  providers: [OpenAIApiService],
})
export class AppModule {}
