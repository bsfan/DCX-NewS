// mysqlTest.js
//加载mysql Module
var Client = require('mysql').Client,
    client = new Client(),
    //DB name
    DATABASE = "dcxnews";
    //要创建的表名
    TEST_TABLE = 'raw_url';

//用户名
client.user = 'root';
//密码
client.password = '';
//创建连接
//client.connect();

// If no callback is provided, any errors will be emitted as `'error'`
// events by the client
client.query('USE '+DATABASE);
client.query(
  'CREATE TABLE if not exists '+TEST_TABLE+
  '(id INT(11) AUTO_INCREMENT NOT NULL, '+
  'ctg int(4) NOT NULL, '+
  'title VARCHAR(300) default NULL, '+
  'link VARCHAR(300) default NULL, '+
  'post_date datetime default NULL, '+
  'created DATETIME, '+
  'PRIMARY KEY (id))'
);

client.end();