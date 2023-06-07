import { Injectable } from '@nestjs/common';
import { KafkaClient, Producer, Consumer } from 'kafka-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService {
  private readonly producer: Producer;
  private readonly consumer: Consumer;

  constructor(private readonly configService: ConfigService) {
    const kafkaClient = new KafkaClient({
      kafkaHost: this.configService.get('KAFKA_HOST'),
    });

    this.producer = new Producer(kafkaClient);
    this.consumer = new Consumer(
      kafkaClient,
      [{ topic: this.configService.get('KAFKA_TOPIC_NAME') }],
      {
        groupId: this.configService.get('KAFKA_GROUP_ID'),
      },
    );
  }

  getConsumer(): Consumer {
    return this.consumer;
  }
}
