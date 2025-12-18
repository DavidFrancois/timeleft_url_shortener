import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { PrismaService } from 'src/standalones/prisma.service';

@Module({
  providers: [ShortenerService, PrismaService],
  controllers: [ShortenerController],
})
export class ShortenerModule {}
