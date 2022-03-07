import { log } from 'console';
import { MgmtArticleData } from '../utils/type'

// 返回置顶后的数组
export default function (arr: MgmtArticleData["articleList"]) {
    let newArr: MgmtArticleData["articleList"] = [];
    let oldArr: MgmtArticleData["articleList"] = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i].top === true ? newArr[0] = arr[i] : newArr = [];
    }
    if (newArr.length === 0) {
        return arr;
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].top === false) {
                oldArr.push(arr[i])
            }
        }
        newArr = newArr.concat(oldArr);
        return newArr;
    }
}