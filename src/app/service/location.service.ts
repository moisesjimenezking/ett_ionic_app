import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  async getCurrentLocation() {
    try {
      // 🔹 SIEMPRE pedir permisos explícitamente
      const permission: PermissionStatus = await Geolocation.requestPermissions();

      if (permission.location !== 'granted') {
        console.warn('Permiso de ubicación NO concedido');
        return null;
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };

    } catch (error) {
      console.warn('No se pudo obtener la ubicación', error);
      return null;
    }
  }
}
