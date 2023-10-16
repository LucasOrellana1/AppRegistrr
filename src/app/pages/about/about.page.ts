import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private menu: MenuController) { }
  ngOnInit(): void {
  }
  openFirst() {
    this.menu.enable(true, 'end');
    this.menu.open('end');
  }
  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  closeMenu() {
    this.menu.close();
  }
}
  

