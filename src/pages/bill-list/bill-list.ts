import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateBillPage } from '../create-bill/create-bill';


@IonicPage()
@Component({
  selector: 'page-bill-list',
  templateUrl: 'bill-list.html',
})
export class BillListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addNewBill(){
    this.navCtrl.push(CreateBillPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillListPage');
  }

}
