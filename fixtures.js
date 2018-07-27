const { FAKE_DATA_SEED } = require('./config.js');
const moment = require('moment');
const faker = require('faker');
const _ = require('lodash');

// add in seed for fake data
faker.seed(FAKE_DATA_SEED);

module.exports = () => {
  // generate test categories
  const categories = [
    {
      model: 'Category',
      data: {
        title: 'Food',
        description: faker.lorem.sentence(),
        id: faker.random.uuid(),
      },
    },
    {
      model: 'Category',
      data: {
        title: 'Utilities',
        description: faker.lorem.sentence(),
        id: faker.random.uuid(),
      },
    },
    {
      model: 'Category',
      data: {
        title: 'Leisure',
        description: faker.lorem.sentence(),
        id: faker.random.uuid(),
      },
    },
    {
      model: 'Category',
      data: {
        title: 'Travel',
        description: faker.lorem.sentence(),
        id: faker.random.uuid(),
      },
    },
    {
      model: 'Category',
      data: {
        title: 'Business',
        description: faker.lorem.sentence(),
        id: faker.random.uuid(),
      },
    },
  ];

  // generate fake expenses
  const expenses = [...Array(100).keys()].map(() => ({
    model: 'Expense',
    data: {
      id: faker.random.uuid(),
      title: faker.commerce.product(),
      date: faker.date.between(moment().subtract(30, 'days').toDate(), moment().toDate()),
      value: faker.commerce.price(),
      category_id: _.sample(categories).data.id,
    }
  }));
  return [...categories, ...expenses];
};
