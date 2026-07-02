import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Importante para capturar los inputs

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // 👈 Le avisamos a Angular que usaremos formularios
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('IronForge Inventory Management');

  // Variables para guardar lo que escribes en la web
  nombreProducto: string = '';
  detalleProducto: string = '';

  async enviarDatosDesdeWeb() {
    // Si los campos están vacíos, no hace nada
    if (!this.nombreProducto || !this.detalleProducto) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    const nuevoProducto = {
      nombre: this.nombreProducto,
      descripcion: this.detalleProducto
    };

    console.log('Enviando datos a la API...', nuevoProducto);

    try {
      const respuesta = await fetch('http://localhost:10000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });

      if (respuesta.ok) {
        console.log('¡Producto guardado con éxito!');
        
        // Mostrar el recuadro de éxito
        const mensajeExito = document.getElementById('mensajeExito');
        if (mensajeExito) mensajeExito.style.display = 'block';

        // Limpiar cajas de texto
        this.nombreProducto = '';
        this.detalleProducto = '';
      } else {
        console.error('Error en el servidor al guardar');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }
}