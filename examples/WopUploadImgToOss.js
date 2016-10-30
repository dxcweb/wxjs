/**
 * Created by dxc on 2016/10/30.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WopSign, WopUploadImgToOss} from 'wxjs';
import  {clone} from 'lodash'
import Clipboard from 'clipboard'

class WopUploadImgToOssExamples extends Component {
    state = {
        img: [],
        disabled: false,
        serverIds: [],
        ossImgs: []
    };
    wop_url = "http://wop.dxcweb.com/service/";
    wx_app_id = "wx5f069426b7e49373";

    componentDidMount() {
        new Clipboard('.btn');
    }

    chooseImage() {
        const me = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                me.setState({img: localIds});
            }
        });
    }

    previewImage(current) {
        const me = this;
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: me.state.img // 需要预览的图片http链接列表
        });
    }

    uploadImage() {
        if (this.state.img.length == 0) {
            return false;
        }
        this.setState({disabled: true});
        const img = clone(this.state.img);
        this._uploadImage(img);
    }

    _uploadImage(localIds, serverIds = [], ossImgs = []) {
        const me = this;
        const localId = localIds.shift();
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                const serverId = res.serverId; // 返回图片的服务器端ID
                //上传图片到OSS
                WopUploadImgToOss(me.wop_url, me.wx_app_id, serverId).then(function (img) {
                    ossImgs.push(img);
                    serverIds.push(serverId);
                    if (localIds.length > 0) {
                        me._uploadImage(localIds, serverIds, ossImgs)
                    } else {
                        me.uploadImageFinish(serverIds, ossImgs);
                    }
                });
            }
        });
    }

    uploadImageFinish(serverIds, ossImgs) {
        this.setState({serverIds, ossImgs, disabled: false});
    }

    render() {
        const me = this;
        const {disabled, img, serverIds, ossImgs}=me.state;
        return (
            <WopSign url={this.wop_url} wx_app_id={this.wx_app_id}>
                <div style={{padding:20}}>
                    <div>
                        {img.map(function (itme, i) {
                            return <img key={i} src={itme}
                                        onClick={me.previewImage.bind(me,itme)}
                                        style={{width:100,height:100,margin:"10px 10px 0 0"}}/>
                        })}
                    </div>
                    <button onClick={me.chooseImage.bind(me)} disabled={disabled}>拍照或从手机相册中选图接口</button>
                    <button onClick={me.uploadImage.bind(me)} disabled={disabled}>上传图片</button>
                    <div>
                        <p>serverIds</p>
                        <input id="foo" onChange={()=>{}} value={serverIds.join(',')}/>
                        <button className="btn" data-clipboard-target="#foo">复制serverIds</button>
                    </div>
                    <div>
                        {ossImgs.map(function (itme, i) {
                            return <img key={i} src={itme.url}
                                        style={{width:100,height:100,margin:"10px 10px 0 0"}}/>
                        })}
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