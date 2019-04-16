/**
 *拣货码返厂出库模型对象
 *物料数据：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 *车辆码数据：{id:'C',code:'浙G23408',codeid:'1',count:1}
 */
const outlibraryModel = {
	TlJpdID: '',
	OperBillNum: '',
	BillNum :'',
	MNumber: '',
	MName : '',
	OutPackage :'',
	LocalName :'',
	Qty : '',
	//重置函数
	reset: function() {
		this.TlJpdID = '';
		this.OperBillNum = '';
		this.BillNum = '';
		this.MNumber = '';
		this.MName = '';
		this.OutPackage = '';
		this.LocalName = ''
		this.Qty = '';
	},
	//设置新物料
	setPackege: function(data) {
		this.TlJpdID = data.TlJpdID;
		this.OperBillNum = data.OperBillNum;
		this.BillNum = data.BillNum;
		this.MNumber = data.MNumber;
		this.MName = data.MName;
		this.OutPackage = data.OutPackage;
		this.LocalName = data.LocalName
		this.Qty = data.Qty;
	},
	generateModel: function() {
		var model = new Object();
		model.BillNums = this.BillNum;
		return model;
	}
}
//导出对象
export default outlibraryModel;
