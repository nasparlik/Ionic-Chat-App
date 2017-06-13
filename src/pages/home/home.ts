import { Component, NgZone, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  messages:any = [];
  herokuhost: string = 'https://peaceful-waters-74305.herokuapp.com/';
  socketHost: string = "localhost:3000";
  socket:any;
  chat:any;
  username:string;
  username1:string = 'Cosmin';
  zone:any;
  constructor(public navCtrl: NavController) {
    this.socket = io.connect(this.herokuhost);
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on("chat message", (msg) =>{
      this.zone.run(() =>{
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });
  }

  chatSend(v){
    let data = {
      message: v.chatText,
      username: this.username
    }
    this.socket.emit('new message', data);
    this.chat = '';
  }

}