import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import { StockDataCollectorService } from './stock-data-collector.service';

@Module({
  imports: [KafkaModule],
  providers: [StockDataCollectorService],
})
export class StockDataCollectorModule implements OnApplicationBootstrap {
  constructor(
    private readonly stockDataCollectorService: StockDataCollectorService,
  ) {}
  async onApplicationBootstrap() {
    await this.stockDataCollectorService.collectStockData().subscribe(
      (data) => console.info('Received stock data:', data),
      (error) => console.error('Error collecting stock data:', error),
    );
  }
}
