import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { PrismaService } from 'src/standalones/prisma.service';

@Module({
  providers: [RedirectService, PrismaService],
  controllers: [RedirectController],
})
export class RedirectModule {}
