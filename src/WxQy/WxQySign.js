/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import fetchJsonp from 'fetch-jsonp'
import Base64 from '../utils/Base64'

export default class WxQySign extends Component {
    state = {
        init: false
    };
    static defaultProps = {
        debug: false,
        ready: (wx)=> {
        },
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
    };

    //渲染前调用一次，这个时候DOM结构还没有渲染。fv
    componentWillMount() {
        const {debug, jsApiList,ready}=this.props;
        const me = this;
        this.jsonp().then((response)=> {
            const data = JSON.parse(response);
            data.debug = debug;
            data.jsApiList = jsApiList;
            me.wxConfig(data);
            wx.ready(function () {
                if (me.timeout) {
                    clearTimeout(me.timeout);
                }
                ready(wx);
                me.setState({init: true});
            });
        })
    }

    wxConfig(data) {
        console.log('wxConfig');
        const me = this;
        wx.config(data);
        this.timeout = setTimeout(function () {
            me.wxConfig(data);
        }, 2000);
    }

    jsonp() {
        const {url}=this.props;
        const fullUrl = url + 'wx-base/jsapi-ticket/json-p-get-sign-package3?' +
            '&url=' + encodeURIComponent(Base64.encode(location.href));
        return fetchJsonp(fullUrl, {
            timeout: 30000,
            jsonpCallbackFunction: 'WxQySignPackage'
        }).then(function (response) {
            return response.json()
        });
    }

    render() {

        const {init}=this.state;
        const {url, children}=this.props;
        if (url == null) {
            return <div>请设置wxqy的url</div>;
        }
        if (!init) {
            return <div></div>
        }
        return children;
    }
}
