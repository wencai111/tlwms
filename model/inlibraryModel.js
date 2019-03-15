/**
  *物料模型对象
  *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
*/
function material(){
	this.id="";
	this.code="";
	this.codeid='';
	this.count=0;
}

/**
  *货架模型对象
  *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
*/
function storage(){
	this.id="";
	this.code="";
	this.codeid='';
}

/**
  *物料入库模型对象
  *案例：{id:'W',code:'1001030001-B12',codeid:'1',count:12}
*/
function materialStorage(){
	this.id="";
	this.code="";
	this.TotalAmount='';
	this.storages=[];//入库集合
}






