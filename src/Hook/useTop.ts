// 返回置顶后的数组
export default function (arr: any) {
    let newArr: any = [];
    let oldArr: any = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i].top === true ? newArr.push(arr[i]) : oldArr.push(arr[i])
    }
    if (newArr.length === 0) {
        newArr = arr;
    } else {
        newArr = newArr.concat(oldArr);
    }
    return newArr;
}