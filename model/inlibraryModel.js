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
 *货架模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function storageModel() {
	this.id = "";
	this.code = "";
	this.codeid = '';
	this.amount = 0;
}

/**
 *物料入库模型对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function materialStorageModel(option) {
	debugger;
	this.id = "";
	this.code = "";
	this.codeid = "";
	this.TotalAmount = '';
	this.storages = []; //入库集合
	this.finishInlibrary = false; //是否存在物料没有入库
	this.init = function(option) {
		debugger;
		if (option.code || option.code != "") {
			this.code = option.code;
		}
		if (option.codeid || option.codeid != "") {
			this.codeid = option.codeid;
		}
		if (option.id || option.id != "") {
			this.id = option.id;
		}
		if (option.count || option.count != "") {
			this.TotalAmount = option.count;
		}
		var storage = new storageModel();
		storage.amount = this.TotalAmount;
		this.storages.push(storage)
	}
	//增加物料
	this.addMaterial = function(material) {
		debugger;
		this.TotalAmount = this.TotalAmount + material.count;
		let storage = new storageModel();
		storage.amount = material.count;
		this.storages.push(storage)
		return {
			"success": true,
			"message": "新增成功"
		}
	}
	//增加入库操作
	this.addStorage = function(storage) {
		debugger;
		this.storages[this.storages.length - 1].id = this.storages.length.toString();
		this.storages[this.storages.length - 1].code = "code"+this.storages.length.toString();
		this.storages[this.storages.length - 1].codeid = "codeid"+this.storages.length.toString();
	}
	this.init(option);
}

const inlibraryModel = {
	material: materialModel,
	storage: storageModel,
	materialStorage: materialStorageModel,
	materialStorages: [],
	waitInlibrarymaterial: null, //当前等待入库的物料
	//新增物料入库模型对象
	addMew: function(data) {
		debugger;
		this.materialStorages.push(new this.materialStorage(data));
		this.waitInlibrarymaterial = {
			code: data.code,
			index: this.materialStorages.length - 1
		}
	},
	//叠加物料
	addMaterial: function(index, data) {
		debugger;
		this.materialStorages[index].addMaterial(data)
		this.waitInlibrarymaterial = {
			code: data.code,
			index: index
		}
	},
	//物料入库
	addStorage: function(data) {
		debugger;
		this.materialStorages[this.waitInlibrarymaterial.index].addStorage(data);
		this.waitInlibrarymaterial = null;
	}
};
//到处对象
export default inlibraryModel;
