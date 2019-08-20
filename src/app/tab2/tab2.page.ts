import { Component } from '@angular/core';
import { pendiente } from '../models/pendientes.interface';
import { PenService } from '../seservices/pen.service';
import { AlertController } from '@ionic/angular';
import { NavController } from'@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pendientes:pendiente[];
  pendie: pendiente = {
    estado:'',
    pedido:'',
    ubicacion:''
  };
  dataToSends: pendiente={
    estado:'',
    pedido:'',
    ubicacion:''
  };
  constructor(public penserv: PenService,private alertCtrl: AlertController,public nav:NavController) {}
  ngOnInit(){
    this.penserv.getTodos().subscribe(res=>{
      console.log('s',res);
      this.pendientes = res;
    });
  }
  add(){
    this.penserv.addUser(this.pendie).then(()=>{
      
    });
  }
  async edit(editValor: string,esta:string, ped: string, ubi:string) {
    console.log(editValor);
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Pedido',
      message: 'Llene los campos',
      inputs: [{
        name: 'estado',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: esta
      },
      {
        name: 'pedido',
        type: 'text',
        placeholder: 'Escriba el celular',
        value: ped
      },
      {
        name: 'ubicacion',
        type: 'text',
        placeholder: 'Escriba el correo',
        value: ubi
      
      }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Se cancelo la acción');
          }
        }, {
          text: 'Aceptar',
          handler: (datos) => {
            this.dataToSends = {
              estado: datos.estado,
              pedido: datos.pedido,
              ubicacion: datos.ubicacion
            };
            console.log (this.dataToSends);
           this.penserv.updateU(this.dataToSends,editValor).then(()=>{
          
          });
        }
      }
      ]
    });
    await alertInput.present();
  }
  remove(id:string){
    this.penserv.deleteU(id);
  }
  logOut(){
    this.nav.navigateForward('/');
  }
}
