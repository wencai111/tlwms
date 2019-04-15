import config from '@/config'
const {
	domian
} = config

// 通罗出库发货后，由通罗派人到众泰进行收货，
// 以便确认送货数量与收货数量相同。
// 扫描人员扫描送货单确认是否漏扫

export const ResearchZoteRecGoods = (data) => {
    console.log("ResearchZoteRecGoods 入参："+JSON.stringify(data));
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=ResearchZoteRecGoods',
		type: "GET",
		dataType: "JSON",
		data: data
	});
}

// 通罗出库发货到众泰后，
// 由通罗派人到众泰进行收货，
// 以便确认送货数量与收货数量相同。

export const ZoteRecGoods = (data) => {
    console.log("ZoteRecGoods 入参："+JSON.stringify(data));
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=ZoteRecGoods',
		type: "GET",
		dataType: "JSON",
		data: data
	});
}


export const getPickGoodsCodeInfo = (BillNum) => {
	console.log("getPickGoodsCodeInfo入参：" + JSON.stringify(BillNum))
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=GetPickGoodsCodeInfo',
		type: "GET",
		dataType: "JSON",
		data: {
			"BillNum":BillNum
		},
	});
}