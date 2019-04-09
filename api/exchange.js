import config from '@/config'
const {
	domian
} = config

/**
 * @description 扫描入库前，检查库位是否满足入库要求
 * 用于物料在移入良品区之前检查库位是否可用，一般在提交数据到数据库保存前检查，
 * 检查通过则提交数据保存并更新库存。库位存放要求：良品区库位只能存放一种物料，
 * 冻结库位不能存放物料，不同批次的物料不能存放在同一库位。
 */
export const checkLocal = (MNumber,LocalID) => {
	console.log("checkLocal:入参:" +MNumber,+LocalID);
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=CheckLocal&MNumber='+MNumber+"&LocalID="+LocalID
	});
}

/**
 * @description 换货入库
 *作用： 用于主机厂不良品到仓储中心调换良品的过程，对不良品进行的换货入库的操作
*/
export const saveExchangeInInfo = (data) => {
	console.log("saveExchangeInInfo:入参 :" + JSON.stringify(data));
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveExchangeInInfo',
		type: "POST",
		dataType: "JSON",
		data: data
	});
}

/**
 * @description 换货入库
 * 用于主机厂不良品到仓储中心调换良品的过程，对不良品进行的换货入库的操作
*/
export const saveExchangeOutInfo = (data) => {
	console.log("saveExchangeOutInfo:入参 :" + JSON.stringify(data));
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveExchangeOutInfo',
		type: "POST",
		dataType: "JSON",
		data: data
	});
}