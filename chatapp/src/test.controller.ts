import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('test')
export class TestController {
    @Get()
    findAll(@Req() request: Request): string {
        const   queryParam = request.query;
        const   param = request.query['chatName'];

        console.log("All query params:", queryParam);
        console.log("value of param:", param);

        return JSON.stringify(queryParam);
    }

}