import { IsUrl, IsOptional, IsNumber, Max, Min } from 'class-validator';

export class ShortenUrlDto {
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsNumber()
  @Max(10080) // Maximum of 1 week in minutes
  @Min(10)
  ttl?: number;
}
