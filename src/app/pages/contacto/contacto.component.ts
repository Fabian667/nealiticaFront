import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../core/services/contacto.service';
import { MensajeContacto } from '../../core/models/mensaje-contacto.model';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>Contacto</h1>
        <p>Estamos aquí para escucharte</p>
      </div>
    </section>

    <section class="page-content">
      <div class="container">
        <div class="contact-wrapper">
          <div class="contact-info">
            <h3>Información de Contacto</h3>
            <p>Ponte en contacto con nosotros para discutir cómo podemos ayudarte.</p>
            
            <div class="info-item">
              <strong>Email:</strong>
              <p>contacto@nealitica.com</p>
            </div>
            <div class="info-item">
              <strong>Teléfono:</strong>
              <p>+54 9 11 1234 5678</p>
            </div>
            <div class="info-item">
              <strong>Dirección:</strong>
              <p>Buenos Aires, Argentina</p>
            </div>
          </div>

          <div class="contact-form">
            <div *ngIf="mensajeEnviado" class="success-message">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
            </div>
            <div *ngIf="errorEnvio" class="error-message">
              Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
            </div>
            
            <form (ngSubmit)="enviarContacto()">
              <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" class="form-control" [(ngModel)]="contacto.nombre" name="nombre" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" [(ngModel)]="contacto.email" name="email" required>
              </div>
              <div class="form-group">
                <label for="asunto">Asunto</label>
                <input type="text" id="asunto" class="form-control" [(ngModel)]="contacto.asunto" name="asunto" required>
              </div>
              <div class="form-group">
                <label for="mensaje">Mensaje</label>
                <textarea id="mensaje" class="form-control" [(ngModel)]="contacto.mensaje" name="mensaje" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background-color: #001220;
      color: white;
      padding: 80px 0;
      text-align: center;
    }
    .contact-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      margin-top: 50px;
    }
    .contact-info {
      background: white;
      padding: 40px;
      border-radius: 4px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .info-item {
      margin-top: 20px;
    }
    .contact-form {
      background: white;
      padding: 40px;
      border-radius: 4px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    textarea.form-control {
      height: 150px;
      resize: vertical;
    }
    .submit-btn {
      background-color: var(--secondary-color);
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      width: 100%;
      font-weight: 600;
    }
    .success-message {
      background-color: #d4edda;
      color: #155724;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    .error-message {
      background-color: #f8d7da;
      color: #721c24;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    @media (max-width: 768px) {
      .contact-wrapper {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactoComponent {
  contacto: MensajeContacto = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };
  mensajeEnviado = false;
  errorEnvio = false;

  constructor(private contactoService: ContactoService) {}

  enviarContacto(): void {
    this.contactoService.enviar(this.contacto).subscribe({
      next: () => {
        this.mensajeEnviado = true;
        this.errorEnvio = false;
        this.contacto = { nombre: '', email: '', asunto: '', mensaje: '' };
        setTimeout(() => this.mensajeEnviado = false, 5000);
      },
      error: () => this.errorEnvio = true
    });
  }
}
