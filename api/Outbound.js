import config from '@/config'
const {
	domian
} = config


export const SureStockOut = () => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action= SureStockOut',
		type: "POST",
		dataType: "JSON",
		data:{ }
	});
}