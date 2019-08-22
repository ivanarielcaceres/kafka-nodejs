/*
 * node-rdkafka - Node.js wrapper for RdKafka C/C++ library
 *
 * Copyright (c) 2016 Blizzard Entertainment
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

var Transform = require('stream').Transform;

const Kafka = require('node-rdkafka');

var stream = Kafka.KafkaConsumer.createReadStream({
  'metadata.broker.list': 'localhost:9092',
  'group.id': 'librd-test',
  'socket.keepalive.enable': true,
  'enable.auto.commit': false
}, {}, {
  topics: 'kafka-test-topic',
  waitInterval: 0,
  objectMode: false
});

stream.on('data', function(message) {
    console.log('Got message');
    console.log(message.toString());
  });

stream.on('error', function(err) {
  if (err) console.log(err);
  process.exit(1);
});

//stream
//  .pipe(process.stdout);

stream.on('error', function(err) {
  console.log(err);
  process.exit(1);
});

stream.consumer.on('event.error', function(err) {
  console.log(err);
})