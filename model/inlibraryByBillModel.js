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
 *包装模型对象
 *案例：{BarCID:'484',BillNum:'ASN2019320-1',BzBarCode:'TMLSHZL2019320-484',MNumber:'1001030001-B12',MName:'后悬置总成',InPackage:'12',BzQty:'12',IsScan:'1'}
 */
function packageModel(option){
	this.BzBarCode="";//对应ID号	
	this.BillNum="";//送货单
	this.BzBarCode="";//条码内容
	this.MNumber="";//当前物料编码
	this.MName="";//当前物料名称
	this.InPackage="";//入库单包装数量
	this.BzQty="";//当前包装数量
	this.IsScan="";//当前条码是否扫描标志 1标识已扫描，0标识未扫描
	this.init=function(option){
		this.BzBarCode=option.BzBarCode;//对应ID号	
		this.BillNum=option.BillNum;//送货单
		this.BzBarCode=option.BzBarCode;//条码内容
		this.MNumber=option.MNumber;//当前物料编码
		this.MName=option.MName;//当前物料名称
		this.InPackage=option.InPackage;//入库单包装数量
		this.BzQty=option.BzQty;//当前包装数量
		this.IsScan=option.IsScan;//当前条码是否扫描标志 1标识已扫描，0标识未扫描
	}
	if(option){
		this.init(option);
	}
}

/**
 *包装码入库模型对象
 *包装码数据：{BarCID:'484',BillNum:'ASN2019320-1',BzBarCode:'TMLSHZL2019320-484',MNumber:'1001030001-B12',MName:'后悬置总成',InPackage:'12',BzQty:'12',IsScan:'1'}
 *库位数据：{id:'K',code:'A2-6层-06',codeid:'1934'}
 */
const inlibraryModel = {
	BillNum:"",//送货单
	BzBarCodes:[],//所有条码
	MNumber:"",//当前物料编码
	MName:"",//当前物料名称
	totalAmount:0,//总货物
	packages:[],//所有包装
	storage:null,
	//设置物料信息
	addPackege: function(data) {
		if(!data||!data.BillNum||data.BillNum==""){
			return false;
		}
		this.BillNum=data.BillNum;
		this.BzBarCodes.push(data.BzBarCode);
		this.MNumber=data.MNumber;
		this.MName=data.MName;
		this.totalAmount= this.totalAmount+parseInt(data.BzQty);
		this.packages.push(new packageModel(data));
		return true;
	},
	//物料入库
	addStorage: function(data) {
		if(!data||!data.id||data.id==""){
			return false;
		}
		this.storage=new storageModel();
		this.storage.id=data.id;
		this.storage.code=data.code;
		this.storage.codeid=data.codeid;
		return true;
	},
	//生成提交入库model
	generateModel(){
		var model=new Object();
		model.BillNum=this.BillNum;
		model.BzBarCodes=this.BzBarCodes;
		model.MNumber=this.MNumber;
		model.Quan=this.totalAmount;
		model.LocalID=this.storage.codeid;
		return model;
	}
};
//导出对象
export default inlibraryModel;
