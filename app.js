// mysqlモジュールを読み込む
const mysql = require('mysql');

// MySQLに接続するための設定
const connection = mysql.createConnection({
  host: 'mysql-57-centos7-667dc6579d-8hqw5', // ホスト名変更
  user: 'USER', // ユーザー名
  password: 'password', // パスワード
  database: 'ezpoc' // データベース名
});

// MySQLに接続する
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// userテーブルからidとpwを取得する
connection.query('SELECT id, pw FROM user', (err, rows, fields) => {
  if (err) {
    console.error('error querying: ' + err.stack);
    return;
  }
  console.log('query results: ', rows);

  // ユーザーからidとpwを入力させる
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Please enter your id: ', (answer1) => {
    rl.question('Please enter your password: ', (answer2) => {
      // 入力されたidとpwがuserテーブルの値と一致しているかチェックする
      let match = false;
      for (let row of rows) {
        if (row.id === answer1 && row.pw === answer2) {
          match = true;
          break;
        }
      }
      // 一致していたら200を返す
      if (match) {
        console.log(200);
      } else {
        console.log('Invalid id or password');
      }
      rl.close();
    });
  });
});

// MySQLから切断する
connection.end((err) => {
  if (err) {
    console.error('error ending: ' + err.stack);
    return;
  }
  console.log('connection end');
});
