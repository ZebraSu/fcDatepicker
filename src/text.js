function dateToDate(date) {
    var sDate = new Date();
    if (typeof date == 'object'
        && typeof new Date().getMonth == "function"
    ) {
        sDate = date;
    }
    else if (typeof date == "string") {
        var arr = date.split('-')
        if (arr.length == 2) {
            sDate = new Date(arr[0] + '-' + arr[1]);
        }
    }
    return sDate;
}
function addMonth(date, num) {
    num = parseInt(num);
    var sDate = dateToDate(date);

    var sYear = sDate.getFullYear();
    var sMonth = sDate.getMonth() + 1;

    var eYear = sYear;
    var eMonth = sMonth + num;
    while (eMonth > 12) {
        eYear++;
        eMonth -= 12;
    }
    var eDate = new Date(eYear, eMonth - 1);
    while (eDate.getMonth() != eMonth - 1) {
        eDate = new Date(eYear, eMonth - 1);
    }
    return eDate;
}
console.log(addMonth('2017-06','3'))