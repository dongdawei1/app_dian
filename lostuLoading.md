# lotus-loading

> 数据加载中组件 适用H5/APP/微信小程序

## how to use uni-app提供的uni.showLoading，样式显示不太友好，用样式去重置，都没办法覆盖，所以重写了个

### 插件的方式引入使用
1.xx.vue 
```$xslt
    import LotusLoading from "../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue";
```

2.vue页面内引用：<br/>
```
    <LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
```
3.参数说明：<br/>
（1）参数定义
```$xslt
    data () {
        return {
            //加载中组件数据
			lotusLoadingData:{
				isShow:true//设置显示加载中组件true显示false隐藏
			}
        }
    }
```

4.方法定义与调用：<br/>
```$xslt
    components:{
	    LotusLoading
	}
```








