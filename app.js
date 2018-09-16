const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const Sequelize = require('sequelize');
const service = require('feathers-sequelize');

const sequelize = new Sequelize('sequelize', '', '', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite'),
  logging: false
});
const Message = sequelize.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
});

// Create an Express compatible Feathers application instance.
const app = express(feathers());

// Turn on JSON parser for REST services
app.use(express.json());
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({ extended: true }));
// Enable REST services
app.configure(express.rest());
// Enable Socket.io services
app.configure(socketio());
// Create an in-memory Feathers service with a default page size of 2 items
// and a maximum size of 4
app.use('/messages', service({
  Model: Message,
  paginate: {
    default: 2,
    max: 4
  }
}));
app.use(express.errorHandler());

Message.sync({ force: true }).then(() => {
  // Create a dummy Message
  app.service('messages').create({
    text: 'Message created on server'
  }).then(message => console.log('Created message', message));
});

// Start the server
const port = 5000;

app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
});
