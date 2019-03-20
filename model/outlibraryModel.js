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
	debugger;
	this.pickModel = new pickModel();
	this.materialModel = new materialModel();
      this.storages = [];                      //入库集合
	this.finishPick = false; //是否拣货完成
	this.init = function(option) { //构造一个函数实例
	
	var storage = new materialModel();
	storage.amount = this.TotalAmount;
	this.storages.push(storage)
	}
	//增加物料
	this.addPick = function(material) { //？？
		debugger;
		let storage = new materialModel();
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
		debugger;
		this.storages.id = storage.id;
		this.storages.code = storage.code;
		this.storages.codeid = storage.codeid;
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
		debugger;
		this.pickMaterialModels.push(new this.pickMaterial(data));
		this.waitOutlibraryPick = {
			code: data.code,
			index: this.pickMaterialModels.length - 1
		}
	},
	//叠加入库
	addPick: function(index, data) {
		debugger;
		this.pickMaterialModels[index].addPick(data)
		this.waitOutlibraryPick = {
			code: data.code,
			index: index
		}
	},
	//物料入库
	addMaterial: function(data) {
		debugger;
		console.log('123' + this.pickMaterialModels.length);
		console.log('123' + this.waitOutlibraryPick.index);
		this.pickMaterialModels[this.waitOutlibraryPick.index].addMaterial(data); //
		this.waitOutlibraryPick = null;
	}
};
//到处对象
export default inlibraryModel;
