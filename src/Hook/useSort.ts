import { MgmtArticleData } from '../utils/type'
// 数组优先级排序
export default function (arr: MgmtArticleData["articleList"]) {
    let newArr = [];
    newArr = arr.sort(function (a: any, b: any) {
        if (a.top < b.top) {
            return 1;
        } if (a.top > b.top) {
            return -1;
        }
        return 0;
    })
    return newArr;
}