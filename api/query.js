import config from '@/config'
const {
	domian
} = config

/**
扫描库位，获取库位中相关物料信息
作用：用于盘点前扫描库位码，获取对应库位中的物料信息。
 */
export const GetStockList = (MNumber) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=GetStockList',
		type: "POST",
		dataType: "JSON",
		data: {
			BillCode: 'BillCode',
			GridCode: 'GridCode',
			sortOrder: 'sortOrder',
			sortField: 'sortField',
			pageIndex: 'pageIndex',
			MNumber: 'MNumber',
			pageSize: 'pageSize'
		},
	});
}