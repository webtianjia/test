//测试
const ajaxUrl =
    process.env.VUE_APP_TEST === "development"
        ? "www"
        : "bbb";
//production  && development

const wechatCode = 'PLATFORM_CN';
export {ajaxUrl,wechatCode}


