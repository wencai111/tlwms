/**
 *包装码模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function packingModel() {
	debugger;
	this.BarCID = "";
	this.BillNum = "";
	this.BzBarCode = "";
	this.MNumber = "";
	this.MName = "";
	this.InPackage = "";
	this.IsScan = "";
	this.BzQty = "";
	this.init = function(option) { //构造一个函数实例
		debugger;
		if (option.BarCID || option.BarCID != "") {
			this.BarCID = option.BarCID;
		}
		if (option.BillNum || option.BillNum != "") {
			this.BillNum = option.BillNum;
		}
		if (option.BzBarCode || option.BzBarCode != "") {
			this.BzBarCode = option.BzBarCode;
		}
		if (option.MName || option.MName != "") {
			this.MName = option.MName;
		}
		if (option.MNumber || option.MNumber != "") {
			this.MNumber = option.MNumber;
		}
		if (option.InPackage || option.InPackage != "") {
			this.InPackage = option.InPackage;
		}
		if (option.IsScan || option.IsScan != "") {
			this.IsScan = option.IsScan;
		}
		if (option.BzQty || option.BzQty != "") {
			this.BzQty = option.BzQty;
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
 *包装码入库模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function packingStorageModel(option) {
	this.packing = new packingModel(option);
	this.storage = new storageModel();
	this.finishPick = false; //是否拣货完成
	//增加拣货
	this.addStorage = function(storage) {
		this.storage.id = storage.id;
		this.storage.code = storage.code;
		this.storage.codeid = storage.codeid;
	}
	//增加包装码
	this.addMaterial = function(material) { //？？
		let storage = new storageModel();
		storage.amount = material.count;
		this.TotalAmount = this.TotalAmount + material.count; //总数相加
		this.storages.push(storage)
		return {
			"success": true,
			"message": "新增成功"
		}
	}
	//增加入库操作
	this.addStorage = function(storage) {
		this.storages[this.storages.length - 1].id = storage. id;
		this.storages[this.storages.length - 1].code = storage.code;
		this.storages[this.storages.length - 1].codeid = storage.codeid;
	}
	this.init(option);
}

const inlibraryModel = {
	packing: packingModel,
	storage: storageModel,
	packingStorage: packingStorageModel,
	packingStorages: [],
	waitInlibrarymaterial: {
		code: 36,
		index: 0
	}, //当前等待入库的物料
	//新增物料入库模型对象
	addNew: function(data) {
		this.packingStorages.push(new this.packingStorage(data));
		this.waitInlibrarymaterial = {
			code: data.code,
			index: this.packingStorages.length - 1
		}
	},
	//叠加物料
	addMaterial: function(index, data) {

		this.packingStorages[index].addMaterial(data)
		this.waitInlibrarymaterial = {
			code: data.code,
			index: index
		}
	},
	//物料入库
	addStorage: function(data) {
		console.log('123' + this.packingStorages.length);
		console.log('123' + this.waitInlibrarymaterial.index);
		this.packingStorages[this.waitInlibrarymaterial.index].addStorage(data); //
		this.waitInlibrarymaterial = null;
	},
	generateModel:function(){
		if(this.packingStorages.length>0){
			return {
			"MNumber": this.packingStorages[0].code,
			"Quan": this.packingStorages[0].TotalAmount,
			"LocalID": this.packingStorages[0].storages[0].codeid,
		};
		}
		else{
			return null;
		}
	}

};
//到处对象
export default inlibraryModel;
