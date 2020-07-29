export default (params) => {
	return new Promise((resolve,reject) => {
		console.log(params);
		wx.request({
			data: {limit: 30, order: "hot", skip: 8},
			method: "GET",
			url: "/image/v3/homepage/vertical",
			success: res => {
				resolve(res)
			},
			fail: err => {
				
			}
		})
		
	})
}