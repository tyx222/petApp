import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../../app/shared/service/user.service';

/**
 * Generated class for the RequstDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'RequstDetailPage'
})
@Component({
  selector: 'page-requst-detail',
  templateUrl: 'requst-detail.html',
})
export class RequstDetailPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: UserService,
  ) {
  }

  ionViewDidLoad() {
    let refundable_id = this.navParams.get('refundable_id')
    this.queryRefundable(refundable_id)
  }


  //退款详情
  async queryRefundable(refundable_id) {
    let res = await this.http.queryRefundable({ refundable_id: refundable_id });
    if (res.info == "ok") {
      // this.refundinfo = res.object
    } else {
      this.http.presentToast('退款数据不存在')
    }
  }
}
