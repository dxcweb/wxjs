/**
 * Created by dxc on 2016/7/12.
 */
import utf8 from './utf8'

export default class Base64 {
    static _str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    static encode(input) {
        let output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            i = 0;
        input = utf8.encode(input);
        let len = input.length;
        while (i < len) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                Base64._str.charAt(enc1) + Base64._str.charAt(enc2) +
                Base64._str.charAt(enc3) + Base64._str.charAt(enc4);
        }
        return output;
    }

    static decode(input) {
        let me = Base64;
        let output = '',
            chr1, chr2, chr3,
            enc1, enc2, enc3, enc4,
            i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        let len = input.length;
        while (i < len) {
            enc1 = me._str.indexOf(input.charAt(i++));
            enc2 = me._str.indexOf(input.charAt(i++));
            enc3 = me._str.indexOf(input.charAt(i++));
            enc4 = me._str.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }
        output = utf8.decode(output);
        return output;
    }
}