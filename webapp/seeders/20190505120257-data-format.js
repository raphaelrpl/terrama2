'use strict';

const Application = require('../core/Application');

module.exports = {
  up: function (queryInterface, /*Sequelize*/) {
    // Prepare context to insert multiple semantics
    const bulkData = [
      { name: 'TXT', description: 'test'},
    ]

    return queryInterface.bulkInsert('data_formats', bulkData);
  },

  down: function (queryInterface, /*Sequelize*/) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('data_formats', { name: 'TXT' }, {});
  }
};
