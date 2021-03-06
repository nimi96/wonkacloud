import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

//import PouchDB from 'pouchdb';

import * as PouchDB from 'pouchdb';



@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  
 

//public items:any;

private name;
private desc;
private price;
private quan;
private item;
public db:any;
public PouchDB:any;
public photo:any;
public base64image:string;
public img:any;

public remoteDB:any;

public username;
 public password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController ,private camera: Camera) {
 

        }


setupdb(){




this.db = new PouchDB('mytestdb');
    this.username = 'beircedurreastitsedrisly';
    this.password = '29d8c35d93e1a74de48cb1f229ae55970cf48bdf';
    this.remoteDB = 'https://0688ea10-ac0f-4885-a25e-aab174554829-bluemix.cloudant.com/item/';








this.db=new PouchDB('items');



//let remoteDB = new PouchDB('http://localhost:5984/item');
 

//this.db.sync(remoteDB);

/*
this.db.sync(remoteDB).on('complete', function () {
  alert("syning done");
}).on('error', function (err) {
  
  alert(err);
});

*/


this.db.sync(this.remoteDB, {
  live: true,
  retry: true
}).on('change', function (change) {
  console.log ("yo, something changed!");
}).on('paused', function (info) {
  console.log("replication was paused, usually because of a lost connection");
}).on('active', function (info) {
  console.log(" replication was resumed");
}).on('error', function (err) {
  console.log(" totally unhandled error (shouldn't happen");
});


  let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    };
 
    this.db.sync(this.remoteDB, options);
 
  
 








  }



  ionViewDidLoad() {

 this.setupdb();
    

    //console.log('ionViewDidLoad Tab1Page');


    if(this.navParams.get('item_id')!=null){



    	this.db.get(this.navParams.get('item_id'),(err, result)=>{

    		if(!err){

    			this.item=result;
    			
                 this.name=result.name;
                 this.desc=result.desc;
                 this.price=result.price;
                 this.quan=result.quan;

    			//console.log('hey'+result.name);
    			//this.name=result.name;

    		}


    	})
    }

  

  }

sg(){

//this is for update
if (this.item){


this.item.name=this.name;
this.item.desc=this.desc;
this.item.price=this.price;
this.item.quan=this.quan;
this.item.img=this.img;
this.db.put(this.item,(err,result)=>{


       if(!err){


	      let alert = this.alertCtrl.create({
        title: 'updated succesfully !',
        message: 'new item updated!',
        buttons: ['Ok']
	      });

      alert.present()


      this.navCtrl.pop();


      }


      } 


      );

      }

//this is for saving 

else{

	

this.db.post({
name:this.name,
desc:this.desc,
price:this.price,
quan:this.quan,
img:this.photo



},
(err,result)=>{
if(!err){

    let alert = this.alertCtrl.create({
      title: 'created!',
      message: 'new item registerd!',
      buttons: ['Ok']


    });

    alert.present()

}




this.navCtrl.push('ApPage');
})



}
}



cancel(){

this.navCtrl.push('ApPage');

}





takephoto(){


  
   
const options: CameraOptions = {
  quality: 20,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64image= 'data:image/jpeg;base64,' + imageData;

 this.photo=this.base64image;
 



// this.photo.reverse();




}, (err) => {
 // Handle error
});


}










}
