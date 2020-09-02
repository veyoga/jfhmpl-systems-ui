import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader: HTMLIonLoadingElement;

    constructor(private loadingController: LoadingController) {}

    async showLoader() {
        if (!this.loader) {
            this.loader = await this.loadingController.create({ message: 'Loading' });
        }
        await this.loader.present();
    }

    async hideLoader() {
        if (this.loader) {
            await this.loader.dismiss();
            this.loader = null;
        }
    }
}
