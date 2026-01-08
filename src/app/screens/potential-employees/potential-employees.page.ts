import { Component, OnInit } from '@angular/core';
import { ApiService } from '@/service/api.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-potential-employees',
  templateUrl: './potential-employees.page.html',
  styleUrls: ['./potential-employees.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class PotentialEmployeesPage implements OnInit {
  
  potentialEmployees: any[] = [];

  constructor(private apiEmployeeService: ApiService) { }

  ngOnInit() {
    this.loadPotentialEmployees();
  }

  loadPotentialEmployees() {
    this.apiEmployeeService.getPotentialEmployees().subscribe({
      next: (data: any[]) => {
        this.potentialEmployees = data.map(emp => ({
          ...emp,
          icon: emp.icon ? `https://ettapi.com/img/${emp.icon}` : 'assets/images/users/iconHuman.jpg'
        }));
      },
      error: (err) => {
        console.error('Error cargando empleados potenciales:', err);
      }
    });
  }

  openWhatsApp(phone: string) {
    if (!phone || phone.length < 11) return;

    // Normalizar
    let cleanPhone = phone.replace(/\D/g, ''); // quita espacios, guiones, símbolos

    // Asegurar código +58
    if (!cleanPhone.startsWith("58")) {
      cleanPhone = "58" + cleanPhone;
    }

    // WhatsApp solo acepta números sin "+"
    const url = `https://wa.me/${cleanPhone}?text=Hola,%20vi%20tu%20perfil%20en%20Ett`;

    window.open(url, "_blank");
  }


}
