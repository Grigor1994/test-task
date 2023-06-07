import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { StockDataService } from './stock-data.service';
import { StockDataController } from './stock-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockData } from './entities/stock-data.entity';
import { KafkaModule } from '../kafka/kafka.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, KafkaModule, TypeOrmModule.forFeature([StockData])],
  providers: [StockDataService, ConfigService],
  controllers: [StockDataController],
})
export class StockDataModule implements OnApplicationBootstrap {
  constructor(private readonly stockDataService: StockDataService) {}
  async onApplicationBootstrap() {
    await this.stockDataService.processIncomingData();
  }
}
