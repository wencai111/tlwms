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
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=CheckLocal',
		type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": number,
			"LocalID": localID,
		},
	});
}

/**
 * @description 紧急入库（没有送货单和包装码，系统打印入库码入库）
 * 用于提交和保存数据，并更新库存。应用场景是：
 * 在货物上架之前扫描入库码，提取入库码对应信息并提交
 */
export const  saveEmergentInInfo = (data) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= SaveEmergentInInfo',
		type: "POST",
		dataType: "JSON",
		data:data ,
	});
}
