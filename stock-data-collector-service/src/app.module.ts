import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StockDataCollectorModule } from './stock-data-collector/stock-data-collector.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StockDataCollectorModule,
    KafkaModule,
  ],
})
export class AppModule {}
