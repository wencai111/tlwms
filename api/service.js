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
export const checkLocal = (number, localID) => {
	console.log("checkLocal:入参 number:" + number + "  localID:" + localID);
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=CheckLocal',
		type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": number,
			"LocalID": localID
		},
	});
}

/**
 *   @description 换货入库
 *用于不良品维修后转换为良品入库的操作
*/
export const saveRepairInInfo = (data) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveRepairInInfo',
		type: "POST",
		dataType: "JSON",
		data: data
	});
}
/**
*   @description 换货入库
* 用于对不良品返修出库的操作，实际返修时物料出库到返修区
*/
export const saveRepairOutInfo = (data) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveRepairOutInfo',
		type: "POST",
		dataType: "JSON",
		data:data
	});
}