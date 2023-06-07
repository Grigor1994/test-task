import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockData } from './entities/stock-data.entity';
import { StockDto } from './dto/stock.dto';
import { KafkaService } from '../kafka/kafka.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StockDataService {
  constructor(
    @InjectRepository(StockData)
    private stockDataRepository: Repository<StockData>,
    private readonly configService: ConfigService,
    private readonly kafkaService: KafkaService,
  ) {}

  async processIncomingData() {
    const consumer = this.kafkaService.getConsumer();
    consumer.on('message', async (message) => {
      try {
        const data = JSON.parse(message.value.toString('utf8'));
        await this.storeStockData(data);
      } catch (error) {
        console.error('Error processing incoming data:', error);
      }
    });
  }
  async storeStockData(stock: StockDto): Promise<StockData> {
    const { symbol, price } = stock;
    const stockData = new StockData();
    stockData.symbol = symbol;
    stockData.price = price;

    return this.stockDataRepository.save(stockData);
  }

  async getStockData(page = 1, limit = 10): Promise<StockData[]> {
    return this.stockDataRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
