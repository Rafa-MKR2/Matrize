import { Component } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private nome : string;
  private telefone : string;
  private melhoria : string;
  private descricao : string;
  private imagem : SafeUrl = this.sanitizer.bypassSecurityTrustUrl('../../assets/placed.png');

  public base64Imagem : string | null;

  constructor(
    public service : CarApiService,
    private sanitizer: DomSanitizer,
    private screenOrientation: ScreenOrientation,
    public alert : AlertController
    ){

    }
  

  async foto(){
    this.screenOrientation.lock('landscape');

    await  this.service.capturaFoto().then(image=>  {
    this.imagem = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+image);
    this.base64Imagem ='data:image/jpeg;base64,'+image;
    this.screenOrientation.lock('portrait');


    }).catch(()=>  this.screenOrientation.lock('portrait'))
  }

  salvar(){

    if(this.nome==='' || this.telefone==='' || this.melhoria===''){
      this.presentAlert('Formulário invalido','preencha campos corretamente');
      return;
    }

    this.service.addOrdem({
        nome : this.nome,
        telefone : this.telefone,
        melhoria : this.melhoria,
        descricao : this.descricao,
        imagem : this.base64Imagem?  this.base64Imagem :  '../../assets/placed.png',
        visualizado : false,

    })
    .then(()=> 
     { 
       this.presentAlert('Sucesso!', 'Ordem gravada com sucesso!');
       this.imagem = this.sanitizer.bypassSecurityTrustUrl('../../assets/placed.png');
       this.base64Imagem = null;
      this._limpaFormulario(); })
    .catch(()=> 
      this.presentAlert('Error!', 'Não foi possivel gravar dados'))
}


 async presentAlert(titulo: string, mensagem: string) {

    const alert = await this.alert.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
   return await alert.present();
  }


  _limpaFormulario(){
    this.nome=''
    this.telefone =''
    this.melhoria=''
    this.descricao=''

  }

}
