export const ScanUrl = [];

export const idFunction = (length) => {
    var randomChars = '0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return Number(result);
}

export const generateUID = (arrValue) => {
    arrValue.forEach(bindId => {
        bindId.id = idFunction(3)
    })
    return arrValue
}