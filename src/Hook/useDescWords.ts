import { computed } from 'vue'
// 计算剩余字数
export default computed(() => {
    return function (total: number, txtLength: number): number {
        let remainLength = total - txtLength;
        return remainLength;
    };
});