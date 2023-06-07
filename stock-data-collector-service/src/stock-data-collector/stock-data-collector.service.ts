import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class StockDataCollectorService {
  private readonly ALPHA_VANTAGE_API_KEY: string;
  private readonly ALPHA_VANTAGE_API_URL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly kafkaService: KafkaService,
  ) {
    this.ALPHA_VANTAGE_API_KEY = this.configService.get(
      'ALPHA_VANTAGE_API_KEY',
    );
    this.ALPHA_VANTAGE_API_URL = this.configService.get(
      'ALPHA_VANTAGE_API_URL',
    );
  }

  collectStockData(): Observable<any> {
    return interval(15000).pipe(
      switchMap(() =>
        this.getStockData().pipe(
          switchMap((quoteData) => this.kafkaService.sendToKafka(quoteData)),
        ),
      ),
    );
  }

  private getStockData(): Observable<any> {
    const url = `${this.ALPHA_VANTAGE_API_URL}${this.ALPHA_VANTAGE_API_KEY}`;

    return new Observable((observer) => {
      axios
        .get(url)
        .then((response) => {
          const { data } = response;
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
