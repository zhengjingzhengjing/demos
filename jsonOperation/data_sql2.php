<?php
    $config = array(
        "host"      => "127.0.0.1", //host
        "username"  => "root",//用户名
        "password"  => "",//密码
        "dbname" => "qianduan",//数据库名称
    );
    $tablename = "cd_info"; //表名

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
    $type = "query";//类型; query：查询    insert:插入   update:更新    delete:删除
    if ($type == "query"){
        $result = mysqli_query($conn,"SELECT * FROM $tablename");
        $arr = array();
        while ($res = mysqli_fetch_array($result)){
            $arr[] = $res;
        }
        /*var_dump($arr);*/
        exit(json_encode(array("data"=>$arr,"code"=>1,"msg"=>"成功")));//接口给的json对象形式
    }else if ($type == "insert"){
        $insertSql = "INSERT INTO $tablename (column1, column2,...) VALUES (value1, value2,...)";
        //$insertSql = "INSERT INTO $tablename (name, password, sex) VALUES ('名字', 'password', '1')";
        $result = mysqli_query($conn, $insertSql);
        //var_dump($result);//打印$result看是否执行成功
        if ($result){
            exit(json_encode(array("code"=>1,"msg"=>"添加成功")));
        }else {
            exit(json_encode(array("code"=>0,"msg"=>"添加失败")));
        }
    }else if ($type == "update"){
        $sql = "update $tablename set column1='value1', column2='value2' ";
//         $sql = "update $tablename set password='11111' where id = 1";
        // 执行sql语句
        mysqli_query($conn, $sql);
        // 获取影响的行数
        $rows = mysqli_affected_rows($conn);
        //echo $rows;
        // 返回影响行数
        // 如果影响行数>=1,则判断添加成功,否则失败
        if ($rows >= 1){
            exit(json_encode(array("code"=>1,"msg"=>"编辑成功")));
        }else {
            exit(json_encode(array("code"=>0,"msg"=>"编辑失败")));
        }
    }else if ($type == "delete"){
        $sql = "delete from $tablename where id=1 ";
        // 执行删除
        mysqli_query($conn,$sql);
        // 获取影响的行数
        $rows = mysqli_affected_rows($conn);
        //echo $rows;
        // 返回影响行数
        // 如果影响行数>=1,则判断添加成功,否则失败
        if ($rows >= 1){
            exit(json_encode(array("code"=>1,"msg"=>"删除成功")));
        }else {
            exit(json_encode(array("code"=>0,"msg"=>"删除失败")));
        }
    }
    
?>