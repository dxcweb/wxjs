/**
 * Created by dxc on 2016/10/29.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WxLogin} from 'wxjs';
class WopLoginExamples extends Component {
    render() {
        return (
            <WxLogin
                url="http://21.net.fangstar.net/wx-base/"
                app_key="abc123"
                is_get_user_info={true}
                userInfo={function(user) {
                  console.log(user)
                }}
            >
                <div>
                    微信登录成功！
                </div>
            </WxLogin>
        )
    }
}
ReactDOM.render(
    <WopLoginExamples />,
    document.getElementById('__react-content')
);