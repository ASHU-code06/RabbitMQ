var amqp = require("amqplib/callback_api"); //this package give response in promise

amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "testingRabbitMQ";
    channel.assertQueue(queueName,{
        durable: false
    });
    channel.consume(queueName,(msg)=>{
        console.log(`Received : ${msg.content.toString()}`);
    },{
        noAck: true
    })
  });
});
