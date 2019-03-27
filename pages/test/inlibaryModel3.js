function inlibraryModel(option) {
	this.code = "";//物料名称
	this.TotalAmount = 0;//物料总数
	this.goods = [];//物料个数
	this.codeid = "";//物料ID
	this.storageName = "";//物料货架
	//首次新增物料
	this.setMaterial = function(option) {
		this.code = option.code;//物料名称赋值
		this.TotalAmount = option.TotalAmount;//物料总数
		this.goods.push()//物料个数
		this.codeid =  option.codeid;//物料ID
	};
	//物料相加
	this.addGoods = function(option) {
		var storage =new inlibraryModel()
        this.goods.push();//物料个数
		this.TotalAmount = this.TotalAmount + this.TotalAmount; //总数相加
	}
	this.setInlibrary=function(option){
		debugger;
		this.storageName=option.storageName;	
	}
	    if(option){
		this.init(option);
	}
}

	
const inlibraryModels = new inlibraryModel(option);
export default inlibraryModels;