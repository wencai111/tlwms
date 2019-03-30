import config from '@/config'
const {
	domian
} = config
/**
作用： 用于主机厂不良品到仓储中心调换良品的过程，对不良品进行的换货入库的操作
*/
export const exchangeStorage = (LocalID) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= SaveExchangeInInfo',
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
用于主机厂不良品到仓储中心调换良品的过程，对良品进行的换货出库的操作
*/
export const exchangeAppear = (LocalID) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= SaveExchangeOutInfo',
		type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": MNumber,
			"Quan": Quan,
			"LocalID":LocalID
		},
	});
}