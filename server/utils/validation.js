// validators that can be used throughout the site

var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
}

var forceLowerCase = (str) => {
    return typeof str === 'string' && str.value === str.toLowerCase();
}

module.exports = { isRealString, forceLowerCase };