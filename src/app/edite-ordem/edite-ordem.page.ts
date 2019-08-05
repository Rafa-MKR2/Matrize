import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordem, CarApiService } from '../car-api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edite-ordem',
  templateUrl: './edite-ordem.page.html',
  styleUrls: ['./edite-ordem.page.scss'],
})
export class EditeOrdemPage implements OnInit {
  ngOnInit() {
  }

  private id : string;
  private imagem : string
  private nome : string;
  private telefone : string;
  private melhoria : string;
  private descricao : string;
  private visualizado : boolean


  constructor(
    private route : ActivatedRoute, 
    public alert : AlertController,
    private router : Router,
    private service : CarApiService) {

    this.route.queryParams.subscribe(params => {
      if (params && params.id) 
            this.service.getOne(params.id).subscribe(item => { 
              this.id = params.id;
             this.editeCampus(item)
            })

      
    });

  
  }

  editeCampus(ordem : Ordem){
        this.nome =  ordem.nome;
        this.telefone = ordem.telefone;
        this.descricao = ordem.descricao;
        this.melhoria = ordem.melhoria;
        this.visualizado = ordem.visualizado;
        this.imagem = ordem.imagem;
  }

  EdicaoSalvar(){
        this.service.edite({
          id : this.id,
          nome : this.nome,
          telefone : this.telefone,
          melhoria : this.melhoria,
          descricao : this.descricao,
          visualizado : this.visualizado,
          imagem : this.imagem
        }).then( async  ()=>{
          const alert = await this.alert.create({
            header: 'Editado!',
            message: 'Ordem serviço Editada com sucesso!',
            buttons :[ {
              text: 'Ok',
              cssClass: 'secondary',
              handler: () =>  this.router.navigate(['./tabs/tab2'])
            }]
          });
         return await alert.present();

        })

  }



}
