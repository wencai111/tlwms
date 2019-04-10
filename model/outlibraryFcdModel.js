/**
 *物料对象
 *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 */
function materialModel(option) {
	this.id = ""; //物料ID
	this.code = ""; //物料code
	this.codeid = ""; //物料codeid
	this.totalAmount = 0; //总货物
	this.goods = []; //物料入库货物
	//初始化
	this.init = function(option) {
		this.id = option.id;
		this.code = option.code;
		this.codeid = option.codeid;
		this.totalAmount = parseInt(option.count);
		this.goods.push(parseInt(option.count));
	};
	//设置物料信息
	this.addGoods = function(data) {
		this.totalAmount = this.totalAmount + parseInt(data.count);
		this.goods.push(parseInt(data.count));
	};
	if (option) {
		this.init(option)
	}
}
/**
 *紧急出库模型对象
 *物料数据：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 *车辆码数据：{id:'C',code:'浙G23408',codeid:'1',count:1}
 */
const outlibraryModel = {
	materials: [], //所有的物料
	vehicleCode: '', //车辆码
	//重置函数
	reset: function() {
		this.materials = [];
		this.vehicleCode = "";
	},
	//添加新物料
	addNewMaterials: function(data) {
		this.materials.push(new materialModel(data));
	},
	//移除物料
	removeMaterials: function(data) {
		for (var i = 0; i < this.materials.length; i++) {
			if (this.materials[i].codeid == data.codeid) {
				this.materials.splice(i, 1);
				break;
			}
		}
	},
	//叠加物料
	updateMaterial: function(data, i) {
		this.materials[i].addGoods(data);
	},
	//设置物料信息
	setMaterial: function(data) {
		var index=-1;
		for (var i = 0; i < this.materials.length; i++) {
			if(data.code==this.materials[i].code){
				index=i;
				break;
			}
		}
		if(index>-1){
			this.updateMaterial(data, index);
		}
		else{
			this.addNewMaterials(data);
		}
	},
	//设置车辆码
	setVehicleCode: function(code) {
		this.vehicleCode = code;
	},
	generateModel: function() {
		var model = new Object();
		model.MNumbers = "";
		model.Qtys = "";
		if (this.materials.length > 0) {
			for (let item of this.materials) {
				model.MNumbers = model.MNumbers + item.code + "|";
				model.Qtys = model.Qtys + item.totalAmount + "|";
			}
		}
		model.MNumbers = model.MNumbers.trim("").substr(0, model.MNumbers.length - 1)
		model.Qtys = model.Qtys.trim("").substr(0, model.Qtys.length - 1)
		model.VehiCode = this.vehicleCode;
		return model;
	}
}
//导出对象
export default outlibraryModel;
