/**
 *拣货单模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function pickModel() {
	this.id = "";
	this.code = "";
	this.codeid = '';
	this.amount = 0;
}

/**
 *物料模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function materialModel() {
	this.id = "";
	this.code = "";
	this.codeid = '';
	this.count = 0;
}



/**
 *物料入库模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function pickMaterialModel(option) {
	this.pickModel=new  this.pickModel();
	this.materialModel=new this.materialModel();
	this.finishPick = false; //是否拣货完成
	this.init = function(option) { //构造一个函数实例

// 		if (option.code || option.code != "") {
// 			this.code = option.code;
// 		}
// 		if (option.codeid || option.codeid != "") {
// 			this.codeid = option.codeid;
// 		}
// 		if (option.id || option.id != "") {
// 			this.id = option.id;
// 		}
// 		if (option.count || option.count != "") {
// 			this.TotalAmount = option.count;
// 		}
// 		var storage = new storageModel();
// 		storage.amount = this.TotalAmount;
// 		this.storages.push(storage)
	}
	//增加物料
	this.addPick = function(material) { //？？

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
	this.addMaterial = function(storage) {
// 		this.storages[this.storages.length - 1].id = this.storages.length.toString();
// 		this.storages[this.storages.length - 1].code = "code" + this.storages.length.toString();
// 		this.storages[this.storages.length - 1].codeid = "codeid" + this.storages.length.toString();
		this.storages[this.storages.length - 1].id = storage. id;
		this.storages[this.storages.length - 1].code = storage.code;
		this.storages[this.storages.length - 1].codeid = storage.codeid;
	}
	this.init(option);
}

const inlibraryModel = {
	pick: pickModel,
	material: materialModel,
	pickMaterial: pickMaterialModel,
	pickMaterialModels: [],
	waitOutlibraryPick: {
		code: '',
		index: 0
	}, //当前等待出库的拣货单
	//新增物料入库模型对象
	addNew: function(data) {

		this.pickMaterialModels.push(new this.pickMaterial(data));
		this.waitOutlibraryPick = {
			code: data.code,
			index: this.pickMaterialModels.length - 1
		}
	},
	//叠加物料
	addMaterial: function(index, data) {

		this.materialStorages[index].addMaterial(data)
		this.waitInlibrarymaterial = {
			code: data.code,
			index: index
		}
	},
	//物料入库
	addStorage: function(data) {
		console.log('123' + this.materialStorages.length);
		console.log('123' + this.waitInlibrarymaterial.index);
		this.materialStorages[this.waitInlibrarymaterial.index].addStorage(data); //
		this.waitInlibrarymaterial = null;
	}
};
//到处对象
export default inlibraryModel;
