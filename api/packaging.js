import config from '@/config'
const {
	domian
} = config


export const Pickingport = () => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= GetDeliBillBarcodeInfo',
		type: "POST",
		dataType: "JSON",
		data:{

				}
	});
}