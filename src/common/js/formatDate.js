
export function formatDate(fmt){
  var oDate =new Date(fmt);
  var O = {
    oYear : oDate.getFullYear(),
    oMon : (oDate.getMonth()+1),
    oDay : oDate.getDate(),
    oHour: oDate.getHours(),
    oMinutes:oDate.getMinutes(),
  }
  for(var key in O){
    O[key] = (O[key] >= 10 ? O[key] : '0'+O[key])
  }
  return O.oYear+"-"+ O.oMon+"-"+ O.oDay+" "+ O.oHour+':'+ O.oMinutes;
}
