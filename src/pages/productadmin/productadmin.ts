import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PardackpushPage } from '../pardackpush/pardackpush';
import { UserService } from "./../../app/shared/service/user.service";

/**
 * Generated class for the ProductadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productadmin',
  templateUrl: 'productadmin.html',
})
export class ProductadminPage {
	imageUrl:string = ''
	type=''
  letfbor=-1 
  pageNum = 1;
  rowsPrePage = 10;
  data = [];
  keywords = ''
  constructor(public navCtrl: NavController, public http: UserService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.querygoodsbyseach()
  }

  getItems(ev: any){
	const val = ev.target.value;
	this.keywords = val;
	this.querygoodsbyseach()
  }

  evaluate(goods_id){
	this.navCtrl.push("StoreevaluatePage",{goods_id:goods_id})
  }

  pardackpush(){
    this.navCtrl.push("PardackpushPage")
  }
  remlist(i){
    alert("我要删除"+i)
    
   this.data.splice(this.letfbor,1)
   this.letfbor=-1
   console.log(this.data)
    
  }
  swipeEvent(e,i) {
    // console.log(e.offsetDirection);
    if (e.offsetDirection == 2) {
    this.letfbor=i
    }
    if (e.offsetDirection == 4) {
      this.letfbor=-1
    }
  }

  async querygoodsbyseach(){
  // 	if(this.keywords==''){
	// 	this.data = [];
	// 	return this.queryshopgoods()
	// }
	let storeinfo = JSON.parse(localStorage.getItem('storeinfo'))
	let params = {
		goods_name:this.keywords,
		shopid:storeinfo.shop_id,
		pageNum:this.pageNum,
		rowsPrePage:this.rowsPrePage
	}
	let res = await this.http.querygoodsbyseach({jsonPramter:JSON.stringify(params)})
	if(res.info=="ok"){
		this.data = res.arrayList;
		
	}
  }

  async queryshopgoods(){
	let storeinfo = JSON.parse(localStorage.getItem('storeinfo'))
	let Living;
	if(this.type=='活体'){
		Living = 0
	}
	if(this.type=='非活体'){
		Living = 1
	}
	let res = await this.http.queryshopgoods({Living:Living,shopid:storeinfo.shop_id,pageNum:this.pageNum,rowsPrePage:this.rowsPrePage})
	if(res.info=="ok"){
		this.imageUrl = 'http://116.62.219.45/imgs/'
		res.arrayList.forEach((val,index)=>{
			this.data.push(val)
		})
	}
  }

  edit(info){
      this.navCtrl.push("PardackpushPage",{goodsinfo:info})
  }
	
	//上下架
	async updatestatus(goods_id,status){
		let res = await this.http.updategoodstatus({goodid:goods_id,status:status});
		if(res.info=="ok"){
			this.data.forEach((val,index)=>{
				if(val.goods_id==goods_id){
					this.data[index].status = status
				}
			})
		}
	}
	
  check(type){
  	this.type = type
	this.queryshopgoods();
  }

  view(info){
  	
    this.navCtrl.push("StoreproductviewPage",{goodsid:info.goods_id})
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
	this.pageNum++
    setTimeout(() => {
      this.querygoodsbyseach()
		infiniteScroll.complete();
    }, 500);
  }


}
