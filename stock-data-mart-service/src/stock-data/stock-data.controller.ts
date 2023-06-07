import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StockDataService } from './stock-data.service';
import { StockData } from './entities/stock-data.entity';
import { GetStockQueryDto } from './dto/get-stock-query.dto';
import { AuthGuard } from '../gurads/auth.guard';

@Controller('stock-data')
export class StockDataController {
  constructor(private readonly stockDataService: StockDataService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  async getStockData(@Query() query: GetStockQueryDto): Promise<StockData[]> {
    const { page, limit } = query;
    return this.stockDataService.getStockData(page, limit);
  }
}
