import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/standalones/prisma.service';

@Injectable()
export class ShortenerService {
  constructor(private readonly prisma: PrismaService) {}

  async shortenUrl(request: Request, shortenUrlDto: any): Promise<string> {
    const { originalUrl, ttl } = shortenUrlDto;

    const apiUrl = process.env.API_URL || 'http://localhost:8080/';

    // Generate a short url that don't collide with existing ones
    const shortCode = `${Math.random().toString(36).substring(2, 8)}`;

    const written = await this.prisma.url.create({
      data: {
        original: originalUrl,
        short: shortCode,
        ttl: ttl
          ? BigInt(ttl)
          : BigInt(process.env.DEFAULT_TTL_MINUTES || '60'),
      },
    });

    return `${apiUrl}${written.short}`;
  }
}
