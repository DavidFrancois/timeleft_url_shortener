import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { RedirectService } from './redirect.service';

// No prefix : we want a catch all controller
@Controller()
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.redirectService.getOriginalUrl(shortCode);
    return { url: url.originalUrl, statusCode: 301 };
  }
}
