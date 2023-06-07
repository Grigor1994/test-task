import { Module } from '@nestjs/common';
import { StockDataProcessingModule } from './stock-data-processing/stock-data-processing.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StockDataProcessingModule,
    KafkaModule,
  ],
})
export class AppModule {}
