const mysql = require('mysql');

// MySQL接続情報を環境変数から取得
const mysqlHost = process.env.MYSQL_HOST;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlDatabase = process.env.MYSQL_DATABASE;

// MySQLに接続
const connection = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL接続エラー: ' + err.stack);
    return;
  }
  console.log('MySQLに接続しました');
});

// データベースからデータを取得する例
connection.query('SELECT * FROM テーブル名', (err, results) => {
  if (err) {
    console.error('クエリエラー: ' + err.stack);
    return;
  }
  console.log('取得したデータ:', results);
});

// MySQL接続を閉じる
connection.end((err) => {
  if (err) {
    console.error('MySQL切断エラー: ' + err.stack);
    return;
  }
  console.log('MySQL接続を閉じました');
});




// // mysqlモジュールを読み込む
// const mysql = require('mysql');

// // MySQLに接続するための設定
// const connection = mysql.createConnection({
//   host: '10.244.0.6', // ホスト名変更
//   user: 'USER', // ユーザー名
//   password: 'password', // パスワード
//   database: 'ezpoc' // データベース名
// });

// // MySQLに接続する
// connection.connect((err) => {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

// // userテーブルからidとpwを取得する
// connection.query('SELECT id, pw FROM user', (err, rows, fields) => {
//   if (err) {
//     console.error('error querying: ' + err.stack);
//     return;
//   }
//   console.log('query results: ', rows);

//   // ユーザーからidとpwを入力させる
//   const readline = require('readline');
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.question('Please enter your id: ', (answer1) => {
//     rl.question('Please enter your password: ', (answer2) => {
//       // 入力されたidとpwがuserテーブルの値と一致しているかチェックする
//       let match = false;
//       for (let row of rows) {
//         if (row.id === answer1 && row.pw === answer2) {
//           match = true;
//           break;
//         }
//       }
//       // 一致していたら200を返す
//       if (match) {
//         console.log(200);
//       } else {
//         console.log('Invalid id or password');
//       }
//       rl.close();
//     });
//   });
// });

// // MySQLから切断する
// connection.end((err) => {
//   if (err) {
//     console.error('error ending: ' + err.stack);
//     return;
//   }
//   console.log('connection end');
// });
