import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';


/**
 * Generated class for the PersonalcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personalcenter',
  templateUrl: 'personalcenter.html',
})
export class PersonalcenterPage {
userimg
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalcenterPage');
  }
  ionViewWillEnter(){
    if(localStorage.getItem('mydata')){
     this.userimg=JSON.parse(localStorage.getItem('mydata')).headimgpath 
    }
   
  }
	

  wallet() {
    this.navCtrl.push("WalletPage");
  }
  gotoushilist(i){
    console.log(i)
    this.navCtrl.push("ToushilistPage",{type:i})
  }
  enter(){
    this.navCtrl.push("EnterPage")
  }
  goshol(){
  	let store = localStorage.getItem("storeinfo")
	console.log(store)
	if(store != "undefined"){
		this.navCtrl.push("SoplPage")
	}else{
		this.navCtrl.push("EnterPage")
	}
    
  }
  Detemgs(){
    this.navCtrl.push("CalendarPage")
  }
  Allorders(){
      this.navCtrl.push("PersonalorderadminPage")
    //this.navCtrl.push("AllordersPage")
  }
 callshop(){
   this.navCtrl.push("CallshopPage")
 }
 petAdmin() {
  this.navCtrl.push("PetAdminPage");
}
setpage(){
  this.navCtrl.push("SetPage")
}
Newsword(){
  this.navCtrl.push("NewswordPage")
}
advices(){
  this.navCtrl.push("AdvicesPage")
}
Coupon(){
  this.navCtrl.push("UsercouponPage")
}
Ckeck() {
  this.navCtrl.push("CkeckPage");
}
collect(){
  this.navCtrl.push("StorecollectPage");
}




}
