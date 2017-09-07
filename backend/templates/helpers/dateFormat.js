var dateFormat = function(date, context) {
    if(!date) {
        return ''
    }
    return date.toISOString().slice(0,10).replace(/-/g,"/");
};

module.exports = dateFormat;