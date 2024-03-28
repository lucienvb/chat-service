import { Controller, Get, Req } from '@nestjs/common'

@Controller('test')
export class TestController {
    @Get()
    findAll(@Req() request: Request): string {
        return 'tedfgdsgsst';
    }

}