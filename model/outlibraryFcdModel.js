/**
 *物料对象
 *案例：{'K':'A2-6层-06','1934','1'}
 */
function materialModel(option) {
	this.id="";//物料ID
	this.code="";//物料code
	this.codeid="";//物料codeid
	this.totalAmount=0;//总货物
	this.goods=[];//物料入库货物
	//设置物料信息
	setMaterialInfo: function(data) {
		if(!data||!data.id||data.id==""){
			return false;
		}
		this.id=data.id;
		this.code=data.code;
		this.codeid=data.codeid;
		this.totalAmount=this.totalAmount+data.count;
		this.goods.push(data.count);
		return true;
	},
	addGoods:function(data){
	}
}

function vehicle(option){
	
}


/**
 *紧急出库模型对象
 *物料数据：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 *库位数据：{id:'K',code:'A2-6层-06',codeid:'1934'}
 */
const outlibraryModel = {
	materials:[],//所有的物料
	materialKey:"",//物料keys,通过物料key 的索引，给materials叠加物料
	vehicleCode:'',//车辆码
	//添加新物料
	addNewMateria:function (data) {
		this.materias.push(new materiaModel(data));
		if(this.materialKey==""){
			this.materialKey=data.code+":"+this.materials.length.toString();
		}
		else{
			this.materialKey=this.materialKey+","+data.code+":"+this.materials.length.toString();
		}
	},
	//叠加物料
	updateMateria:function (data) {
		
	},
	//设置车辆码
	setVehicleCode:function (code) {
		this.vehicleCode=code;
		
	}
		var model=new Object();
		model.MNumber=this.codeid;
		model.Quan=this.totalAmount;
		model.LocalID=this.storage.codeid;
		return model;
	},
	generateModel:function () {
	},
};
//导出对象
export default outlibraryModel;
