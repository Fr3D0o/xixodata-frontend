function sort(key, input, reversed) {
    let keyString = Object.keys(input.value[0])[key];

    function compare(a, b) {
        if (a[keyString] < b[keyString]) {
            return -1;
        }
        if (a[keyString] > b[keyString]) {
            return 1;
        }
        return 0;
    }

    function reverse(a, b) {
        if (a[keyString] < b[keyString]) {
            return 1;
        }
        if (a[keyString] > b[keyString]) {
            return -1;
        }
        return 0;
    }

    if (reversed) {
        return input.sort(reverse)
    } else {
        return input.sort(compare)
    }
}

export default sort
