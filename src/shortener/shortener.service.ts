import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/standalones/prisma.service';
import { randomShortCode } from 'src/utils/shortCode.utils';

@Injectable()
export class ShortenerService {
  constructor(private readonly prisma: PrismaService) {}

  private async findUniqueShortCode(): Promise<string> {
    const maxAttempts = process.env.MAX_SHORTCODE_GENERATION_ATTEMPTS;
    let attempts = 0;
    let exists = false;
    let shortCode: string;

    do {
      shortCode = randomShortCode(6);
      const res = await this.prisma.url.findUnique({
        where: { short: shortCode },
      });

      if (res) {
        exists = true;
      } else {
        exists = false;
      }

      ++attempts;
    } while (exists && attempts < (maxAttempts ? Number(maxAttempts) : 5));

    return shortCode;
  }

  async shortenUrl(request: Request, shortenUrlDto: any): Promise<string> {
    const { originalUrl, ttl } = shortenUrlDto;

    const apiUrl = process.env.API_URL || 'http://localhost:8080/';

    // Generate a short url that don't collide with existing ones
    const shortCode = await this.findUniqueShortCode();

    if (!shortCode) {
      throw new Error('Could not generate a unique short code');
    }

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
