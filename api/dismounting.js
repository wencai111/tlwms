import config from '@/config'
const {
	domian
} = config

/**
19、拆装件出库
作用： 用于主机厂不良品到仓储中心调换良品的过程，对良品进行的换货出库的操作
 */
export const SaveAssemOutInfo = (MNumber,Quan,LocalID,Reason) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveAssemOutInfo',
			type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": MNumber,
			"Quan": Quan,
			"LocalID":LocalID,
			 "Reason": Reason
		},
	});
}
/**
20、拆装件入库
作用： 用于主机厂不良品到仓储中心调换良品的过程，对不良品进行的换货入库的操作 
*/

export const SaveAssemInInfo = (MNumber,Quan,LocalID,Reason) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=SaveAssemInInfo',
			type: "POST",
		dataType: "JSON",
		data: {
			"MNumber": MNumber,
			"Quan": Quan,
			"LocalID":LocalID,
			 "Reason": Reason
		},
	});
}