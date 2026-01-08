import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PotentialEmployeesPageRoutingModule } from './potential-employees-routing.module';
import { PotentialEmployeesPage } from './potential-employees.page';

@NgModule({
  imports: [
    IonicModule,
    PotentialEmployeesPageRoutingModule,
    PotentialEmployeesPage // importamos el componente standalone
  ],
})
export class PotentialEmployeesPageModule {}
