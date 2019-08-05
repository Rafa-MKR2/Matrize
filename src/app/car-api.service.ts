import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



export interface Ordem {
  id?: string;
  nome: string,
  telefone: string,
  melhoria: string,
  descricao: string,
  imagem : string,
  visualizado: boolean
}

@Injectable({
  providedIn: 'root'
})



export class CarApiService {


  private ordem: Observable<Ordem[]>;
  private ordemColletion: AngularFirestoreCollection<Ordem>;
 
  constructor(
    private firebase : AngularFirestore,
    private camera: Camera) {

    this.ordemColletion = this.firebase.collection<Ordem>('ordem');
    this.ordem = this.ordemColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );


   }



   updateState(){
     return this.ordemColletion.stateChanges()

   }

   async capturaFoto(){

    let base64: string; 

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: false,
      allowEdit : true
    }
    
    await this.camera.getPicture(options).then(imageBase64 =>  base64 = imageBase64)
    return base64;
   }


   

  getOrdem(): Observable<Ordem[]>{
    return this.ordem
  }

  getOne(id: string): Observable<Ordem> {
    return this.ordemColletion.doc<Ordem>(id).valueChanges().pipe(
      take(1),
      map(ordem => {
        ordem.id = id;
        return ordem
      })
    );
  }

  addOrdem(ordem: Ordem): Promise<DocumentReference> {
    return this.ordemColletion.add(ordem);
  }

  edite(ordem: Ordem): Promise<void>{
    return  this.ordemColletion.doc(ordem.id).update({ 
      nome: ordem.nome,
      telefone: ordem.telefone,
      melhoria : ordem.melhoria,
      descricao :ordem.descricao,
      visualizado : ordem.visualizado,
      imagem : ordem.imagem
     });

  }

  delete(id: string): Promise<void>{
   return this.ordemColletion.doc(id).delete()
  }

}
