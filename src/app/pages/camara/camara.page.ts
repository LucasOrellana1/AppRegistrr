import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner/public_api';
import { AlertController, NavController } from '@ionic/angular';

import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  scanResult: any='';
  


  p = '{"nombre":"a","seccion":"001d","sala":"215"}';
/*   f = JSON.parse(this.p);
 */  
  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    private userService: UsersService,
    private afAuth: AngularFireAuth,
    private router: Router,
    ) { }

  ngOnInit() {
    /* BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    }); */
  }

  /* async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  } */

  onCodeResult(result:any)
  {
    
    result = JSON.parse(result);
    
    console.log(result);

    this.scanResult=result;
    this.afAuth.authState.subscribe((user:any) => {
      this.userService.asistencia(result, user.displayName);
      this.userService.presentAlert("Asistencia tomada", "Presente: " + user.displayName)
/*       this.router.navigate(['/inicio']);
 */
    })
    

  }



}

