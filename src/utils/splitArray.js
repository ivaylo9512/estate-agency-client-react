const splitArray = (arr, take) => {
    return arr.reduce((result, el, i) =>  {
        const page = Math.floor(i / take);
        result[page] = result[page] ? (result[page].push(el), result[page]) : [el];

        return result;
    },[])
}
export default splitArray