import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'Online' : 'Offline';
    setTimeout(() => {
      this.allowNewServer = false;
    }, 2000);
  }
  serverName:string = ''
  allowNewServer:boolean = true;
  serverId:number = 10275;
  serverStatus:string = 'Offline';
  serverList:Array<String> = [];

  goOnline() {
    this.serverStatus = 'Online';
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  getServerStatusBG() {
    return this.serverStatus === 'Online' ? 'green' : 'red';
  }

  addServer() {
    this.serverList.push(this.serverName);
    this.serverName = '';
  }
}
