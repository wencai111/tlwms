/**
 *包装码模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
// "{'K','B1-A1-1²ã-01','1',1}",
function pickModel(option) {
	debugger;
	this.TlJpdID = "";
	this.OperBillNum = "";
	this.BillNum = "";
	this.MNumber = "";
	this.MName = "";
	this.OutPackage = "";
	this.Qty = "";
	this.init = function(option) { //构造一个函数实例
		debugger;
		if (option.TlJpdID || option.TlJpdID != "") {
			this.TlJpdID = option.TlJpdID;
		}
		if (option.OperBillNum || option.OperBillNum != "") {
			this.OperBillNum = option.OperBillNum;
		}
		if (option.BillNum || option.BillNum != "") {
			this.BillNum = option.BillNum;
		}
		if (option.MNumber || option.MNumber != "") {
			this.MNumber = option.MNumber;
		}
		if (option.MName || option.MName != "") {
			this.MName = option.MName;
		}
		if (option.OutPackage || option.OutPackage != "") {
			this.OutPackage = option.OutPackage;
		}
		if (option.Qty || option.Qty != "") {
			this.Qty = option.Qty;
		}
		this.amount = 0;
	}
    if(option){
		this.init(option);
	}
}
/**
 *货架模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function storageModel(option) {
	this.id = "";
	this.code = "";
	this.codeid = '';
	this.amount = 0;
	this.init = function(option) { //构造一个函数实例
		if (option.id || option.id != "") {
			this.id = option.id;
		}
		if (option.code || option.code != "") {
			this.code = option.code;
		}
		if (option.codeid || option.codeid != "") {
			this.codeid = option.codeid;
		}
		this.amount = 0;
	}
	if(option){
		this.init(option);
	}
}

/**
 *拣货入库模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function pickStorageModel(option) {
	this.pick = new pickModel(option);
	this.storage = new storageModel();
	this.finishPick = false; //是否拣货完成
	//增加拣货
	this.addStorage = function(storage) {
		this.storage.id = storage.id;
		this.storage.code = storage.code;
		this.storage.codeid = storage.codeid;
	}
}

const outlibraryModel = {
	pick: pickModel,
	storage: storageModel,
	pickStorage: pickStorageModel,
	pickStorages: [],
	waitOutlibraryPick: {
		code: 36,
		index: 0
	}, //当前等待入库的物料
	//新增物料入库模型对象
	addNew: function(data) {
		debugger;
		this.pickStorages.push(new this.pickStorage(data));
		this.waitOutlibraryPick = {
			code: data.code,
			index: this.pickStorages.length - 1
		}
	},
    // 入库
	addStorage: function(data) {
		debugger
		console.log('123' + this.pickStorages.length);
		console.log('123' + this.waitOutlibraryPick.index);
		this.pickStorages[this.waitOutlibraryPick.index].addStorage(data); //
		this.waitOutlibraryPick = null;
	}
};
//到处对象
export default outlibraryModel;
