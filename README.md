Sleuth.js
======

####一.Sleuth.js是什么
    
Sleuth是一个加载框架，它允许开发者只需要require相应的库或者插件，不需要去下载，就可以直接使用，并且允许开发者任意切换版本。

####二.使用Sleuth.js

#####1.引入Sleuth.js库文件

```javascript
  <script type="text/javascript" src="https://rawgithub.com/axemea/sleuth/master/mappings/mapping-ch.min.js"></script>
   <script type="text/javascript" src="sleuth.js"></script>
```
	
先后引用mapping-ch.min.js,sleuth.min.js文件，注意顺序。mapping-ch.min.js是库的版本映射文件，定义了引用各个库和插件的源地址。默认的引用的是一个公共的映射文件，当然开发者也可以定义自己的映射文件。

#####2.使用方法

Sleuth.js只向外提供了一个require方法

1-只加载一个库

```javascript
		//加载一个库
		Sleuth.require(['jquery'],function(){

			//write your code 

		});
```

2-加载多个库

```javascript
		//加载多个库
		Sleuth.require(['jquery','prototype','response'],function(){

			//write your code 

		});
```

3-选择版本加载，格式为“库|版本号”，如果没有显式定义版本，则选取映射文件中对应库的第一个版本。


```javascript
		//选择版本加载
		Sleuth.require(['jquery|1.8.3','prototype','response'],function(){

			//write your code 

		});
```

####三.定义版本映射文件

初始的映射文件为：

```javascript

		var refMapping = {
			prototype:{
				'1.7.2':'http://cdn.bootcss.com/prototype/1.7.2/prototype.min.js'
			},
			jquery:{
				'1.8.3':'http://code.jquery.com/jquery-1.8.3.min.js',
				'1.8.2':'http://code.jquery.com/jquery-1.8.2.min.js'
			},
			ext:{
				'4.2.1':{
					u:'http://cdn.bootcss.com/extjs/4.2.1/ext-all.min.js',
					c:'http://cdn.bootcss.com/extjs/4.2.1/resources/ext-theme-classic/ext-theme-classic-all.css'
				}
			},
			backbone:{
				'1.1.2':'http://cdn.bootcss.com/backbone.js/1.1.2/backbone-min.js'
			},
			response:{
				'0.9.1+201410311050':'http://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js'
			}

		};
};

```

开发者如果需要其它的库或者插件可以Pull Request过来，我们将丰富到映射文件中去，当然开发者也可以编写自己的本地映射配置文件。但我们真诚的希望，您能将您的需求提交给我们，你需要的，必然他人也需要，谢谢。

####四.映射配置文件配置项说明
```javascript

		var refMapping = {
			//单版本配置
			prototype:{
				'1.7.2':'http://cdn.bootcss.com/prototype/1.7.2/prototype.min.js'
			},
			//多版本配置
			jquery:{
				'1.8.3':'http://code.jquery.com/jquery-1.8.3.min.js',
				'1.8.2':'http://code.jquery.com/jquery-1.8.2.min.js'
			},
			//带一个css的库的配置
			ext:{
				'4.2.1':{
					//url
					u:'http://cdn.bootcss.com/extjs/4.2.1/ext-all.min.js',
					//css
					c:'http://cdn.bootcss.com/extjs/4.2.1/resources/ext-theme-classic/ext-theme-classic-all.css'
				}
			},
			//带多个css的库的配置
			demo:{
				'1.0':{
					u:'demo.js',
					c:['demo1.css','demo2.css']
				}
			}
};
```

需要值得注意的是，在配置版本顺序的时候，推荐最新版本的写在前面，这样默认的话，选择的就是最新版本。



####五.关于引用地址


可以是各个cdn点的资源如：

```javascript

	var refMapping = {
			ext:{
				'4.2.1':{
					//url
					u:'http://cdn.bootcss.com/extjs/4.2.1/ext-all.min.js',
					//css
					c:'http://cdn.bootcss.com/extjs/4.2.1/resources/ext-theme-classic/ext-theme-classic-all.css'
				}
			}

};


```

如果想引用github中开源库的代码，需要注意的是其引用地址，比如Sleuth.js,
[Sleuth.js](https://github.com/AxeMea/Sleuth/blob/master/sleuth.js) 
这个地址是不行的，需要的是直接访问文件系统的地址，
[Sleuth.js](https://rawgithub.com/axemea/sleuth/master/sleuth.js)



####六.公共映射配置文件库以及插件列表[及时更新]


库名 | 版本号 | 脚本引用地址 | 样式引用地址
-----|--------|--------------|-------------
prototype | 1.7.2  | http://cdn.bootcss.com/prototype/1.7.2/prototype.min.js | 
jquery | 1.8.3  | http://code.jquery.com/jquery-1.8.3.min.js | 
 | 1.8.2  | http://code.jquery.com/jquery-1.8.2.min.js | 
ext | 4.2.1  | http://cdn.bootcss.com/extjs/4.2.1/ext-all.js | http://cdn.bootcss.com/extjs/4.2.1/resources/ext-theme-classic/ext-theme-classic-all.css
backbone | 1.1.2  | http://cdn.bootcss.com/backbone.js/1.1.2/backbone-min.js |  
response | 0.9.1+201410311050  | http://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js | 

