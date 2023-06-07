import { Injectable } from '@nestjs/common';
import { InvalidResponseDataException } from '../exceptions/invalid-response-data.exception';
import { ISimpleMovingAverage } from './interface/simple-moving-average';
import { ConfigService } from '@nestjs/config';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class StockDataProcessingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly kafkaService: KafkaService,
  ) {}

  async processIncomingData(): Promise<void> {
    const consumer = this.kafkaService.getConsumer();
    consumer.on('message', async (message) => {
      try {
        const data = JSON.parse(message.value.toString('utf8'));
        const calculatedSmaData = this.calculateSMA(data, 10);
        await this.kafkaService.send(
          this.configService.get('KAFKA_PRODUCE_TOPIC_NAME'),
          calculatedSmaData,
        );
      } catch (error) {
        console.error('Error processing incoming data:', error);
      }
    });
  }
  calculateSMA(data, period): ISimpleMovingAverage {
    const { 'Time Series (Daily)': timeSeries } = data;
    const { 'Meta Data': metaData } = data;

    if (!timeSeries) {
      throw new InvalidResponseDataException();
    }

    const closePrices = Object.values(timeSeries).map((data) =>
      parseFloat(data['4. close']),
    );

    const sma: number = this.calculateMovingAverage(closePrices, period);
    const symbol: string = metaData['2. Symbol'];
    return {
      symbol: symbol,
      price: sma,
    };
  }

  private calculateMovingAverage(data, period): number {
    const sum = data.slice(0, period).reduce((acc, value) => acc + value, 0);
    return sum / period;
  }
}
