exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'guy'},
        {id: 2, username: 'girl'},
        {id: 3, username: 'it'}
      ]);
    });
};
