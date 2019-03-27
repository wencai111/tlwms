function inlibraryModel() {
	this.code = "";//物料名称
	this.TotalAmount = 0;//物料总数
	this.goods = [];//物料个数
	this.codeid = "";//物料ID
	this.storageName = "";//物料货架
	//首次新增物料
	this.setMaterial = function() {
		this.code = "1001030001-B12A";//物料名称赋值
		this.TotalAmount = 12;//物料总数
		this.goods.push(12)//物料个数
		this.codeid = "物料";//物料ID
	};
	//物料相加
	this.addGoods = function() {
        this.goods.push(24);//物料个数
		this.TotalAmount = this.TotalAmount + this.TotalAmount; //总数相加
	}
	this.setInlibrary=function(){
		debugger;
		this.storageName="货架";	
	}
}

	
const inlibraryModels = new inlibraryModel();
export default inlibraryModels;

//1 建立1 扫物料的方法, 给inlibraryModel对象赋值物料（方法里面赋值的时候，值写死）
//2 建立1 再次扫物料的方法, 给inlibraryModel对象 改变物料的总数属性和改变goods的值
//3 建立1 扫库位码的方法, 给inlibraryModel对象 改变storageName属性的值

//所有的方法必须写在inlibaryModel2.js 里面,index.vue调用inlibaryModel2.js 里面的第一步,第二步,第三步的方法,
//且,index.vue调用inlibaryModel2.js 里面的第一步,第二步,第三步的方法, 不用传值,


