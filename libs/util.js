  /**
   * @description 不规则接口返回json转化为对象
   */
export const parseForRule = (data) => {
	try{
		return eval('(' + data + ')')
	}catch(e){
		console.log("json 转化为js 错误："+JSON.stringify(e))
		return {};
	}
}