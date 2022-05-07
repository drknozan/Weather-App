const validation = (str) => {
    const regex = /^[A-Za-z\s]+$/;
    if(regex.test(str) && str.length < 20) {
        return true;
    }
    return false;
}

module.exports = {
    validation,
}