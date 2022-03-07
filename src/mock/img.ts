import * as Mock from 'mockjs'

const getImage = () => {
    const urlArr = [
        'http://images.gongzuoshouji.cn/teacher/2021-08-09/84751fbcf153487f868a21a77048d19c.jpg',
        'http://images.gongzuoshouji.cn/teacher/20210804/196b0fa5d1726432492ad5edae6a565b.jpg',
        'http://images.gongzuoshouji.cn/teacher/20210730/a8e65bfaf7575a051a45b8dedd528af4.jpg',
    ]
    const index = Mock.Random.integer(0, urlArr.length - 1)
    return urlArr[index];
}

// 上传图片
Mock.mock('http://127.0.0.1:8080/api/v1/image/upload', 'post', {
    imageId: getImage()
});