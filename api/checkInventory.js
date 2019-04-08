import config from '@/config'
const {
	domian
} = config

/**
 * @description 备件下架发货
 *用于扫描良品物料到包装区，物料出库。
 */
export const savePackageInfo = (data) => {
	console.log("savePackageInfo入参:" + JSON.stringify(data));
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SavePackageInfo',
		type: "GET",
		dataType: "JSON",
		data: data
		
	});
}





/**
 * @description 备件下架发货
 * 生成唯一的包装码，包装码作用用于打印黏贴到包装箱外面，便于物流跟踪
 */
export const bulidBzd = (data) => {
	console.log("bulidBzd入参:" + JSON.stringify(data));
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=BulidBzd',
		type: "GET",
		dataType: "JSON",
		data: data
	});
}

/**
 * @description 备件扫描记录物流信息
 * 用于在物流途中，司机扫描外包装条码，记录当前物流信息
 */
export const saveLogisInfo = (data) => {
	console.log("saveLogisInfo入参:" + data);
	return uni.request({
		url: domian + '/common/wms_Server_Data.asp?action=SaveLogisInfo'+data
	});
}

/**
 * @description 备件扫描记录物流信息
 * 扫描或输入包装码后，界面显示包装物流信息（参照淘宝）
 */
export const getLogisInfo = (PackNum) => {
	console.log("getLogisInfo入参:PackNum:" + PackNum);
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=GetLogisInfo',
		type: "GET",
		dataType: "JSON",
		data: {
			"PackNum":PackNum
		}
	});
}