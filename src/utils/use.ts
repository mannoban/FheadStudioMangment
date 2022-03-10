/* 
 格式化日期YY-MM-DD hh:ss:mm
*/
export const formatTime = (time: number): string => {
    let date = new Date(time);
    let y: number = date.getFullYear();
    let m: number = date.getMonth() + 1;
    let d: number = date.getDate();
    let h: number = date.getHours();
    let min: number = date.getMinutes();
    let s: number = date.getSeconds();
    let formatTime: string = `${y}-${m > 10 ? m : "0" + m}-${d > 10 ? d : "0" + d} ${h > 10 ? h : "0" + h}:${min > 10 ? min : "0" + min}:${s > 10 ? s : "0" + s}`;
    return formatTime;
}

/* 
获取Url中的参数
*/
export const getRequest = (urlStr?: string): object => {
    let url = '';
    if (typeof urlStr === 'undefined') {
        url = decodeURI(location.search)
    } else {
        url = `?${urlStr.split("?")[1]}` //获取url?后的字符
    }
    const theRequest = new Object();
    if (url.indexOf("?") != -1) {
        const str = url.substring(1);
        const strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1])
        }
    }
    return theRequest;
}
/* 
提取文章摘要前155个字
*/
export const mdToText = (str: string) => {
    str = str.replace(/(\*\*|__)(.*?)(\*\*|__)/g, '') //全局匹配内粗体
        .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g, '')   //全局匹配图片
        .replace(/\[[\s\S]*?\]\([\s\S]*?\)/g, '')     //全局匹配连接
        .replace(/<\/?.+?\/?>/g, '')                  //全局匹配内html标签
        .replace(/(\*)(.*?)(\*)/g, '')                //全局匹配内联代码块
        .replace(/`{1,2}[^`](.*?)`{1,2}/g, '')        //全局匹配内联代码块
        .replace(/```([\s\S]*?)```[\s]*/g, '')        //全局匹配代码块
        .replace(/\~\~(.*?)\~\~/g, '')                //全局匹配删除线
        .replace(/[\s]*[-\*\+]+(.*)/g, '')            //全局匹配无序列表
        .replace(/[\s]*[0-9]+\.(.*)/g, '')            //全局匹配有序列表
        .replace(/(#+)(.*)/g, '')                     //全局匹配标题
        .replace(/(>+)(.*)/g, '')                     //全局匹配摘要
        .replace(/\r\n/g, "")                         //全局匹配换行
        .replace(/\n/g, "")                           //全局匹配换行
        .replace(/\s/g, "")                           //全局匹配空字符;
    return str.slice(0, 155);
}

/* 
 函数防抖
*/

/* 
函数节流
*/

