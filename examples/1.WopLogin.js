/**
 * Created by dxc on 2016/10/29.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WopLogin} from 'wxjs';
class WopLoginExamples extends Component {
    render() {
        return (
            <WopLogin
                url="http://wop.dxcweb.com/service/"
                wx_app_id="wx5f069426b7e49373"
                is_get_user_info={false}
                userInfo={function(user) {
                  console.log(user,this)
                }}
            >
                <div>
                    微信登录成功！
                </div>
            </WopLogin>
        )
    }
}
ReactDOM.render(
    <WopLoginExamples />,
    document.getElementById('__react-content')
);