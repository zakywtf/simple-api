
 module.exports = {
    generate: (length, pin=true) => {
        // var length = 8,
        if (pin == true) {
            var charset = "0123456789"
        } else {
            if (length > 10) {
                var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            } else {
                var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            }
        }
        retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    },
 }