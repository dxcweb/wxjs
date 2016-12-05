/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import Base64 from '../utils/Base64'
import Q from 'q'
import JsonP from '../utils/JsonP'

export default class WopSign extends Component {
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
        const {debug, jsApiList, ready}=this.props;
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
        const {url, wx_app_id}=this.props;
        const fullUrl = url + 'app/base/sign?' +
            'wx_app_id=' + wx_app_id +
            '&url=' + encodeURIComponent(Base64.encode(location.href));
        const promise = Q.defer();
        JsonP(fullUrl, 'WopSign' + Math.floor(Math.random() * 10000));
        const timed = setTimeout(function () {
            alert('签名超时！');
        }, 10000);
        window.WopSign = function (res) {
            clearTimeout(timed);
            window.WopSign = null;
            promise.resolve(res);
        };
        return promise.promise;
    }

    render() {

        const {init}=this.state;
        const {wx_app_id, url}=this.props;
        if (wx_app_id == null) {
            return <div>请设置wx_app_id</div>;
        }
        if (url == null) {
            return <div>请设置wop的url</div>;
        }
        if (!init) {
            return <div></div>
        }
        return this.props.children;
    }
}
