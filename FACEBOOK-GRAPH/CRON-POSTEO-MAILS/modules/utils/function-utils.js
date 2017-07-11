var moment = require('moment');

function getLast7days() {
    const dayArray =[];
    dayArray.push(moment().format('DD MM YYYY'));
    dayArray.push(moment().subtract(1, "day").format('DD MM YYYY'));
    dayArray.push(moment().subtract(2, "day").format('DD MM YYYY'));
    dayArray.push(moment().subtract(3, "day").format('DD MM YYYY'));
    dayArray.push(moment().subtract(4, "day").format('DD MM YYYY'));
    dayArray.push(moment().subtract(5, "day").format('DD MM YYYY'));
    dayArray.push(moment().subtract(6, "day").format('DD MM YYYY'));
    return dayArray
}

module.exports = {
    getLast7days
};