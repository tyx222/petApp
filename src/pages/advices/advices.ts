import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the AdvicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advices',
  templateUrl: 'advices.html',
})
export class AdvicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvicesPage');
  }
  godetails(){
    this.navCtrl.push("DetailsPage")
  }

  gostaff(){
      this.navCtrl.push("StaffmsgPage")
  }

}
