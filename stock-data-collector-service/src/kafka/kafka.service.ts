import { Injectable } from '@nestjs/common';
import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService {
  private readonly client: KafkaClient;
  private readonly producer: Producer;

  constructor(private readonly configService: ConfigService) {
    this.client = new KafkaClient({
      kafkaHost: this.configService.get('KAFKA_HOST'),
    });
    this.producer = new Producer(this.client);
  }

  sendToKafka(quoteData: any): Observable<any> {
    const payload: ProduceRequest[] = [
      {
        topic: this.configService.get('KAFKA_TOPIC_NAME'),
        messages: [JSON.stringify(quoteData)],
      },
    ];

    return new Observable((observer) => {
      this.producer.send(payload, (error, data) => {
        if (error) {
          observer.error(error);
        } else {
          observer.next(data);
          observer.complete();
        }
      });
    });
  }
}
