<?php
header("Content-Type:application/json");
$output=[];
@$phone=$_request["phone"];
if(empty($phone)){
    echo "[]";
    return;
}
$conn=mysqli_connect("127.0.0.1","root","","kaifanla");
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="select kf_order.oid,kf_order.user_name,kf_order.time where kf_order.did=kf_dish.did and kf_order.phone="$phone"";
$result=mysqli_query($conn,$sql);
while(($row=mysqli_fetch_assoc($result))!==null){
    $output[]=$row;
}
echo json_encode($output);
?>