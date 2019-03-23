import config from '@/config'
const {
	domian
} = config


/**
 * @description 获取拣货码信息
 * 用于根据拣货码扫描出库前获取的相关信息，并进行界面的内容显示。，
 */
export const getPickGoodsCodeInfo = (BillNum) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= GetPickGoodsCodeInfo',
		type: "POST",
		dataType: "JSON",
		data: {
			"BillNum": BillNum
		}
	});
}

/**
 * @description 根据拣货码扫描出库
 * 客户没有给出相关完整的出库计划或拣货时，用于的出库。
 * 用户可先通过手机端查看所需要出库的物料所在的库位分布信息，然后进行的出库操作，
 */
export const sureStockOut = (BillNum) => {
	debugger;
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= SureStockOut',
		type: "POST",
		dataType: "JSON",
		data: {
			"BillNum": BillNum
		}
	});
}
