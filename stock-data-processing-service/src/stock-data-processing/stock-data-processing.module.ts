import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { StockDataProcessingService } from './stock-data-processing.service';
import { KafkaModule } from '../kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, KafkaModule],
  providers: [StockDataProcessingService],
})
export class StockDataProcessingModule implements OnApplicationBootstrap {
  constructor(
    private readonly stockDataProcessingService: StockDataProcessingService,
  ) {}

  async onApplicationBootstrap() {
    await this.stockDataProcessingService.processIncomingData();
  }
}
