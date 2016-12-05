/**
 * Created by dxc on 2016/7/11.
 */
function JsonP(url, id) {
    var script, doc = document,
        head = doc.getElementsByTagName("head")[0];
    if (id && (script = doc.getElementById(id))) {
        head.removeChild(script);
    }
    script = doc.createElement("script");
    script.type = "text/javascript";
    script.id = id;
    script.src = url;
    head.appendChild(script);
}
export default  JsonP;