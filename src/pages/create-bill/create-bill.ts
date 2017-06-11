import { Item } from 'ionic-angular/umd';
import { IonicStorageModuleNgFactory } from '@ionic/storage/es2015/index.ngfactory';
import { ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-create-bill',
  templateUrl: 'create-bill.html',
})
export class CreateBillPage {
 
  itemList: FirebaseListObservable<any[]>;
  
  item: any;
  items: Item[] = [];
  key: any;
  name: any;
  quantity: any;
  unit: any;
  price: any;
  itemId: string;
  itemName: any;
  itemQuantity: any;
  itemUnit: any;
  itemPrice: any;
  totalAmount: any;
  total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public angFire: AngularFireDatabase, public toastCtrl: ToastController, public firebaseData: FirebaseProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
    
    
    this.itemList = angFire.list('/Items');    
  }

  takePhoto(){

  }


  addItems(){
    let prompt = this.alertCtrl.create({
      title: 'Purchase Items',
      message: 'Enter Item details for purchase',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          type: 'number'
        },
        {
          name: 'units',
          placeholder: 'Grams, KG, Inches etc',
             
        },
        {
          name: 'price',
          placeholder: 'Price Name',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Save',
          handler: data =>{
            this.itemList.push({
              name: data.name,
              quantity: data.quantity,
              units: data.units,
              price: data.price
            })
          }
        }
      ]
    });
    prompt.present();
  }

showOptions(itemId: any, itemName: any, itemQuantity: any, itemUnit: any, itemPrice: any){
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Item',
        role: 'destructive',
        handler: () => {
          this.removeItem(itemId);
        }
      }, {
        text: 'Update Item',
        handler: () => {
          this.updateItem(itemId, itemName, itemQuantity, itemUnit, itemPrice);
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked')
        }
      }
    ]
  });
  actionSheet.present();
}

removeItem(itemId: string){
  this.itemList.remove(itemId);
  
}

updateItem(itemId: any, itemName: any, itemQuantity: any, itemUnit: any, itemPrice: any){
  let prompt = this.alertCtrl.create({
    title: 'Item Name',
    message: "Update the name for this item",
    inputs: [
      {
        name: 'name',
        placeholder: 'Item Name',
        value: itemName
      },
      {
        name: 'quantity',
        placeholder: 'Quantity',
        value: itemQuantity
      },
      {
        name:'units',
        placeholder: 'Unit',
        value: itemUnit
      },
      {
        name: 'price',
        placeholder: 'Price',
        value: itemPrice
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Update canceled')
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.itemList.update(itemId, {
            name: data.name,
            quantity: data.quantity,
            units: data.units,
            price: data.price
          })
        }
      }
    ]
  });
  prompt.present();
}


  getTotal() {
    this.itemPrice += this.itemPrice;
    return this.itemPrice;
}

saveBill(fullname: any, mobile: any, total: any, purchaseDate: any, dueDate: any, location: any, terms: any){
  
}

}
