import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/standalones/prisma.service';
import { randomShortCode } from 'src/utils/shortCode.utils';

@Injectable()
export class ShortenerService {
  constructor(private readonly prisma: PrismaService) {}

  async shortenUrl(request: Request, shortenUrlDto: any): Promise<string> {
    const { originalUrl, ttl } = shortenUrlDto;

    const apiUrl = process.env.API_URL || 'http://localhost:8080/';

    // Generate a short url that don't collide with existing ones
    let newEntry;
    const maxAttempts = parseInt(
      process.env.MAX_SHORTCODE_GENERATION_ATTEMPTS || '5',
      10,
    );

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const shortCode = randomShortCode();

      try {
        newEntry = await this.prisma.url.create({
          data: {
            original: originalUrl,
            short: shortCode,
            ttl: ttl
              ? BigInt(ttl)
              : BigInt(process.env.DEFAULT_TTL_MINUTES || '60'),
          },
        });
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          continue;
        }

        throw err;
      }
    }

    return `${apiUrl}${newEntry.short}`;
  }
}
