var year = 2016;
var month = 9;
//第一个值 2017/10
for(var j=0;j<30;j++){
    console.log("第"+(j+1)+"次点击");
    for(var i=0;i<4;i++){
        month++;
        if(month>12){
            year++;
            month = 1;
        }
        console.log(year+"/"+month);
    }
    month = month-3;
    if(month<=0){
        month = month+12;
        year--;
    }
}