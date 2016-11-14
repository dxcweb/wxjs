/**
 * Created by dxc on 2016/10/30.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WxQySign} from 'wxjs';
class WopSignExamples extends Component {
    render() {
        return (
            <WxQySign
                url="http://21.net.fangstar.net/wxqy-zyb/"
                debug={true}
                ready={(wx)=>{
                    // wx.xxx
                    console.log('微信签名完成');
                }}
            >
                <div>
                    微信签名完成！
                </div>
            </WxQySign>
        )
    }
}
ReactDOM.render(
    <WopSignExamples />,
    document.getElementById('__react-content')
);