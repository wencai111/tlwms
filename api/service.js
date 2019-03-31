import config from '@/config'
const {
	domian
} = config
/**
 不良品入库（从主机厂退库）
 作用： 主机厂发现不良品，不良品退回至仓库的操作（入库至仓库）
*/
export const SaveStockInForBad = (LocalID,MNumber,Quan) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveStockInForBad',
		type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": MNumber,
			"Quan": Quan,
			"LocalID":LocalID
		},
	});
}
/**
17、不良品返厂出库（从仓库出库退回给供应商）
作用： 仓库中的不良品退回给供应商（从仓库中出库）
*/
export const SaveStockOutByBadMate = (LocalID,MNumber,Quan) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveStockOutByBadMate',
		type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": MNumber,
			"Quan": Quan,
			"LocalID":LocalID
		},
	});
}