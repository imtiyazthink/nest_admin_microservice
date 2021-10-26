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
        return this.productService.all();
    }

    @Post()
    async create(@Body('title') title: string, @Body('content') content: string) {
        const product = await this.productService.create({
            title,
            content
        })

        this.client.emit('product_created', product);

        return product;
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.productService.getById(id)
    }

    @Put(':id')
    async update(@Param('id') id: number,
        @Body('title') title: string,
        @Body('content') content: string) {

        await this.productService.update(id, {
            title, content
        });

        const product = await this.productService.getById(id);

        this.client.emit('product_updated', product);

        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.productService.delete(id);

        this.client.emit('product_deleted', id)
    }
}
