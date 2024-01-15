function chooseRandom(array) {
    let index = Math.floor(Math.random() * array.length)
    return array[index]
}

module.exports = { chooseRandom }
