function calc(pointArr, creditArr) {
    let numerator = 0
    let creditSum = 0

    pointArr.forEach((el, i) => {
        numerator += el * creditArr[i];
    })
    creditArr.forEach((el) => {
        creditSum += el;
    })

    return (numerator / creditSum).toFixed(2);

}

export default calc;