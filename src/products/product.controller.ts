import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import queryString from 'query-string';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
  @Get()
  async findAll(@Query() query) {
    const limit = parseInt(query.limit as string) || 10;
    const page = parseInt(query.page as string) || 1;
   
    const limitNumber = Number(limit);
    const pageNumber = Number(page);

    const products = await this.productService.findAll();

    return {
      total: products.length,
      data: products.slice(
        (pageNumber - 1) * limitNumber,
        pageNumber * limitNumber,
      ),
    };
  }

  
  @Patch(':id')
  update( @Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}

