/**
 * Created by dxc on 2016/10/30.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WxQySign, WxQyUploadImgToOss} from 'wxjs';
import Clipboard from 'clipboard'
import {WxFlowLayoutImagePicker} from 'react-imagepicker';
import Loading from './Loading';
class WxQyUploadImgToOssExamples extends Component {
    state = {
        loading: false,
        serverIds: []//serverIds例子中用于复制调试使用实际项目中不需要
    };

    wxqy_url = "http://21.net.fangstar.net/wxqy-zyb/";

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
        // serverId='调试直接修改serverId';
        WxQyUploadImgToOss(me.wxqy_url, serverId).then(function (res) {
            if (res.result) {
                res.data.localId = localId;
                callback(res.data);
            } else {
                alert(res);
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
            <WxQySign url={this.wxqy_url}>
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
            </WxQySign>
        )
    }
}
ReactDOM.render(
    <WxQyUploadImgToOssExamples />,
    document.getElementById('__react-content')
);