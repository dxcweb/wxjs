/**
 * Created by dxc on 2016/10/30.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WopSign} from 'wxjs';
class WopSignExamples extends Component {
    render() {
        return (
            <WopSign
                url="http://wop.dxcweb.com/service/"
                wx_app_id="wx5f069426b7e49373"
                debug={true}
                ready={(wx)=>{
                    // wx.xxx
                    console.log('微信签名完成');
                }}
            >
                <div>
                    微信签名完成！
                </div>
            </WopSign>
        )
    }
}
ReactDOM.render(
    <WopSignExamples />,
    document.getElementById('__react-content')
);