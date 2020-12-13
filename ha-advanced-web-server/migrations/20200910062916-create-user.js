'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      //TODO : user 테이블에 필요한 스키마를 정의 하세요
      //공식 문서를 이용해 직접 정의하는 대신, 이 파일을 지우고, sequelize-cli를 이용해 다시 만들어도 좋습니다.
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};