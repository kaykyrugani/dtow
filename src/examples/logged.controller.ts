import { Controller, Get, Headers } from '@nestjs/common';
import { LoggedService } from './logged.service';

@Controller('logged')
export class LoggedController {
  constructor(private readonly loggedService: LoggedService) {}

  @Get()
  async doSomething(@Headers('x-request-id') requestId: string) {
    return await this.loggedService.doSomething(requestId);
  }
}
