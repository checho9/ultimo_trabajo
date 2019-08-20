import { Component, OnInit } from '@angular/core';
import { sucursal } from '../models/sucursales.interface';
import { SucuService } from '../seservices/sucu.service';
import { AlertController } from '@ionic/angular';
import { NavController } from'@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  sucursales:sucursal[];
  sucu:sucursal={
    nombre:'',
    direccion:'',
    telefono:''
  }
  dataToSend={
    nombre:'',
    direccion:'',
    telefono:''
  }
  constructor(private sucuserv: SucuService, 
    private alertCtrl: AlertController,
    public nav: NavController
    ) { 

      

    }

  ngOnInit() {
    this.sucuserv.getTodos().subscribe(res=>{
      console.log('s',res);
      this.sucursales = res;
    });
  }
  add(){
    this.sucuserv.addUser(this.sucu).then(()=>{
      
    });
  }
  remove(id: string){
    this.sucuserv.deleteU(id);
  }
  
  async edit(editValor: string, name: string, dir: string, tel: string) {
    console.log(editValor);
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Sucursal',
      message: 'Llene los campos',
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: name
      },
      {
        name: 'direccion',
        type: 'text',
        placeholder: 'Escriba el celular',
        value: dir
      },
      {
        name: 'telefono',
        type: 'text',
        placeholder: 'Escriba el correo',
        value: tel
      
      }, 
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
            this.dataToSend = {
              nombre:datos.nombre,
              direccion:datos.direccion,
              telefono:datos.telefono
            };
            console.log (this.dataToSend);
           this.sucuserv.updateU(this.dataToSend,editValor).then(()=>{
         
          });
        }
      }
      ]
    });
    await alertInput.present();
    }
    logOut(){
    
      this.nav.navigateForward('/');
    }
}
