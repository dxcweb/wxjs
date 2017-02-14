/**
 * Created by dxc on 2016/10/30.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WxSign, WxUploadImgToOss} from 'wxjs';
import Clipboard from 'clipboard'
import {WxFlowLayoutImagePicker} from 'react-imagepicker';
import Loading from './Loading';
class WxUploadImgToOssExamples extends Component {
    state = {
        loading: false,
        serverIds: []
    };

    wx_url = "http://21.net.fangstar.net/wx-base/";
    app_key = "abc123";

    componentDidMount() {
        //复制调试
        new Clipboard('.btn');
    }

    getImageUrl(value) {
        if (value.localId != null) {
            return value.localId;
        }
        return value.url;
    }

    uploadImage(serverId, localId, callback) {
        const me = this;
        const {serverIds}=this.state;
        serverIds.push(serverId);
        this.setState({serverIds});
        //serverId = 'mVB_3IMUO7s-IzAHD3LashhhtZEKphw8tREurulCM5WQSMzvCXck0CmbEnBdH5l_';
        WxUploadImgToOss(me.wx_url, me.app_key, serverId).then(function (res) {
            if (res.result) {
                res.data.localId = localId;
                callback(res.data);
            } else {
                alert(res.msg);
                callback(false);
            }
        }).catch(function (ex) {
            alert("上传错误,请重试！");
            callback(false);
        });
    }

    onLoading(loading) {
        if (loading) {
            this.setState({loading, serverIds: []})
        } else {
            this.setState({loading})
        }
    }

    render() {
        const me = this;
        const {serverIds}=me.state;
        return (
            <WxSign url={this.wx_url} app_key={this.app_key}>
                <div style={{maxWidth: 400,margin:20}}>
                    <Loading loading={this.state.loading}/>
                    <WxFlowLayoutImagePicker
                        max={11}
                        getImageUrl={this.getImageUrl.bind(this)}
                        uploadImage={this.uploadImage.bind(this)}
                        onLoading={this.onLoading.bind(this)}
                    />
                    <div>
                        <p>serverIds</p>
                        <input id="foo" onChange={()=>{}} value={serverIds.join(',')}/>
                        <button className="btn" data-clipboard-target="#foo">复制serverIds</button>
                    </div>
                </div>
            </WxSign>
        )
    }
}
ReactDOM.render(
    <WxUploadImgToOssExamples />,
    document.getElementById('__react-content')
);