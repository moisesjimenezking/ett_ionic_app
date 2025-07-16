import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://ettapi.com'); // Conectar al servidor

    this.socket.on('connect', () => {
      console.log('✅ Conectado al servidor WebSocket');

      // Escuchar el evento 'newMessage'
      this.socket.on('newMessage', (data) => {
        console.log('📩 Mensaje recibido:', data);
      });
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Desconectado del servidor WebSocket');
    });

    this.socket.on('connect_error', (err) => {
      console.error('⚠️ Error de conexión a WebSocket:', err);
    });
  }

  sendMessage() {
    this.socket.emit('chat', { data: "I'm send 2!" });
    console.log('📤 Mensaje enviado');
  }

  listen(eventName: string, callback: Function) {
    this.socket.on(eventName, (data) => callback(data));
  }

  emit(eventName: string, data?: any) {
    this.socket.emit(eventName, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
