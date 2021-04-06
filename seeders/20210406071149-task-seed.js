'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tasks", [
      {
        title: "Kanban portfolio!",
        category: "doing",
        due: "2021-04-09",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "grinding gbf!?",
        category: "backlog",
        due: "2021-04-30",
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Todo portfolio!",
        category: "done",
        due: "2021-04-03",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tasks", null, {})
  }
};
