/**
 * Created by dxc on 2016/10/29.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WxQyLogin} from 'wxjs';
class WopLoginExamples extends Component {
    render() {
        return (
            <WxQyLogin
                url="http://21.net.fangstar.net/wxqy-zyb/"
                userInfo={(user)=> (console.log(user))}
            >
                <div>
                    微信登录成功！
                </div>
            </WxQyLogin>
        )
    }
}
ReactDOM.render(
    <WopLoginExamples />,
    document.getElementById('__react-content')
);