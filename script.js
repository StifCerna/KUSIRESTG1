// Estado de la aplicación - TODO TEMPORAL (se borra al cerrar navegador)
const AppState = {
    currentUser: null,
    currentSection: 'inicio',
    cart: [],
    cuartos: [
        { id: 1, nombre: 'Cuarto A-101', estado: 'disponible', tipo: 'normal', precio: 13, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama', 'Aire Acondicionado', 'Enchufes'] },
        { id: 2, nombre: 'Cuarto A-102', estado: 'ocupado', tipo: 'normal', precio: 13, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama', 'TV', 'Enchufes'] },
    { id: 3, nombre: 'Cuarto B-201', estado: 'disponible', tipo: 'premium', precio: 18, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama King', 'TV Smart', 'Minibar', 'Aire Acondicionado'] },
        { id: 4, nombre: 'Cuarto B-202', estado: 'disponible', tipo: 'premium', precio: 18, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama King', 'TV Smart', 'Jacuzzi', 'Aire Acondicionado'] },
        { id: 5, nombre: 'Cuarto C-301', estado: 'disponible', tipo: 'normal', precio: 13, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama', 'Escritorio', 'Enchufes'] },
   { id: 6, nombre: 'Cuarto C-302', estado: 'ocupado', tipo: 'normal', precio: 13, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama', 'TV', 'Enchufes'] },
     { id: 7, nombre: 'Cuarto D-401', estado: 'disponible', tipo: 'premium', precio: 18, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Suite', 'TV Smart', 'Minibar', 'Vista Panorámica'] },
        { id: 8, nombre: 'Cuarto D-402', estado: 'disponible', tipo: 'normal', precio: 13, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama', 'Aire Acondicionado', 'Enchufes'] },
        { id: 9, nombre: 'Cuarto E-501', estado: 'ocupado', tipo: 'premium', precio: 18, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Suite Ejecutiva', 'TV Smart', 'Jacuzzi', 'Servicio 24h'] },
        { id: 10, nombre: 'Cuarto E-502', estado: 'disponible', tipo: 'normal', precio: 13, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama', 'TV', 'Enchufes'] },
        { id: 11, nombre: 'Cuarto F-601', estado: 'disponible', tipo: 'premium', precio: 18, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Suite Premium', 'TV Smart', 'Minibar', 'Balcón'] },
        { id: 12, nombre: 'Cuarto F-602', estado: 'ocupado', tipo: 'normal', precio: 13, imagen: 'assets/cuarto.jpg', servicios: ['WiFi', 'Cama', 'Escritorio', 'Enchufes'] }
    ],
    reservas: [],
    usuarios: []
};

// Usuario predefinido
const DEFAULT_USER = {
    email: 'kusi@gmail.com',
    password: 'kusi123',
    name: 'Usuario Kusirest'
};

// ÚNICA inicialización - NO DUPLICAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('?? Inicializando aplicación...');
    
    // Reset inicial
    AppState.currentUser = null;
    
    // Configurar navegación con scroll
    setupScrollNavigation();
    
    // Inicializar aplicación
    initApp();
});

function initApp() {
    console.log('?? Configurando componentes...');
    
    // Mostrar secciones iniciales
    mostrarSeccionesIniciales();
    
    // Configurar eventos
    setupNavigation();
 setupAuth();
    setupModals();
    setupCart();
    
    // Renderizar contenido
    renderCuartos();
    renderHistorial();
    updateStats();
    updateUserInterface();
    
    console.log('? Aplicación inicializada correctamente');
}

function mostrarSeccionesIniciales() {
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('nosotros').style.display = 'block';
    document.getElementById('contacto').style.display = 'block';
    document.getElementById('cuartos').style.display = 'none';
    document.getElementById('historial').style.display = 'none';
}

// ========== NAVEGACIÓN ==========
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
     const targetId = this.getAttribute('href').substring(1);
   
 if ((targetId === 'cuartos' || targetId === 'historial') && !AppState.currentUser) {
          console.log('?? Acceso denegado, redirigiendo a login');
       showAuthModal('login');
                return;
     }
    
            navigateToSection(targetId);
        });
    });
}

function navigateToSection(sectionId) {
    console.log('?? Navegando a:', sectionId);
    
    if ((sectionId === 'cuartos' || sectionId === 'historial') && !AppState.currentUser) {
        showAuthModal('login');
        return;
    }
    
    if (sectionId === 'cuartos' || sectionId === 'historial') {
        // Ocultar secciones principales
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('nosotros').style.display = 'none';
        document.getElementById('contacto').style.display = 'none';
   
        // Mostrar sección solicitada
        document.getElementById('cuartos').style.display = sectionId === 'cuartos' ? 'block' : 'none';
        document.getElementById('historial').style.display = sectionId === 'historial' ? 'block' : 'none';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
 }
    
    AppState.currentSection = sectionId;
}

function navegarACuartos() {
    console.log('?? Intentando navegar a cuartos');
    if (!AppState.currentUser) {
        console.log('? Sin usuario, mostrando login');
        showAuthModal('login');
        return;
    }
    console.log('? Usuario logueado, navegando...');
    navigateToSection('cuartos');
}

// ========== NAVEGACIÓN CON SCROLL (SEPARADA) ==========
function setupScrollNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Solo para navegación de scroll suave (inicio, nosotros, contacto)
    const scrollNavLinks = document.querySelectorAll('a[href="#inicio"], a[href="#nosotros"], a[href="#contacto"]');
 
    scrollNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
      e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
      // Mostrar todas las secciones principales
    document.getElementById('inicio').style.display = 'block';
          document.getElementById('nosotros').style.display = 'block';
        document.getElementById('contacto').style.display = 'block';
    document.getElementById('cuartos').style.display = 'none';
document.getElementById('historial').style.display = 'none';
    
    const targetSection = document.getElementById(targetId);
            if (targetSection) {
  const offsetTop = targetSection.offsetTop - 80;
    window.scrollTo({
       top: offsetTop,
    behavior: 'smooth'
           });
            }
    });
    });
}

// ========== AUTENTICACIÓN ==========
function setupAuth() {
    console.log('?? Configurando autenticación...');
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
  const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('? Login form configurado');
    }
    if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
        console.log('? Register form configurado');
    }
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    console.log('? Logout button configurado');
    }
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
 console.log('?? Abriendo modal de login');
            showAuthModal('login');
        });
        console.log('? Login button configurado');
    }
  
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
   e.preventDefault();
      showAuthModal('register');
      });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
        showAuthModal('login');
        });
    }
}

function handleLogin(e) {
    e.preventDefault();
    console.log('?? Procesando login...');
    
 const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
  
    console.log('?? Email:', email);
    console.log('?? Password length:', password.length);
    
    if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Verificar usuario predefinido
    if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
console.log('? Login exitoso con usuario predefinido');
loginUser(DEFAULT_USER);
        return;
}

    // Verificar usuarios registrados
    const user = AppState.usuarios.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('? Login exitoso con usuario registrado');
    loginUser(user);
    } else {
        console.log('? Credenciales incorrectas');
        alert('Credenciales incorrectas');
    }
}

function loginUser(user) {
    console.log('?? Logueando usuario:', user.name);
    
    AppState.currentUser = { email: user.email, name: user.name, password: user.password };
    
    console.log('?? Actualizando interfaz...');
    updateUserInterface();
    closeAllModals();
    
    // Limpiar formularios
    document.getElementById('loginForm').reset();
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').reset();
    }
  
    alert(`Bienvenido ${user.name}!`);
 console.log('? Login completado');
}

function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const name = document.getElementById('registerName').value.trim();
    
    if (!email || !password || !name) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    if (AppState.usuarios.find(u => u.email === email) || email === DEFAULT_USER.email) {
        alert('El usuario ya existe');
        return;
    }
    
    const newUser = { email, password, name, id: Date.now() };
  AppState.usuarios.push(newUser);
    
    loginUser(newUser);
alert('Registro exitoso! (Temporal)');
}

function handleLogout() {
    console.log('?? Cerrando sesión...');
    
    AppState.currentUser = null;
    AppState.cart = [];
    
    updateUserInterface();
    updateCartUI();
    mostrarSeccionesIniciales();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('Sesion cerrada correctamente');
}

// FUNCIÓN CRÍTICA: Actualizar interfaz de usuario
function updateUserInterface() {
    console.log('?? Actualizando interfaz de usuario...');
    
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const cuartosLink = document.getElementById('cuartos-link');
    const historialLink = document.getElementById('historial-link');
    
    console.log('?? Usuario actual:', AppState.currentUser ? AppState.currentUser.name : 'Ninguno');
    
    if (AppState.currentUser && AppState.currentUser.email) {
      // Usuario logueado
        console.log('? Mostrando interfaz de usuario logueado');
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
   if (userName) userName.textContent = AppState.currentUser.name;
        if (cuartosLink) {
       cuartosLink.style.opacity = '1';
            cuartosLink.style.pointerEvents = 'auto';
        cuartosLink.style.cursor = 'pointer';
        }
        if (historialLink) {
       historialLink.style.opacity = '1';
   historialLink.style.pointerEvents = 'auto';
    historialLink.style.cursor = 'pointer';
        }
    } else {
    // Usuario no logueado
        console.log('? Mostrando interfaz de usuario no logueado');
      if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
        if (cuartosLink) {
     cuartosLink.style.opacity = '0.5';
            cuartosLink.style.pointerEvents = 'none';
            cuartosLink.style.cursor = 'not-allowed';
        }
        if (historialLink) {
  historialLink.style.opacity = '0.5';
            historialLink.style.pointerEvents = 'none';
            historialLink.style.cursor = 'not-allowed';
        }
      
        // Forzar mostrar solo secciones públicas
        mostrarSeccionesIniciales();
    }
    
    console.log('? Interfaz actualizada');
}

// ========== CUARTOS ==========
function renderCuartos(filtro = 'todos') {
    console.log('?? Renderizando cuartos con filtro:', filtro);
    
    const grid = document.getElementById('cuartosGrid');
    if (!grid) {
        console.error('? No se encontró cuartosGrid');
return;
    }
    
    let cuartosFiltrados = AppState.cuartos;
    
    switch(filtro) {
        case 'disponibles': 
     cuartosFiltrados = AppState.cuartos.filter(c => c.estado === 'disponible'); 
            break;
        case 'premium': 
cuartosFiltrados = AppState.cuartos.filter(c => c.tipo === 'premium'); 
            break;
    }
    
    console.log('?? Cuartos a mostrar:', cuartosFiltrados.length);
    
  grid.innerHTML = cuartosFiltrados.map(cuarto => `
        <div class="cuarto-card ${cuarto.estado}" data-tipo="${cuarto.tipo}">
        <img src="${cuarto.imagen}" alt="${cuarto.nombre}" class="cuarto-image" onerror="this.style.display='none'">
    <div class="cuarto-content">
        <div class="cuarto-header">
     <h3 class="cuarto-name">${cuarto.nombre}</h3>
<span class="estado-badge estado-${cuarto.estado} ${cuarto.tipo === 'premium' ? 'estado-premium' : ''}">
           ${cuarto.estado === 'disponible' ? 'Disponible' : 'Ocupado'}
         ${cuarto.tipo === 'premium' ? ' - Premium' : ''}
         </span>
         </div>
      <div class="cuarto-servicios">
     <h4>Servicios incluidos:</h4>
       <div class="servicios-lista">
${cuarto.servicios.map(servicio => `<span class="servicio-tag">${servicio}</span>`).join('')}
               </div>
         </div>
       <div class="cuarto-footer">
        <div class="cuarto-precio">S/ ${cuarto.precio}</div>
<button class="reservar-btn" onclick="agregarAlCarrito(${cuarto.id})" ${cuarto.estado === 'ocupado' ? 'disabled' : ''}>
            ${cuarto.estado === 'ocupado' ? 'No Disponible' : 'Reservar'}
                    </button>
            </div>
          </div>
  </div>
 `).join('');
    
    setupFilters();
    console.log('? Cuartos renderizados');
}

function setupFilters() {
    const filtros = document.querySelectorAll('.filtro-btn');
 filtros.forEach(filtro => {
filtro.addEventListener('click', function() {
 filtros.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
   const filtroTipo = this.getAttribute('data-filtro');
            renderCuartos(filtroTipo);
        });
    });
}

function updateStats() {
    const disponibles = AppState.cuartos.filter(c => c.estado === 'disponible').length;
    const ocupados = AppState.cuartos.filter(c => c.estado === 'ocupado').length;
    
    console.log('?? Estadísticas:', { disponibles, ocupados });
    
    const disponiblesElement = document.getElementById('cuartosDisponibles');
    const ocupadosElement = document.getElementById('cuartosOcupados');
    
if (disponiblesElement) disponiblesElement.textContent = disponibles;
    if (ocupadosElement) ocupadosElement.textContent = ocupados;
}

// ========== CARRITO ==========
function setupCart() {
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
          console.log('?? Abriendo carrito');
         showCartModal();
        });
    }
    updateCartUI();
}

function agregarAlCarrito(cuartoId) {
    console.log('?? Agregando cuarto al carrito:', cuartoId);
    
    const cuarto = AppState.cuartos.find(c => c.id === cuartoId);
    
    if (!cuarto || cuarto.estado !== 'disponible') {
 alert('Este cuarto no esta disponible');
  return;
    }
    
    if (AppState.cart.find(item => item.id === cuartoId)) {
        alert('Este cuarto ya esta en tu carrito');
        return;
    }
    
    AppState.cart.push({
        ...cuarto,
        fechaReserva: new Date().toISOString(),
        horaInicio: '09:00',
        horaFin: '11:00'
    });
    
    updateCartUI();
    alert(`${cuarto.nombre} agregado al carrito`);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = AppState.cart.length;
        cartCount.style.display = AppState.cart.length > 0 ? 'flex' : 'none';
    }
}

function removerDelCarrito(cuartoId) {
    AppState.cart = AppState.cart.filter(item => item.id !== cuartoId);
    updateCartUI();
    showCartModal();
}

function showCartModal() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const confirmBtn = document.getElementById('confirmReservation');
  
    if (!modal || !cartItems || !cartTotal || !confirmBtn) return;
    
    if (AppState.cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
      confirmBtn.style.display = 'none';
        cartTotal.textContent = '0';
    } else {
        cartItems.innerHTML = AppState.cart.map((item, index) => {
 const horas = calcularHoras(item.horaInicio, item.horaFin);
 const precioTotal = item.precio * horas;
       
  return `
          <div class="cart-item">
         <div class="cart-item-info">
      <h4>${item.nombre}</h4>
                  <div class="horario-selector">
         <label for="horaInicio-${index}">Hora de inicio:</label>
       <select id="horaInicio-${index}" onchange="actualizarHorario(${index}, 'inicio', this.value)">
           <option value="08:00" ${item.horaInicio === '08:00' ? 'selected' : ''}>08:00</option>
           <option value="09:00" ${item.horaInicio === '09:00' ? 'selected' : ''}>09:00</option>
      <option value="10:00" ${item.horaInicio === '10:00' ? 'selected' : ''}>10:00</option>
      <option value="11:00" ${item.horaInicio === '11:00' ? 'selected' : ''}>11:00</option>
      <option value="12:00" ${item.horaInicio === '12:00' ? 'selected' : ''}>12:00</option>
 <option value="13:00" ${item.horaInicio === '13:00' ? 'selected' : ''}>13:00</option>
           <option value="14:00" ${item.horaInicio === '14:00' ? 'selected' : ''}>14:00</option>
         <option value="15:00" ${item.horaInicio === '15:00' ? 'selected' : ''}>15:00</option>
            <option value="16:00" ${item.horaInicio === '16:00' ? 'selected' : ''}>16:00</option>
         <option value="17:00" ${item.horaInicio === '17:00' ? 'selected' : ''}>17:00</option>
        </select>

            <label for="horaFin-${index}">Hora de fin:</label>
          <select id="horaFin-${index}" onchange="actualizarHorario(${index}, 'fin', this.value)">
           <option value="10:00" ${item.horaFin === '10:00' ? 'selected' : ''}>10:00</option>
          <option value="11:00" ${item.horaFin === '11:00' ? 'selected' : ''}>11:00</option>
         <option value="12:00" ${item.horaFin === '12:00' ? 'selected' : ''}>12:00</option>
             <option value="13:00" ${item.horaFin === '13:00' ? 'selected' : ''}>13:00</option>
              <option value="14:00" ${item.horaFin === '14:00' ? 'selected' : ''}>14:00</option>
        <option value="15:00" ${item.horaFin === '15:00' ? 'selected' : ''}>15:00</option>
    <option value="16:00" ${item.horaFin === '16:00' ? 'selected' : ''}>16:00</option>
         <option value="17:00" ${item.horaFin === '17:00' ? 'selected' : ''}>17:00</option>
       <option value="18:00" ${item.horaFin === '18:00' ? 'selected' : ''}>18:00</option>
        <option value="19:00" ${item.horaFin === '19:00' ? 'selected' : ''}>19:00</option>
  </select>
    </div>
             <p><strong>Duración:</strong> ${horas} hora${horas > 1 ? 's' : ''}</p>
     <p><strong>Precio por hora:</strong> S/ ${item.precio}</p>
                </div>
  <div style="display: flex; align-items: center; flex-direction: column; gap: 10px;">
             <span class="cart-item-price"><strong>S/ ${precioTotal}</strong></span>
          <button class="remove-item" onclick="removerDelCarrito(${item.id})">
     <i class="fas fa-trash"></i>
            </button>
           </div>
      </div>
            `;
        }).join('');
  
        const total = AppState.cart.reduce((sum, item) => {
 const horas = calcularHoras(item.horaInicio, item.horaFin);
  return sum + (item.precio * horas);
  }, 0);
        
  cartTotal.textContent = total;
        confirmBtn.style.display = 'block';
    }
    
    openModal(modal);
    confirmBtn.onclick = confirmarReserva;
}

function calcularHoras(horaInicio, horaFin) {
    const inicio = parseInt(horaInicio.split(':')[0]);
    const fin = parseInt(horaFin.split(':')[0]);
    return fin <= inicio ? 1 : fin - inicio;
}

function actualizarHorario(index, tipo, hora) {
    if (AppState.cart[index]) {
        if (tipo === 'inicio') {
            AppState.cart[index].horaInicio = hora;
    const inicio = parseInt(hora.split(':')[0]);
 const finActual = parseInt(AppState.cart[index].horaFin.split(':')[0]);
   
            if (finActual <= inicio) {
    AppState.cart[index].horaFin = `${inicio + 1}:00`;
     const selectFin = document.getElementById(`horaFin-${index}`);
          if (selectFin) selectFin.value = AppState.cart[index].horaFin;
 }
        } else {
   const inicioActual = parseInt(AppState.cart[index].horaInicio.split(':')[0]);
      const fin = parseInt(hora.split(':')[0]);
    
if (fin <= inicioActual) {
              alert('La hora de fin debe ser mayor que la hora de inicio');
          return;
  }
        
 AppState.cart[index].horaFin = hora;
    }
      
        showCartModal();
    }
}

function confirmarReserva() {
    if (AppState.cart.length === 0) return;
    
    const total = AppState.cart.reduce((sum, item) => {
        const horas = calcularHoras(item.horaInicio, item.horaFin);
        return sum + (item.precio * horas);
    }, 0);
    
    const confirmacion = confirm(`Confirmar reserva por un total de S/ ${total}?`);
    if (!confirmacion) return;
    
    const confirmBtn = document.getElementById('confirmReservation');
    const originalText = confirmBtn.textContent;
    
    confirmBtn.textContent = 'Procesando pago...';
    confirmBtn.disabled = true;
    
    setTimeout(() => {
    AppState.cart.forEach(item => {
   const horas = calcularHoras(item.horaInicio, item.horaFin);
   const precioTotal = item.precio * horas;
         
         const reserva = {
        id: Date.now() + Math.random(),
   cuartoId: item.id,
      cuartoNombre: item.nombre,
  precio: precioTotal,
   precioPorHora: item.precio,
                horas: horas,
                fecha: new Date().toLocaleDateString('es-PE'),
    horaInicio: item.horaInicio || '09:00',
     horaFin: item.horaFin || '11:00',
         estado: 'activa',
         usuario: AppState.currentUser.email
          };

 AppState.reservas.push(reserva);

  const cuarto = AppState.cuartos.find(c => c.id === item.id);
    if (cuarto) cuarto.estado = 'ocupado';
        });

     AppState.cart = [];
     updateCartUI();
        
        renderCuartos();
  renderHistorial();
        updateStats();
        
        closeAllModals();
        alert(`Pago procesado! Reserva confirmada por S/ ${total} (TEMPORAL)`);
      
  setTimeout(() => navigateToSection('historial'), 1500);

     confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
    }, 2000);
}

// ========== HISTORIAL ==========
function renderHistorial(filtroEstado = 'todas') {
    if (!AppState.currentUser) return;
    
    const container = document.getElementById('reservasContainer');
    if (!container) return;

    let reservasUsuario = AppState.reservas.filter(r => r.usuario === AppState.currentUser.email);
    
    if (filtroEstado !== 'todas') {
        reservasUsuario = reservasUsuario.filter(r => r.estado === filtroEstado);
    }
    
    if (reservasUsuario.length === 0) {
        container.innerHTML = `
  <div class="no-reservas">
       <i class="fas fa-calendar-times"></i>
     <p>No tienes reservas ${filtroEstado === 'todas' ? '' : filtroEstado} aún.</p>
            </div>
        `;
        return;
  }
    
    container.innerHTML = reservasUsuario.map(reserva => `
        <div class="reserva-card">
  <div class="reserva-header">
          <h3 class="reserva-cuarto">${reserva.cuartoNombre}</h3>
        <span class="reserva-estado estado-${reserva.estado}">${capitalizeFirst(reserva.estado)}</span>
            </div>
   
   <div class="reserva-info">
     <div class="info-item">
           <i class="fas fa-calendar"></i>
       <span>${reserva.fecha}</span>
     </div>
       <div class="info-item">
    <i class="fas fa-clock"></i>
     <span>${reserva.horaInicio} - ${reserva.horaFin} (${reserva.horas || 'N/A'} hora${reserva.horas > 1 ? 's' : ''})</span>
</div>
     <div class="info-item">
          <i class="fas fa-money-bill-wave"></i>
  <span>S/ ${reserva.precio} ${reserva.precioPorHora ? `(S/ ${reserva.precioPorHora}/hora)` : ''}</span>
       </div>
     </div>
            
   <div class="reserva-actions">
 ${reserva.estado === 'activa' ? `
     <button class="action-btn btn-completar" onclick="cambiarEstadoReserva(${reserva.id}, 'completada')">
      Completar
     </button>
        <button class="action-btn btn-cancelar" onclick="cambiarEstadoReserva(${reserva.id}, 'cancelada')">
          Cancelar
  </button>
     ` : ''}
        <button class="action-btn btn-contactar" onclick="contactarSoporte()">
  Contactar
      </button>
</div>
      </div>
    `).join('');
    
    setupHistorialFilters();
}

function setupHistorialFilters() {
    document.querySelectorAll('.filtro-historial').forEach(filtro => {
    filtro.addEventListener('click', function() {
            document.querySelectorAll('.filtro-historial').forEach(f => f.classList.remove('active'));
  this.classList.add('active');
  
       const estado = this.getAttribute('data-estado');
            renderHistorial(estado);
      });
    });
}

function cambiarEstadoReserva(reservaId, nuevoEstado) {
    const reserva = AppState.reservas.find(r => r.id == reservaId);
    if (!reserva) return;
    
    reserva.estado = nuevoEstado;
    
  if (nuevoEstado === 'completada' || nuevoEstado === 'cancelada') {
 const cuarto = AppState.cuartos.find(c => c.id === reserva.cuartoId);
        if (cuarto) cuarto.estado = 'disponible';
    }
    
    renderHistorial();
    renderCuartos();
    updateStats();
    
    alert(`Reserva ${nuevoEstado} correctamente`);
}

function contactarSoporte() {
    alert('Funcion de contacto simulada - No implementada');
}

// ========== MODALES ==========
function setupModals() {
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlay = document.getElementById('modal-overlay');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    if (overlay) overlay.addEventListener('click', closeAllModals);
    
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeAllModals();
    });
}

function showAuthModal(type) {
  const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    closeAllModals();

    if (type === 'login' && loginModal) {
        openModal(loginModal);
    } else if (type === 'register' && registerModal) {
        openModal(registerModal);
    }
}

function openModal(modal) {
    const overlay = document.getElementById('modal-overlay');
    
    if (overlay) overlay.classList.add('show');
    modal.classList.add('show');
    modal.style.display = 'block';
  
    document.body.style.overflow = 'hidden';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('modal-overlay');
    
    modals.forEach(modal => {
        modal.classList.remove('show');
        modal.style.display = 'none';
    });
    
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
}

// ========== UTILIDADES ==========
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ========== FORMULARIO DE CONTACTO ==========
function mostrarMensajeEnvio() {
    const form = document.querySelector('.contacto-form');
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) isValid = false;
    });
    
    if (isValid) {
  const submitButton = form.querySelector('.submit-button');
 const originalText = submitButton.textContent;

     submitButton.textContent = 'Mensaje enviado ?';
    submitButton.style.backgroundColor = '#27ae60';
submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
  submitButton.style.backgroundColor = 'var(--primario)';
            submitButton.disabled = false;
            form.reset();
        }, 2000);
    
        alert('Mensaje enviado correctamente! (Solo simulacion)');
  } else {
        alert('Por favor completa todos los campos obligatorios');
    }

}
