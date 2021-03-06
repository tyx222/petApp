import { File } from "@ionic-native/file";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Component } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { UserService } from "../../app/shared/service/user.service";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

// import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { ImgServiceProvider } from "../../providers/img-service/img-service";

/**
 * Generated class for the NewlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-newlay",
  templateUrl: "newlay.html"
})
export class NewlayPage {
  petimage = "assets/imgs/images/xinzengmaoka.png";
  fromdata = {
    pet_name: "",
    pet_birthday: "1",
    is_sterilisation: "",
    pet_weight: 0,
    comment: "",
    sex: "",
    kind: "",
    headimgpath:"",
  //  mytoken: ""
  };
  image_File;
  imgfile;
  imageURI;
  avatar;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private http: UserService,
    public file: File,
    private upimgserve: ImgServiceProvider
  ) // private imagePicker: ImagePicker
  {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewlayPage");
  }
  ionViewWillEnter() {
    console.log(this.navParams.get("data"));
    if (this.navParams.get("data") != undefined) {
      this.fromdata.pet_name = this.navParams.get("data").pet_name;
      this.fromdata.comment = this.navParams.get("data").comment;
      this.fromdata.pet_weight = this.navParams.get("data").pet_wheight;
      this.fromdata.pet_birthday = this.navParams
        .get("data")
        .pet_birthday.substr(0, 10);
      if (this.navParams.get("data").concernStatus) {
        this.fromdata.is_sterilisation = "1";
      } else {
        this.fromdata.is_sterilisation = "2";
      }
      this.fromdata["petcardid"] = this.navParams.get("data").id;
      console.log(this.fromdata);
      this.fromdata.kind = this.navParams.get("data").kind;
      this.fromdata.sex = this.navParams.get("data").is_sterilisation;
      this.fromdata.headimgpath = this.navParams.get("data").headimgpath;
      this.petimage = this.navParams.get("data").headimgpath;
    }
  }
 


  /**
   * 图片上传的调用方法
   */
  userimg() {
    this.initImgSer();
    this.upimgserve.showPicActionSheet();
    }
 initImgSer() {
    this.upimgserve.upload.success = data => {
      console.log(data);
    //  this.fromdata.headimgpath=data.imageUrl+data.object.map.filename
     // this.petimage=data.imageUrl+data.object.map.filename
        this.fromdata.headimgpath=data.object.map.filename
     this.petimage=data.imageUrl+data.object.map.filename
    };
  }



  
  async subfrom() {
    //this.fromdata.mytoken = localStorage.getItem("mytoken");
    for (let mgs in this.fromdata) {
      console.log(this.fromdata[mgs]);
      if (this.fromdata[mgs] == "" || this.fromdata[mgs] == null) {
        let message = "请认真填写资料";
        this.showToast(message);
        return false;
      }
    }

    if (this.navParams.get("data") !== undefined) {
      let res = await this.http.updatepetcard(this.fromdata);
      this.http.http.showToast(res.message);
      this.navCtrl.pop();
    } else {
      let res = await this.http.addpetcard(this.fromdata);
      this.http.http.showToast(res.message);
    }
    this.fromdata = {
      pet_name: "",
      pet_birthday: "1",
      is_sterilisation: "",
      pet_weight: null,
      comment: "",
      sex: "",
      kind: "",
      headimgpath:"",
     // mytoken: ""
    };
    this.petimage = "assets/imgs/images/xinzengmaoka.png"
    //  alert(this.fromdata.username+this.fromdata.text)
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "middle"
    });
    toast.present(toast);
  }
}
