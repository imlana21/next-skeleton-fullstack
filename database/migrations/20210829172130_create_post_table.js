/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('title');
    table.text('content');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.droptTable('posts');
};
