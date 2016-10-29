# wxjs
react版本的微信js基础服务
## install

```
npm install wxjs --save
```
## Development

```
npm install
npm start
```
## Example
[http://github.dxcweb.com/wxjs/](http://github.dxcweb.com/wxjs/ "http://github.dxcweb.com/wxjs/")

## Usage
### WopLogin
    import  {WopLogin} from 'wxjs';
	...
	<WopLogin 
		url="http://wop.dxcweb.com/service/"
        wx_app_id=""
        is_get_user_info={false}
        userInfo={(user)=> (console.log(user))}
	>
	    <Router history={history}>
			<Route path="/" component={IndexPage}/>
	    </Router>
	</WopLogin>
