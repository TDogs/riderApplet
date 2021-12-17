function withData(param) {
  return param < 10 ? '0' + param : '' + param;
} 
function getLoopArray(start, end,txt) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i)+txt);
  }
  return array;
}
function getMonthDay(year, month,setDATE) {
  year = parseInt(year);
  
  var myDate = new Date();
  var nowY = myDate.getFullYear();    
  var nowM = myDate.getMonth();       
  var nowD = myDate.getDate();       
  var nowH = myDate.getHours();      
  month = month.replace(/月/g,'');
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
  var txt='月';
  var dd = 1;
  if(setDATE != 1){
    if(year == nowY  && month == parseInt(nowM+1)) {
      dd = nowD;
      if(nowH+5 > 20){
        dd++;
      }
    }
  }
   
  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getLoopArray(dd, 31,'日')
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      array = getLoopArray(dd, 30, '日')
      break;
    case '02':
      array = flag ? getLoopArray(dd, 29, '日') : getLoopArray(dd, 28, '日')
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
 
  return array;
}

function getYearMonth(newyear) {
  var newDate = new Date(); 
  var nowY = newDate.getFullYear();    
  var nowM = newDate.getMonth();       
  var nowD = newDate.getDate();       
  var nowH = newDate.getHours();      
  
  var year = (newDate.getFullYear()),
    mont = (newDate.getMonth()+1);
  if (newyear>year){
    mont=1;
  }
  var txt="月";
  var start = mont;
  var end = 12;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i) + txt);
  } 
  return array;
}
function getNewDateArry() {
  // 当前时间的处理
  var newDate = new Date(); 
  var year = withData(newDate.getFullYear()),
    mont = withData(newDate.getMonth() + 1),
    date = withData(newDate.getDate()),
    hour = withData(newDate.getHours()),
    minu = withData(newDate.getMinutes()),
    seco = withData(newDate.getSeconds());

  return [year + '年', mont + '月', date + '日', hour + '时', minu, seco];
}
function dateTimePicker(startYear, endYear, date,change,mmonth,dday,hhour) {
  

  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[], [], [], [], []];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  // 处理联动列表数据
  /*年月日 时分秒*/
  
  var myDate = new Date();
  var nowY = myDate.getFullYear();    
  var nowM = myDate.getMonth();       
  var nowD = myDate.getDate();       
  var nowH = myDate.getHours();  
  var setHour = nowH+5;
  var setDATE = nowD;
  var setMonth = nowM+1;
  var setYear = nowY;
 
 if(change == 1){
  setYear++;
  setHour = 10;
  setDATE = setMonth = 1;
 }else{
   if(change == 2){
     if(mmonth){
       if(mmonth != nowM+1){
        
        setDATE = 1;
        setHour = 10;
       }else{ 
         if(nowD != dday){
          setHour = 10;
         }
        setDATE = dday;
       }
    
     }else if(dday){
      if(nowD != dday){
        setDATE = dday;
        setHour = 10;
       }
     }
    setYear = nowY;
   }
  if(nowY == startYear) {
    var nextMonthFirstDay=new Date(new Date(myDate).getFullYear(),nowM+1,1);
  }else{
      var nextMonthFirstDay=new Date(new Date(e.detail.item.text+'-1').getFullYear(),nowM+1,1);
  }
  var oneDay=1000*60*60*24;
  var dateString=new Date(nextMonthFirstDay-oneDay);
  var ddStr = dateString.toLocaleDateString();
  var dd = ddStr.split("/")
  if(setHour > 20){
    setHour = 10;
    setDATE++;
    if(setDATE > dd[2]){
      setMonth++;
      if(setMonth > 12){
        setYear++;
        setHour = 10;
        setDATE = setMonth = 1;
      }
    }
  }
 }
 
  dateTimeArray[0] = getLoopArray(startYear, end, '年');
  dateTimeArray[1] = getLoopArray(setMonth, 12, '月');
  dateTimeArray[2] = getMonthDay(setYear, defaultDate[1],setDATE);
  dateTimeArray[3] = getLoopArray(setHour, 20, '时');
  dateTimeArray[4] = getLoopArray(0, 0);
  //dateTimeArray[5] = getLoopArray(0, 59);
   
  dateTimeArray.forEach((current, index) => { 
    dateTime.push(current.indexOf(defaultDate[index]));
  });

 
  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}

function getNewDate(date) {
  date = date.replace(/-/g, '/');
 
  // 当前时间的处理
  var start_hour = 10;
  var last_hour=20;
  var newDate = new Date(date);
  var year = withData(newDate.getFullYear())
  var  mont = withData(newDate.getMonth() + 1)
  var  date = withData(newDate.getDate())
  var  hour = withData(newDate.getHours())
  var  minu = withData(newDate.getMinutes())
  var  seco = withData(newDate.getSeconds())
  var next_date=newDate
  if (hour < start_hour){
     next_date = newDate.setDate(newDate.getDate())  
     hour = 10;
  }else if (hour > last_hour){  // 20200723 修改为“”
     next_date = newDate.setDate(newDate.getDate()+1)  
     hour = 10;
  }
  next_date = new Date(next_date)
  year = withData(next_date.getFullYear());
  mont = withData(next_date.getMonth() + 1);
  date = withData(next_date.getDate());
 
  minu = 0;
  seco = 0;
  return year + '年-' + mont + '月-' + date + '日 ' + hour + '时:' + minu +":"+ seco;
}


module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay,
  getNewDate: getNewDate,
  getYearMonth: getYearMonth, 
  withData: withData,
} 