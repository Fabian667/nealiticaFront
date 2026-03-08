import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../core/services/contacto.service';
import { MensajeContacto } from '../../core/models/mensaje-contacto.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-info">
            <div class="brand">
              <h3>NEALITICA</h3>
              <p>Lic. Javier Carballido</p>
            </div>
            <div class="contact-details">
              <p><strong>Email:</strong> contacto@nealitica.com</p>
              <p><strong>Teléfono:</strong> +54 9 11 1234 5678</p>
              <p><strong>Dirección:</strong> Buenos Aires, Argentina</p>
            </div>
          </div>

          <div class="footer-form">
            <h4>Contáctanos</h4>
            <div *ngIf="mensajeEnviado" class="success-message">
              ¡Mensaje enviado con éxito!
            </div>
            <div *ngIf="errorEnvio" class="error-message">
              Error al enviar. Intente nuevamente.
            </div>
            
            <form (ngSubmit)="enviarContacto()" *ngIf="!mensajeEnviado">
              <div class="form-group">
                <input type="text" [(ngModel)]="contacto.nombre" name="nombre" placeholder="Nombre" required>
              </div>
              <div class="form-group">
                <input type="email" [(ngModel)]="contacto.email" name="email" placeholder="Email" required>
              </div>
              <div class="form-group">
                <textarea [(ngModel)]="contacto.mensaje" name="mensaje" placeholder="Mensaje" rows="3" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Enviar</button>
            </form>
          </div>
        </div>

        <div class="copyright">
          &copy; {{ currentYear }} Nealitica. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: #f1f1f1;
      color: #333333;
      padding: 60px 0 20px;
      margin-top: auto;
      border-top: 4px solid #D60000;
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
    }

    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }

    .footer-info h3 {
      margin-bottom: 10px;
      letter-spacing: 2px;
      color: #000000;
      font-size: 1.8rem;
    }

    .contact-details {
      margin-top: 20px;
    }

    .contact-details p {
      margin-bottom: 8px;
    }

    .footer-form h4 {
      margin-bottom: 15px;
      color: #D60000;
      font-size: 1.2rem;
    }

    .form-group {
      margin-bottom: 10px;
    }

    input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      font-family: inherit;
    }

    textarea {
      resize: vertical;
    }

    .submit-btn {
      background-color: #D60000;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    .submit-btn:hover {
      background-color: #b30000;
    }

    .success-message {
      color: green;
      background: #e8f5e9;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .error-message {
      color: red;
      background: #ffebee;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .copyright {
      padding-top: 20px;
      border-top: 1px solid rgba(0,0,0,0.1);
      text-align: center;
      font-size: 0.9rem;
      color: #666666;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  contacto: MensajeContacto = {
    nombre: '',
    email: '',
    asunto: 'Contacto desde Footer',
    mensaje: ''
  };
  
  mensajeEnviado = false;
  errorEnvio = false;

  constructor(private contactoService: ContactoService) {}

  enviarContacto(): void {
    if (!this.contacto.nombre || !this.contacto.email || !this.contacto.mensaje) {
      return;
    }

    this.contactoService.enviar(this.contacto).subscribe({
      next: () => {
        this.mensajeEnviado = true;
        this.errorEnvio = false;
        this.contacto = { nombre: '', email: '', asunto: 'Contacto desde Footer', mensaje: '' };
        setTimeout(() => this.mensajeEnviado = false, 5000);
      },
      error: () => this.errorEnvio = true
    });
  }
}
