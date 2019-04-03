import config from '@/config'
const {
	domian
} = config

/**
扫描库位，获取库位中相关物料信息
作用：用于盘点前扫描库位码，获取对应库位中的物料信息。
 */
export const GetLocalMateInfo = (LocalID) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=GetLocalMateInfo',
		type: "POST",
		dataType: "JSON",
		data: {
			LocalID: 'LocalID',
			LocalName: 'LocalName',
			MNumber: 'MNumber',
			MName: 'MName',
			SupplyName: 'SupplyName',
			InDate: 'InDate',
			EndQuan: 'EndQuan'
		},
	});
}
/**
盘点
作用： 手机扫描库位码后，调用11接口直接获取当前库位物料（但不显示数量），然后手工输入盘点数量
 */
export const SaveInventoryInfo = (MNumber,PdQuan,LocalID) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveInventoryInfo',
			type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": MNumber,
			"PdQuan": PdQuan,
			"LocalID":LocalID
		},
	});
}
