/**
   * @description 不规则接口返回json转化为对象
   */
  export const parseForRule = (data) => {
	  debugger;
  	try {
  		return eval('(' + data + ')')
  	} catch (e) {
		try{
			console.log("parse转化前："+JSON.stringify(data))
			return JSON.parse(data)
		}
	
		catch(e){
			console.log("json 转化为js 错误：" + JSON.stringify(e))
  		return {};
		}
  	}
  }

/**
   * @description 检测是否授权，如果没有授权，跳转到登录界面
   */
  export const authAccount = (hasLogin, forcedLogin, userName) => {
  	if (!hasLogin) {
  		uni.showModal({
  			title: '未登录',
  			content: '您未登录，需要登录后才能继续',
  			showCancel: false,
  			success: res => {
  				if (res.confirm) {
  					// 如果需要强制登录，使用reLaunch方式
  					if (forcedLogin) {
  						uni.reLaunch({
  							url: '../login/login'
  						});
  					} else {
  						uni.navigateTo({
  							url: '../login/login'
  						});
  					}
  				}
  			}
  		});
  	}
  }
/**
   * @description 库位码转换函数
   */  
  export const parseWarehouseCode = (code) => {
	  console.log(code);
	  var result=null;
	  debugger;
	  var arr=code.replace("{","").replace("}","").split(",");
	  if(arr.length<=4){
		  result={};
		  result["id"]=arr[0].replace("'","").replace("'","");
		  result["code"]=arr[1].replace("'","").replace("'","");
		  result["codeid"]=arr[2].replace("'","").replace("'","");
	  }else{
		  }
	  return result;
  }
