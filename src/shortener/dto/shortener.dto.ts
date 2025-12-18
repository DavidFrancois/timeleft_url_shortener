import {
  IsUrl,
  IsOptional,
  IsNumber,
  Max,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ShortenUrlDto {
  @IsUrl()
  @MinLength(25)
  @MaxLength(2048)
  originalUrl: string;

  @IsOptional()
  @IsNumber()
  @Max(10080) // Maximum of 1 week in minutes
  @Min(10)
  ttl?: number;
}
