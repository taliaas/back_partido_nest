import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { Public } from 'src/common/RutaPublic';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Public()
  @Get()
  findAll() {
    return this.balanceService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceService.findOne(+id);
  }
}
