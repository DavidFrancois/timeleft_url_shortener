import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortenerService {
  async shortenUrl(request: Request, shortenUrlDto: any): Promise<string> {
    const { originalUrl } = shortenUrlDto;

    const apiUrl = process.env.API_URL || 'http://localhost:8080';

    // Generate a short url that don't collide with existing ones
    const shortUrl = `${apiUrl}/${Math.random().toString(36).substring(2, 8)}`;

    console.log(`Original URL: ${originalUrl}, Short URL: ${shortUrl}`);

    return shortUrl;
  }
}
