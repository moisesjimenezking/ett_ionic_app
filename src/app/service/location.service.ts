import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  async getCurrentLocation() {
    try {
      const permission = await Geolocation.checkPermissions();

      if (permission.location !== 'granted') {
        await Geolocation.requestPermissions();
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
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
