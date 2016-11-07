import fetchJsonp from 'fetch-jsonp'
const uploadImgToOss = (url, media_id)=> {
    const fullUrl = url + 'wx-base/media/json-p-upload-img2?' +
        'media_id=' + media_id;
    return fetchJsonp(fullUrl, {
        timeout: 3000
    }).then(function (response) {
        return response.json()
    }).then((response)=> {
        return JSON.parse(response);
    });
};
export default uploadImgToOss;