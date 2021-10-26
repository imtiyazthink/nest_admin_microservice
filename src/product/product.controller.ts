import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async all() {
        return this.productService.all();
    }

    @Post()
    async create(@Body('title') title: string, @Body('content') content: string) {
        return this.productService.create({
            title,
            content
        })
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.productService.getById(id)
    }

    @Put(':id')
    async update(@Param('id') id: number,
        @Body('title') title: string,
        @Body('content') content: string) {
        return this.productService.update(id, {
            title, content
        })
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}
