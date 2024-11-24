import { IsString, IsNumber, Min, IsOptional, IsIn } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  @IsIn(['available', 'unavailable'])
  status?: string;
}
