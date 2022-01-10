function dateFormatter(date){
    date = date.replace(/^(\d{4})-0?(\d{1,2})-0?(\d{1,2}).*/, '$2 $3 $1').split(' ')
    let month = date[0]
    let day = date[1]
    switch (month) {
        case '1':
            month = 'Jan'
            break;
        case '2':
            month = 'Feb'
            break;
        case '3':
            month = 'Mar'
            break;
        case '4':
            month = 'Apr'
            break;
        case '5':
            month = 'May'
            break;
        case '6':
            month = 'Jun'
            break;
        case '7':
            month = 'Jul'
            break;
        case '8':
            month = 'Aug'
            break;
        case '9':
            month = 'Sept'
            break;
        case '10':
            month = 'Nov'
            break;
        case '11':
            month = 'Jan'
            break;
        case '12':
            month = 'Dec'
            break;
    }
    switch (day) {
        case day[1] === '1':
        case '11':
            day += 'th';
            break;
        case '12':
            day += 'th'
            break;
        case '13':
            day += 'th'
            break;
        case '1':
            day += 'st';
            break;
        case '2':
            day += 'nd'
            break;
        case '3':
            day += 'rd'
            break;
        case '21':
            day += 'st';
            break;
        case '22':
            day += 'nd'
            break;
        case '23':
            day += 'rd'
            break;
        case '31':
            day += 'st';
            break;
        default:
            day += 'th'
            break;
    }
    day += ','
    date.splice(0, 2, month, day)
    return date.join(' ')
}