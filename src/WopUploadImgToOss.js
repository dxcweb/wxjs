import fetchJsonp from 'fetch-jsonp'
const uploadImgToOss = (url, wx_app_id, media_id)=> {
    const fullUrl = url + 'app/base/upload-img' +
        '?wx_app_id=' + wx_app_id +
        '&media_id=' + media_id;
    return fetchJsonp(fullUrl, {
        timeout: 30000
    }).then(function (response) {
        return response.json()
    }).then((response)=> {
        return JSON.parse(response);
    });
};
export default uploadImgToOss;