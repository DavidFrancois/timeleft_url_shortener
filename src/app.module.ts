import { Module } from '@nestjs/common';
import { ShortenerModule } from './shortener/shortener.module';
import { ConfigModule } from '@nestjs/config';
import { RedirectModule } from './redirect/redirect.module';
@Module({
  imports: [
    ShortenerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedirectModule,
  ],
})
export class AppModule {}
