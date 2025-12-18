import { Body, Controller, Post, Req } from '@nestjs/common';
import { ShortenUrlDto } from './dto/shortener.dto';
import { ShortenerService } from './shortener.service';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('shorten')
  async shortenUrl(
    @Req() request: Request,
    @Body() shortenUrlDto: ShortenUrlDto,
  ) {
    const url = await this.shortenerService.shortenUrl(request, shortenUrlDto);
    return { shortUrl: url };
  }
}
