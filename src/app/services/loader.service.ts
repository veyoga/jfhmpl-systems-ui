import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loader: HTMLIonLoadingElement;
    isLoading: boolean;
    constructor(private loadingController: LoadingController) { }

    async loadingPresent() {
        this.isLoading = true;
        return await this.loadingController.create({
            message: 'Please wait ...',
            spinner: 'circles'
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then();
                }
            });
        });
    }

    async loadingDismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then();
    }

}
