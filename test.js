r = require('rethinkdb');

r.connect({ host: 'localhost', port: 32769 }, function(err, conn) {

  if(err) throw err;
  connection = conn;

  // r.db('test')
  //   .tableDrop('authors')
  //   .run(connection)
  //   .then(() => r.tableCreate('authors').run(connection).then(result => console.log(result)));

  // r.db('test')
  //   .tableCreate('authors')
  //   .run(connection);

  r.db('test')
    .tableDrop('authors')
    .run(connection)
    .then(() => {
      return r.db('test').tableCreate('authors').run(connection);
    })
    .then(() => {
      return r.table('authors').insert([
          { name: "William Adama", tv_show: "Battlestar Galactica",
            posts: [
              {title: "Decommissioning speech", content: "The Cylon War is long over..."},
              {title: "We are at war", content: "Moments ago, this ship received word..."},
              {title: "The new Earth", content: "The discoveries of the past few days..."}
            ]
          },
          { name: "Laura Roslin", tv_show: "Battlestar Galactica",
            posts: [
              {title: "The oath of office", content: "I, Laura Roslin, ..."},
              {title: "They look like us", content: "The Cylons have the ability..."}
            ]
          },
          { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
            posts: [
              {title: "Civil rights", content: "There are some words I've known since..."}
            ]
          }
      ]).run(connection, function(err, result) {
          if (err) throw err;
          console.log(JSON.stringify(result, null, 2));
      })
    })
    .then(() => {
      return r.table('authors')
        .filter(r.row('name').match('Will'))
        .run(connection, function(err, cursor) {
          if (err) throw err;
          cursor.toArray(function(err, result) {
              if (err) throw err;
              console.log('==============================');
              console.log(JSON.stringify(result, null, 2));
              console.log('==============================');
          });
      });
    });

});
