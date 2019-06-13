import {ajaxUrl} from '@/utils/url'
const goTo = function (url, data = null, other = null) {
    // @ts-ignore
    this.$router.push({
        path: url,
        query: {data},
        other
    });
};
const formatNumber = (n) => {
    const str = n.toString();
    return str[1] ? str : `0${str}`
};

const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(formatNumber).join("/");
    const t2 = [hour, minute, second].map(formatNumber).join(":");

    return `${t1} ${t2}`;
};

const ResetData = obj => {
    for (let item in obj) {
        if (item) {
            let [object, type] = Object.prototype.toString.call(obj[item]).split(" ");
            switch (type.split("]").join("")) {
                case "Array" :
                    obj[item] = [];
                    break;
                case "String":
                    obj[item] = "";
                    break;
                case "Object":
                    obj[item] = null;
                    break;
                case "Boolean":
                    obj[item] = false;
                    break;
                default:
                    obj[item] = "";
                    break;
            }
        }
    }
    return obj;
}
const showTotal = (options) => {
    // @ts-ignore
    Megalo.showToast({
        ...options,
        icon: "none",
        mask: true,
        duration: 1500
    })
};
const showLoading = (options) => {
    // @ts-ignore
    Megalo.showLoading({
        mask: true,
        ...options
    })
};
const hideLoading = () => {
    // @ts-ignore
    Megalo.hideLoading()
};
const showModal = (options) => {
    // @ts-ignore
    Megalo.showModal(options)
};

const uploadImg = (options, validate: any = null) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        // @ts-ignore
        Megalo.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera']
        }).then(response => {
            const tempFilePaths = response.tempFilePaths[0];
            // @ts-ignore
            Megalo.getImageInfo({
                src: tempFilePaths
            }).then(response => {
                if (validate && (response.width > validate.width || response.height > validate.height)) {
                    reject(`尺寸不得超过${validate.width}*${validate.height}`);
                    return false
                }
            });
            const size = response.tempFiles[0].size;
            if (size > 1000000) {
                showTotal({title: "图片大小不得超过1M"});
                return
            }
            showLoading({
                title: '上传中...'
            });
            // @ts-ignore
            Megalo.uploadFile({
                ...options,
                url: ajaxUrl + '/non/uploadImg',
                filePath: tempFilePaths
            }).then(response => {
                resolve(response.data);
                hideLoading()
            }).catch(error => {
                reject("上传图片错误")
                hideLoading()
            })

        }).catch(error => {
            reject("选择图片失败!")
        })
    })
};

export {
    ResetData,
    formatTime,
    formatNumber,
    goTo,
    showTotal,
    showLoading,
    hideLoading,
    showModal,
    uploadImg
}