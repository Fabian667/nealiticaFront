const http = require('http');

// Configuración
const BASE_URL = 'http://localhost:8080/api';
const CREDENTIALS = {
  username: 'fabian',
  password: 'aniliza2025',
  email: 'fabian@nealitica.com',
  role: ['admin'] 
};

// Datos a insertar
const SEED_SERVICIOS = [
  {
    titulo: 'Investigación de Mercado',
    descripcion: 'Análisis profundo del comportamiento del consumidor y tendencias del mercado para identificar oportunidades de crecimiento.',
    imagenUrl: '',
    activo: true,
    orden: 1
  },
  {
    titulo: 'Análisis de Datos y Big Data',
    descripcion: 'Procesamiento, limpieza y visualización de grandes volúmenes de datos para facilitar la toma de decisiones estratégicas basadas en evidencia.',
    imagenUrl: '',
    activo: true,
    orden: 2
  },
  {
    titulo: 'Comunicación Estratégica',
    descripcion: 'Desarrollo e implementación de planes de comunicación corporativa y gestión de crisis para fortalecer la reputación institucional.',
    imagenUrl: '',
    activo: true,
    orden: 3
  }
];

const SEED_NOTICIAS = [
  {
    titulo: 'Lanzamiento Oficial de Nealitica',
    contenido: 'Nos complace anunciar el lanzamiento de Nealitica, una firma consultora dedicada a transformar datos complejos en estrategias claras y accionables. Nuestro enfoque combina rigor analítico con visión de negocio.',
    imagenUrl: '',
    fechaPublicacion: new Date().toISOString(),
    activo: true
  }
];

const SEED_INFORMES = [
  {
    titulo: 'Panorama Económico y Social 2024',
    descripcion: 'Un informe detallado sobre las proyecciones económicas y los indicadores sociales clave para el próximo ejercicio fiscal.',
    archivoUrl: '#',
    fechaPublicacion: '2024-02-01',
    activo: true
  }
];

const SEED_ALIANZAS = [
  {
    nombre: 'Partner Tecnológico',
    logoUrl: 'https://placehold.co/200x100',
    urlSitio: 'https://example.com',
    activo: true
  },
  {
    nombre: 'Socio Logístico',
    logoUrl: 'https://placehold.co/200x100',
    urlSitio: 'https://example.com',
    activo: true
  }
];

// Función helper para peticiones HTTP
function request(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      method: method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (e) => {
      if (e.code === 'ECONNREFUSED') {
        reject(new Error(`No se pudo conectar al backend en ${BASE_URL}. Asegúrate de que el servidor esté corriendo.`));
      } else {
        reject(e);
      }
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function main() {
  console.log('--- Iniciando Script de Inicialización DB Nealitica ---');

  let token = null;

  // 1. Intentar Login
  console.log(`Intentando Login con usuario: ${CREDENTIALS.username}...`);
  try {
    let loginRes = await request('POST', '/auth/signin', {
      username: CREDENTIALS.username,
      password: CREDENTIALS.password
    });

    if (loginRes.status === 200) {
      console.log('Login exitoso.');
      token = loginRes.data.accessToken || loginRes.data.token;
    } else {
      console.log(`Login falló (Status: ${loginRes.status}). Intentando registro...`);
      
      // 2. Intentar Registro
      const signupRes = await request('POST', '/auth/signup', CREDENTIALS);
      
      if (signupRes.status === 200 || signupRes.status === 201) {
        console.log('Usuario registrado exitosamente.');
      } else if (signupRes.status === 400 && signupRes.data.message && signupRes.data.message.includes('taken')) {
        console.log('El usuario ya existe (según respuesta de registro).');
      } else {
        console.error('Error en registro:', signupRes.status, signupRes.data);
      }

      // Reintentar Login tras registro (o si ya existía)
      console.log('Reintentando Login...');
      loginRes = await request('POST', '/auth/signin', {
        username: CREDENTIALS.username,
        password: CREDENTIALS.password
      });

      if (loginRes.status === 200) {
        console.log('Login exitoso.');
        token = loginRes.data.accessToken || loginRes.data.token;
      } else {
        throw new Error(`No se pudo loguear. Status: ${loginRes.status}. Data: ${JSON.stringify(loginRes.data)}`);
      }
    }

    if (!token) {
      throw new Error('No se obtuvo token de acceso.');
    }

    // 3. Crear Servicios
    console.log('\n--- Creando Servicios ---');
    for (const servicio of SEED_SERVICIOS) {
      const res = await request('POST', '/servicios', servicio, token);
      console.log(`[${res.status}] Servicio: ${servicio.titulo}`);
    }

    // 4. Crear Noticias
    console.log('\n--- Creando Noticias ---');
    for (const noticia of SEED_NOTICIAS) {
      const res = await request('POST', '/noticias', noticia, token);
      console.log(`[${res.status}] Noticia: ${noticia.titulo}`);
    }

    // 5. Crear Informes
    console.log('\n--- Creando Informes ---');
    for (const informe of SEED_INFORMES) {
      const res = await request('POST', '/informes', informe, token);
      console.log(`[${res.status}] Informe: ${informe.titulo}`);
    }

    // 6. Crear Alianzas
    console.log('\n--- Creando Alianzas ---');
    for (const alianza of SEED_ALIANZAS) {
      const res = await request('POST', '/alianzas', alianza, token);
      console.log(`[${res.status}] Alianza: ${alianza.nombre}`);
    }

    console.log('\n--- Proceso Completado Exitosamente ---');

  } catch (error) {
    console.error('\nERROR:', error.message);
  }
}

main();
