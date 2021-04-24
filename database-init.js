// const sqlite3 = require('sqlite3');
// const sqlite = require('sqlite');

// const openDb = async () => {
//   return sqlite.open({
//     filename: './data_viewer.db',
//     driver: sqlite3.Database,
//   });
// };

// const setup = async () => {
//   const db = await openDb();

//   await db.getDatabaseInstance().serialize(function () {
//     db.all("select name from sqlite_master where type='table'", function (
//       err,
//       tables,
//     ) {
//       console.log(err);
//       console.log(tables);
//     });
//   });

//   await db.migrate({
//     migrationsPath: './src/migrations',
//     force: 'last',
//   });

//   const member_progress = await db.all(
//     'SELECT COUNT(*) FROM member_progress_by_date',
//   );
//   console.log(
//     'member progress by date count: ',
//     JSON.stringify(member_progress, null, 2),
//   );
//   //const members = await db.all('SELECT * FROM Member LIMIT 10');
//   const members_cnt = await db.all('SELECT COUNT(*) FROM Member');
//   console.log('members count:', JSON.stringify(members_cnt, null, 2));
//   //console.log('all members', JSON.stringify(members, null, 2));
// };

// setup();
