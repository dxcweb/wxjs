/**
 * Created by dxc on 2016/10/18.
 */
import React, {Component, PropTypes} from 'react';
import {Block} from 'react-speed'

export default  class Loading extends Component {
    render() {
        if (!this.props.loading) {
            return null;
        }
        const modal = {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2000
        };
        return <div>
            <Block s={modal} j="c" a="c">
                <Block w={120} h={120} bc="rgba(40, 40, 40, 0.75)" fc="#fff" s={{borderRadius:10}} j="c" vf>
                    <Block j="c">

                    </Block>
                    <Block j="c" mt={30}>上传中...</Block>
                </Block>
            </Block>
        </div>;
    }
}