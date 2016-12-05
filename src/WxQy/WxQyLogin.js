/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import Base64 from '../utils/Base64'
import JsonP from '../utils/JsonP'
import Q from 'q'

export default class WxQyLogin extends Component {
    static defaultProps = {
        is_get_user_info: false,
        userInfoCB: (user)=> {
        }
    };
    state = {
        isLogin: false,
        manualLogin: false,
        manualLoginUrl: '',
        url: ''
    };
    //渲染前调用一次，这个时候DOM结构还没有渲染。fv
    componentWillMount() {
        const {url, userInfo}=this.props;
        if (url == null) {
            return false;
        }
        if (!this.state.isLogin) {
            this.jsonp().then((response)=> {
                const json = JSON.parse(response);
                if (json.url) {
                    this.login(json.url);
                } else {
                    this.setState({isLogin: true});
                    userInfo.call(this, json);
                }
            })
        }
    }

    login(url) {
        const me = this;
        var wx_login = document.createElement('a');
        wx_login.href = url;
        if (typeof wx_login.click == 'undefined') {
            location.href = url;
        }
        else {
            wx_login.click();
        }
        this.setTimeout = setTimeout(function () {
            me.setState({manualLogin: true, manualLoginUrl: url});
        }, 5000);
    }

    jsonp() {
        const {url}=this.props;
        const fullUrl = url + 'wx-base/login/json-p-get-my-info2?' +
            '&url=' + encodeURIComponent(Base64.encode(location.href));
        const promise = Q.defer();
        JsonP(fullUrl, 'WxQyUserInfo' + Math.floor(Math.random() * 10000));
        const timed = setTimeout(function () {
            alert('登录超时！');
        }, 10000);
        window.WxQyUserInfo = function (res) {
            clearTimeout(timed);
            window.WxQyUserInfo = null;
            promise.resolve(res);
        };
        return promise.promise;
    }

    render() {

        const {isLogin, manualLoginUrl, manualLogin}=this.state;
        if (manualLogin) {
            return (
                <div style={{textAlign:'center',marginTop:'50px'}}>
                    <a href={manualLoginUrl}>点击手动登录</a>
                </div>
            )
        }
        const {url}=this.props;
        if (url == null) {
            return <div>请设置wop的url</div>;
        }
        if (!isLogin) {
            return <div></div>
        }
        return this.props.children;
    }
}
