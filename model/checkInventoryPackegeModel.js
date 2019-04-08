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
const checkInventoryPackegeModel = {
	materials: [], //所有的物料
	materialKey: "", //物料keys,通过物料key 的索引，给materials叠加物料
	FourSName: '', // 当前收货4S店名
	RecAdds:'',//当前收货地址
	TranCom:'',//承运人
	RecLinkMan:'',// 收件人电话：
	RecLinkTel:'',//  发件人
	SendLinkMan:'',//发件人
	SendLinkTel:'',//发件人电话
	//重置函数
	reset:function(){
		this.materials=[];
		this.materialKey="";
		this.vehicleCode="";
	},
	//添加新物料
	addNewMaterials: function(data) {
		this.materials.push(new materialModel(data));
	},
	//叠加物料
	updateMaterial: function(data, i) {
		this.materials[i].addGoods(data);
	},
	//设置物料信息
	setMaterial: function(data) {
		if (this.materialKey.indexOf(data.code) != -1) {
			let index = parseInt(this.materialKey.substr(this.materialKey.indexOf(data.code) + data.code.length + 1, 1)) - 1;
			this.updateMaterial(data, index);
		} else {
			this.addNewMaterials(data);
		}
		if (this.materialKey == "") {
			this.materialKey = data.code + ":" + this.materials.length.toString();
		} else {
			this.materialKey = this.materialKey + "," + data.code + ":" + this.materials.length.toString();
		}
	},
	//设置车辆码
	setVehicleCode: function(FourSName,RecAdds) {
		this.FourSName = FourSName;
		this.RecAdds = RecAdds;
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
		model.FourSName = this.FourSName;
		model.RecAdds = this.RecAdds;
		model.TranCom=this.TranCom;
		model.RecLinkMan = this.RecLinkMan;
		model.RecLinkTel = this.RecLinkTel;
		model.SendLinkMan = this.SendLinkMan;
		model.SendLinkTel = this.SendLinkTel;
		return model;
	}
}
//导出对象
export default checkInventoryPackegeModel;
