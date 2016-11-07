/**
 * Created by dxc on 2016/10/30.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WopSign, WopUploadImgToOss} from 'wxjs';
import Clipboard from 'clipboard'
import {WxFlowLayoutImagePicker} from 'react-imagepicker';
import Loading from './Loading';
class WopUploadImgToOssExamples extends Component {
    state = {
        loading: false,
        serverIds: []
    };

    wop_url = "http://wop.dxcweb.com/service/";
    wx_app_id = "wx5f069426b7e49373";

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

    uploadImage(serverId,localId, callback) {
        const me = this;
        const {serverIds}=this.state;
        serverIds.push(serverId);
        this.setState({serverIds});
        WopUploadImgToOss(me.wop_url, me.wx_app_id, serverId).then(function (res) {
            if (res.result) {
                res.data.localId = localId;
                callback(res.data);
            } else {
                alert(res.msg);
                callback(false);
            }
        }).catch(function(ex) {
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
            <WopSign url={this.wop_url} wx_app_id={this.wx_app_id}>
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
            </WopSign>
        )
    }
}
ReactDOM.render(
    <WopUploadImgToOssExamples />,
    document.getElementById('__react-content')
);