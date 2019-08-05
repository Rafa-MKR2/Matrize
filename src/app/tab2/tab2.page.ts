import { Component } from '@angular/core';
import { Ordem, CarApiService } from '../car-api.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private lista : Ordem[];

   

  constructor(
    public service : CarApiService,
    public router : Router,
    public alert : AlertController) {
    this.service.getOrdem().subscribe(item=>  this.lista = item)
  }



  deletar(ordem : Ordem){
    this.mensagemDelete(ordem);

  }


  visualiza(ordem: Ordem){
    if(!ordem.visualizado){
      ordem.visualizado = true;
      return this.service.edite(ordem)
    }else
    return;
    
  }


  editePage(ordem : Ordem): void{

    let navagatioExtras : NavigationExtras = {
      queryParams: {
        id : ordem.id
      }
    }
    this.router.navigate(['edite-ordem'],navagatioExtras)

  }

  async mensagemDelete(ordem: Ordem): Promise<void> {

    const alert = await this.alert.create({
      header: 'Apagar Ordem!!',
      message: 'Tem certeza que deseja apagar ordem de '+ordem.nome,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => console.log('cancelado!')
        }, {
          text: 'Sim',
          handler: () => this.service.delete(ordem.id)
        }
      ]
    });
   return await alert.present();
  }



}
