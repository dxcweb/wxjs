import JsonP from '../utils/JsonP'
import Q from 'q'

const uploadImgToOss = (url, media_id)=> {
    const callback = 'WxQyUploadImgToOss' + Math.floor(Math.random() * 10000);
    const fullUrl = url + 'wx-base/media/json-p-upload-img2?' +
        'media_id=' + media_id +
        '&callback=' + callback;
    const promise = Q.defer();
    JsonP(fullUrl, callback);
    const timed =  setTimeout(function () {
        promise.reject(new Error("Timed out"));
    }, 6000);
    window[callback] = function (res) {
        clearTimeout(timed);
        window[callback]=null;
        promise.resolve(res);
    };
    return promise.promise.then(function (res) {
        return JSON.parse(res)
    });
};
export default uploadImgToOss;