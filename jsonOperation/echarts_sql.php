<?php
    $config = array(
        "host"      => "127.0.0.1", //host
        "username"  => "root",//用户名
        "password"  => "",//密码
        "dbname" => "qianduan",//数据库名称
    );
    $tablename = "address"; //表名

    //旧版的  现在换成下面新的链接字段    http://www.ttlsa.com/php/deprecated-mysql-connect/
    //mysql_connect($config['host'],$config['username'],$config['password']);
    //mysql_select_db($config['dbname']);
    //mysql_query("set names utf-8");

    $conn = mysqli_connect($config['host'],$config['username'],$config['password'],$config['dbname']);
    mysqli_query($conn,"set names utf-8");

    if(!$conn){
        die('连接数据库失败: '.mysql_error());
        return;
    }
//    echo "mysql 连接成功！";

    
    $result = mysqli_query($conn,"SELECT * FROM $tablename");
//    var_dump($result);

    $arr = array();
    while ($res = mysqli_fetch_array($result)){
        $arr[] = $res;
    }
    //var_dump($arr);

    exit(json_encode(array("data"=>$arr,"code"=>1,"msg"=>"成功")));//接口给的json字符串形式


    
    
?>