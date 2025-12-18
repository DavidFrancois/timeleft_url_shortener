import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/standalones/prisma.service';

@Injectable()
export class RedirectService {
  constructor(private readonly prisma: PrismaService) {}

  async getOriginalUrl(shortCode: string): Promise<{ originalUrl: string }> {
    const record = await this.prisma.url.findUnique({
      where: { short: shortCode },
    });

    if (!record) {
      throw new NotFoundException('Short URL not found');
    }

    const expired = record.ttl
      ? new Date(record.createdAt.getTime() + Number(record.ttl) * 60000)
      : null;

    if (expired && expired < new Date()) {
      await this.prisma.url.delete({ where: { id: record.id } });
      throw new NotFoundException('Short URL has expired');
    }

    // We don't renew TTL on access, but could, it depends on the use case but it's more of a business decision
    // We'd hit scalability by other means first most likely
    return { originalUrl: record.original };
  }
}
