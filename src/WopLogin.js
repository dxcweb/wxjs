/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import fetchJsonp from 'fetch-jsonp'
import Base64 from './utils/Base64'

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
        const {url, wx_app_id, userInfo}=this.props;
        if (url == null || wx_app_id == null) {
            return false;
        }
        if (!this.state.isLogin) {
            this.jsonp().then((response)=> {
                const json = JSON.parse(response);
                if (json.url) {
                    this.login(json.url);
                } else {
                    this.setState({isLogin: true});
                    userInfo(json);
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
        const {url, is_get_user_info, wx_app_id}=this.props;
        const fullUrl = url + 'app/base/login?' +
            'wx_app_id=' + wx_app_id +
            '&is_user_info=' + is_get_user_info +
            '&url=' + encodeURIComponent(Base64.encode(location.href));
        return fetchJsonp(fullUrl, {
            timeout: 30000,
            jsonpCallbackFunction: 'WopUserInfo'
        }).then(function (response) {
            return response.json()
        });
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
        const {wx_app_id, url}=this.props;
        if (wx_app_id == null) {
            return <div>请设置wx_app_id</div>;
        }
        if (url == null) {
            return <div>请设置wop的url</div>;
        }
        if (!isLogin) {
            return <div></div>
        }
        return this.props.children;
    }
}
