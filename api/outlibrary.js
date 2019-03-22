import config from '@/config'
const {
	domian
} = config


export const Pickingport = (TlJpdID, OperBillNum,BillNum,MNumber,MName,OutPackage,Qty) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= GetPickGoodsCodeInfo',
		type: "POST",
		dataType: "JSON",
		data:{
                "TlJpdID":TlJpdID,

                "OperBillNum":OperBillNum, 

                "BillNum":BillNum,

                "MNumber":MNumber,        

                "MName":MName,

                "OutPackage":OutPackage,

                "Qty":Qty }
	});
}