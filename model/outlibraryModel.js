/**
 *货架模型对象
 *案例：{'K':'A2-6层-06','1934','1'}
 */
function storageModel() {
	this.id = "";
	this.code = "";
	this.codeid = '';
}
/**
 *紧急出库模型对象
 *物料数据：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
 *库位数据：{id:'K',code:'A2-6层-06',codeid:'1934'}
 */
const outlibraryModel = {
	id:"",//物料ID
	code:"",//物料code
	codeid:"",//物料codeid
	totalAmount:0,//总货物
	goods:[],//物料入库货物
	storage:null,
	//设置物料信息
	setMateriaInfo: function(data) {
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
	//物料入库
	addStorage: function(data) {
		if(!data||!data.id||data.id==""){
			return false;
		}
		this.storage=new storageModel();
		this.storage=new storageModel();
		this.storage.id=data.id;
		this.storage.code=data.code;
		this.storage.codeid=data.codeid;
		return true;
	},
	//生成提交入库model
	generateModel(){
		var model=new Object();
		model.MNumber=this.codeid;
		model.Quan=this.totalAmount;
		model.LocalID=this.storage.codeid;
		return model;
	}
};
//导出对象
export default outlibraryModel;
