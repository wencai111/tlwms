import config from '@/config'
const {
	domian
} = config

/**
 * @description 扫描供应商送货包装码，获取相应信息
 * 于扫描包装码入库前，获取包装码对应的信息，
 * 获取后如果连续扫描物料放置在同一库位时，前端需要检查送货单号和物料是否一致，如果一致则累加当前包装数量。不一致则提醒用户错误原因。
 */
export const GetDeliBillBarcodeInfo = (BarCID) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= GetDeliBillBarcodeInfo',
		type: "POST",
		dataType: "JSON",
		data: {
			BarCID: "BarCID"
		}
	});
}


export const SavePutInByDeliBill = (BzBarCodes,MNumber,Quan,LocalID) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= SavePutInByDeliBill',
		type: "POST",
		dataType: "JSON",
		data: {
			"BzBarCodes": BzBarCodes,
			"MNumber":MNumber,
			"Quan":Quan,
			"LocalID":LocalID
		}
	});
}
