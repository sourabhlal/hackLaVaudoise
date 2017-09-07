var isEqual = function(first, second, context) {
    if (first === second) {
        context.fn(this);
    } else {
        context.inverse(this);
    }
};

module.exports = isEqual;