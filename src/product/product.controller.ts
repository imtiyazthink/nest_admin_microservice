import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from 'src/message.event';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) { }

    @Get()
    async all() {
        this.client.emit<any>('hello', new Message('Hello World'))        
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
