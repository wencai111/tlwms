
function deliveryNoteModel() {
	this.LocalID = "";
	this.LocalName= '';
	this.MNumber= '';
	this.MName='';
	this.SupplyName='';
	this.InDate='';
	this.EndQuan='';
	this.check = function(data) {
			this.LocalID = data.LocalID;
			this.LocalName = data.LocalName;
			this.MNumber = data.MNumber;
			this.MName = data.MName;
			this.LocalName = data.LocalName;
			this.SupplyName = data.SupplyName;
			this.InDate = data.InDate;
			this.EndQuan = data.EndQuan;
			}
};
const deliveryNoteModels = new deliveryNoteModel();
export default deliveryNoteModels;