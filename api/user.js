import config from '@/config'
const {
	domian
} = config

/**
 * @description 系统登录
 */
export const appLogin = (username, password) => {
	return uni.request({
		url: domian + 'common/wms_Server_Data.asp?action=login',
		type: "POST",
		dataType: "JSON",
		data: {
			"username": username,
			"password": password,
		},
	});
}
