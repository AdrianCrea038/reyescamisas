// Variables globales
let productos = [];
let siteConfig = {};
let isAdminLoggedIn = false;
let editandoCampo = null;

// Credenciales de admin
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'reyes2026';

// Cargar datos
function cargarDatos() {
    // Cargar productos
    const productosGuardados = localStorage.getItem('reyesProductos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    } else {
        // Productos por defecto
        productos = [
            {
                id: 1,
                nombre: "CAMISA OXFORD WHITE",
                precio: 899,
                imagen: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
                colores: ["#FFFFFF", "#000000", "#1C4B62"],
                categoria: "formal",
                tipo: "manga-larga",
                descripcion: "Oxford premium, para los que mandan.",
                tag: "NEW"
            },
            {
                id: 2,
                nombre: "STREET BLUE",
                precio: 699,
                imagen: "https://images.unsplash.com/photo-1598033121414-5e17e7f3a922?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
                colores: ["#1C4B62", "#E8A519", "#CD3318"],
                categoria: "casual",
                tipo: "manga-corta",
                descripcion: "Estilo urbano, vibra fresca.",
                tag: "HOT"
            },
            {
                id: 3,
                nombre: "LINEN KING",
                precio: 799,
                imagen: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
                colores: ["#E8A519", "#CD3318", "#1C4B62"],
                categoria: "casual",
                tipo: "manga-larga",
                descripcion: "Lino natural, para los reyes del verano.",
                tag: "LIMITED"
            }
        ];
    }
    
    // Cargar configuración
    const configGuardada = localStorage.getItem('reyesConfig');
    if (configGuardada) {
        siteConfig = JSON.parse(configGuardada);
    } else {
        // Configuración por defecto para HONDURAS
        siteConfig = {
            siteName: 'REYES',
            siteSlogan: 'Urban streetwear para los que nacieron para destacar',
            heroTitulo: 'VISTE COMO UN',
            heroResaltado: 'REY',
            heroSubtitulo: 'Urban style para los que dominan la calle',
            heroImagen: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            heroBoton: 'VER COLECCIÓN',
            contactoTel: '+504 1234-5678',
            contactoWpp: '50412345678',
            contactoEmail: 'info@reyes.hn',
            contactoUbicacion: 'Villanueva, Cortés, Honduras',
            pais: 'Honduras',
            departamento: 'Cortés',
            ciudad: 'Villanueva',
            socialIg: 'https://instagram.com/reyes.hn',
            socialTk: 'https://tiktok.com/@reyes.hn',
            socialFb: 'https://facebook.com/reyes.hn',
            socialTw: 'https://twitter.com/reyes.hn',
            monedaSimbolo: 'L',
            monedaCodigo: 'HNL',
            textoBtnWpp: 'LO QUIERO',
            textoBtnModal: 'CONSULTAR POR WHATSAPP',
            newsletterTitulo: '¿Listo para ser un REY?',
            newsletterTexto: 'Suscríbete y recibe 10% de descuento en tu primera compra'
        };
    }
    
    aplicarConfiguracion();
}

function aplicarConfiguracion() {
    // Hero section
    const bgOverlay = document.querySelector('.bg-overlay');
    if (bgOverlay && siteConfig.heroImagen) {
        bgOverlay.style.backgroundImage = `url('${siteConfig.heroImagen}')`;
    }
    
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        heroTitle.innerHTML = `${siteConfig.heroTitulo} <span>${siteConfig.heroResaltado}</span>`;
    }
    
    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) {
        heroSubtitle.textContent = siteConfig.heroSubtitulo;
    }
    
    const heroButton = document.querySelector('.btn-primary');
    if (heroButton) {
        heroButton.innerHTML = `${siteConfig.heroBoton} <i class="fas fa-arrow-right"></i>`;
    }
    
    // Redes sociales
    const socialLinks = document.querySelector('.social-links');
    if (socialLinks) {
        socialLinks.innerHTML = `
            ${siteConfig.socialIg ? `<a href="${siteConfig.socialIg}" target="_blank" class="social-icon" data-social="ig"><i class="fab fa-instagram"></i></a>` : ''}
            ${siteConfig.socialTk ? `<a href="${siteConfig.socialTk}" target="_blank" class="social-icon" data-social="tk"><i class="fab fa-tiktok"></i></a>` : ''}
            ${siteConfig.socialFb ? `<a href="${siteConfig.socialFb}" target="_blank" class="social-icon" data-social="fb"><i class="fab fa-facebook"></i></a>` : ''}
            ${siteConfig.socialTw ? `<a href="${siteConfig.socialTw}" target="_blank" class="social-icon" data-social="tw"><i class="fab fa-x-twitter"></i></a>` : ''}
            <a href="https://wa.me/${siteConfig.contactoWpp}" target="_blank" class="social-icon" data-social="wpp"><i class="fab fa-whatsapp"></i></a>
        `;
    }
    
    // Contacto en footer - ACTUALIZADO PARA HONDURAS
    const footerPhones = document.querySelectorAll('.footer-section p');
    if (footerPhones.length) {
        const phoneElements = document.querySelectorAll('.footer-section p');
        phoneElements.forEach(el => {
            if (el.innerHTML.includes('fa-phone')) {
                el.innerHTML = `<i class="fas fa-phone"></i> ${siteConfig.contactoTel}`;
            } else if (el.innerHTML.includes('fa-whatsapp')) {
                el.innerHTML = `<i class="fab fa-whatsapp"></i> ${siteConfig.contactoTel}`;
            } else if (el.innerHTML.includes('fa-envelope')) {
                el.innerHTML = `<i class="fas fa-envelope"></i> ${siteConfig.contactoEmail}`;
            } else if (el.innerHTML.includes('fa-map-marker-alt')) {
                el.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${siteConfig.contactoUbicacion}`;
            }
        });
    }
    
    // WhatsApp float
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        const mensaje = encodeURIComponent(`¡Reyes! Quiero saber más sobre sus camisas 👑`);
        whatsappFloat.href = `https://wa.me/${siteConfig.contactoWpp}?text=${mensaje}`;
    }
    
    // Newsletter
    const newsletterTitulo = document.querySelector('.newsletter-content h3');
    if (newsletterTitulo) {
        newsletterTitulo.textContent = siteConfig.newsletterTitulo;
    }
    
    const newsletterTexto = document.querySelector('.newsletter-content p');
    if (newsletterTexto) {
        newsletterTexto.textContent = siteConfig.newsletterTexto;
    }
    
    // Actualizar el texto de envíos en features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        const title = card.querySelector('h3');
        if (title && title.textContent.includes('México')) {
            title.textContent = 'Envíos a toda Honduras';
            const p = card.querySelector('p');
            if (p) {
                p.textContent = 'Recibe tu estilo en Villanueva, Cortés y todo el país';
            }
        }
    });
    
    mostrarProductos();
}

function formatearPrecio(precio) {
    const simbolo = siteConfig.monedaSimbolo || 'L';
    // Formato hondureño: L 1,000.00
    return `${simbolo} ${precio.toLocaleString('es-HN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
}

function mostrarProductos() {
    const grid = document.getElementById('productos-grid');
    
    if (!productos || productos.length === 0) {
        grid.innerHTML = '<div class="no-resultados">NO HAY PRODUCTOS DISPONIBLES 🔍</div>';
        return;
    }
    
    grid.innerHTML = productos.map(producto => `
        <div class="producto-card" data-id="${producto.id}" data-categoria="${producto.categoria}" data-tipo="${producto.tipo}">
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                ${producto.tag ? `<span class="producto-tag">${producto.tag}</span>` : ''}
                <div class="producto-overlay">
                    <button class="btn-ver-producto" onclick="abrirModal(${producto.id})">VER MÁS</button>
                </div>
                ${isAdminLoggedIn ? `
                    <div class="admin-producto-actions">
                        <button onclick="editarProductoImagen(${producto.id})" class="admin-btn-small"><i class="fas fa-camera"></i></button>
                        <button onclick="editarProducto(${producto.id})" class="admin-btn-small"><i class="fas fa-edit"></i></button>
                        <button onclick="eliminarProducto(${producto.id})" class="admin-btn-small delete"><i class="fas fa-trash"></i></button>
                    </div>
                ` : ''}
            </div>
            <div class="producto-info">
                ${isAdminLoggedIn ? `
                    <div class="admin-edit-field" onclick="editarCampo('producto', ${producto.id}, 'nombre')">
                        <h3 class="producto-nombre">${producto.nombre} <i class="fas fa-pencil-alt edit-icon"></i></h3>
                    </div>
                    <div class="admin-edit-field" onclick="editarCampo('producto', ${producto.id}, 'precio')">
                        <p class="producto-precio">${formatearPrecio(producto.precio)} <i class="fas fa-pencil-alt edit-icon"></i></p>
                    </div>
                ` : `
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
                `}
                <div class="producto-colores">
                    ${producto.colores.map(color => `
                        <div class="color-circle" style="background-color: ${color};" title="Color disponible"></div>
                    `).join('')}
                </div>
                <button class="btn-whatsapp" onclick="consultarWhatsApp('${producto.nombre}', ${producto.precio})">
                    <i class="fab fa-whatsapp"></i> ${siteConfig.textoBtnWpp}
                </button>
            </div>
        </div>
    `).join('');
    
    if (isAdminLoggedIn && !document.getElementById('btn-nuevo-producto')) {
        const btnNuevo = document.createElement('div');
        btnNuevo.id = 'btn-nuevo-producto';
        btnNuevo.className = 'btn-nuevo-producto';
        btnNuevo.innerHTML = '<i class="fas fa-plus"></i>';
        btnNuevo.title = 'Agregar nuevo producto';
        btnNuevo.onclick = mostrarFormularioNuevoProducto;
        document.body.appendChild(btnNuevo);
    } else if (!isAdminLoggedIn && document.getElementById('btn-nuevo-producto')) {
        document.getElementById('btn-nuevo-producto').remove();
    }
    
    observerProductos();
}

function mostrarFormularioNuevoProducto() {
    const modalHTML = `
        <div id="modalNuevoProducto" class="modal-admin">
            <div class="modal-admin-content">
                <span class="close-modal-admin" onclick="cerrarModalNuevoProducto()">&times;</span>
                <h2 style="color: #E8A519; margin-bottom: 2rem;">NUEVO PRODUCTO</h2>
                
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" id="nuevoProdNombre" class="admin-input">
                </div>
                
                <div class="form-group">
                    <label>Precio (en Lempiras)</label>
                    <input type="number" id="nuevoProdPrecio" class="admin-input" placeholder="Ej: 899">
                </div>
                
                <div class="form-group">
                    <label>URL de Imagen</label>
                    <input type="url" id="nuevoProdImagen" class="admin-input" placeholder="https://...">
                </div>
                
                <div class="form-group">
                    <label>Descripción</label>
                    <textarea id="nuevoProdDescripcion" class="admin-input" rows="3"></textarea>
                </div>
                
                <div class="form-group">
                    <label>Categoría</label>
                    <select id="nuevoProdCategoria" class="admin-input">
                        <option value="casual">Street</option>
                        <option value="formal">Elegante</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Tipo</label>
                    <select id="nuevoProdTipo" class="admin-input">
                        <option value="manga-corta">Manga Corta</option>
                        <option value="manga-larga">Manga Larga</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Tag</label>
                    <select id="nuevoProdTag" class="admin-input">
                        <option value="">Sin tag</option>
                        <option value="NEW">NEW</option>
                        <option value="HOT">HOT</option>
                        <option value="LIMITED">LIMITED</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Colores (separados por coma, ej: #E8A519,#CD3318)</label>
                    <input type="text" id="nuevoProdColores" class="admin-input" placeholder="#E8A519,#1C4B62,#FFFFFF">
                </div>
                
                <button onclick="guardarNuevoProducto()" class="btn-save-admin">GUARDAR PRODUCTO</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function cerrarModalNuevoProducto() {
    document.getElementById('modalNuevoProducto').remove();
}

function guardarNuevoProducto() {
    const colores = document.getElementById('nuevoProdColores').value.split(',').map(c => c.trim());
    
    const nuevoProducto = {
        id: Date.now(),
        nombre: document.getElementById('nuevoProdNombre').value,
        precio: parseInt(document.getElementById('nuevoProdPrecio').value),
        imagen: document.getElementById('nuevoProdImagen').value,
        descripcion: document.getElementById('nuevoProdDescripcion').value,
        categoria: document.getElementById('nuevoProdCategoria').value,
        tipo: document.getElementById('nuevoProdTipo').value,
        tag: document.getElementById('nuevoProdTag').value,
        colores: colores.length ? colores : ['#E8A519']
    };
    
    productos.push(nuevoProducto);
    localStorage.setItem('reyesProductos', JSON.stringify(productos));
    
    cerrarModalNuevoProducto();
    mostrarProductos();
    mostrarNotificacion('Producto agregado correctamente', 'success');
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    const nuevoNombre = prompt('Editar nombre:', producto.nombre);
    if (nuevoNombre) {
        producto.nombre = nuevoNombre;
        guardarProductos();
        mostrarProductos();
    }
}

function editarProductoImagen(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    const nuevaImagen = prompt('URL de la nueva imagen:', producto.imagen);
    if (nuevaImagen) {
        producto.imagen = nuevaImagen;
        guardarProductos();
        mostrarProductos();
    }
}

function eliminarProducto(id) {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
        productos = productos.filter(p => p.id !== id);
        guardarProductos();
        mostrarProductos();
        mostrarNotificacion('Producto eliminado', 'success');
    }
}

function guardarProductos() {
    localStorage.setItem('reyesProductos', JSON.stringify(productos));
}

function editarCampo(tipo, id, campo) {
    if (tipo === 'producto') {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;
        
        let nuevoValor;
        if (campo === 'precio') {
            nuevoValor = prompt(`Editar precio en Lempiras:`, producto[campo]);
            if (nuevoValor) producto[campo] = parseInt(nuevoValor);
        } else {
            nuevoValor = prompt(`Editar ${campo}:`, producto[campo]);
            if (nuevoValor) producto[campo] = nuevoValor;
        }
        
        if (nuevoValor) {
            guardarProductos();
            mostrarProductos();
            mostrarNotificacion('Producto actualizado', 'success');
        }
    }
}

function abrirModal(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    const modal = document.getElementById('productoModal');
    if (!modal) {
        crearModal();
    }
    
    const modalBody = document.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-imagen">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            ${isAdminLoggedIn ? `
                <div class="admin-modal-edit" onclick="editarProductoImagen(${producto.id})">
                    <i class="fas fa-camera"></i> Cambiar imagen
                </div>
            ` : ''}
        </div>
        <div class="modal-info">
            ${isAdminLoggedIn ? `
                <div class="admin-edit-field" onclick="editarCampo('producto', ${producto.id}, 'nombre')">
                    <h2>${producto.nombre} <i class="fas fa-pencil-alt edit-icon"></i></h2>
                </div>
                <div class="admin-edit-field" onclick="editarCampo('producto', ${producto.id}, 'precio')">
                    <p class="modal-precio">${formatearPrecio(producto.precio)} <i class="fas fa-pencil-alt edit-icon"></i></p>
                </div>
                <div class="admin-edit-field" onclick="editarCampo('producto', ${producto.id}, 'descripcion')">
                    <p class="modal-descripcion">${producto.descripcion} <i class="fas fa-pencil-alt edit-icon"></i></p>
                </div>
            ` : `
                <h2>${producto.nombre}</h2>
                <p class="modal-precio">${formatearPrecio(producto.precio)}</p>
                <p class="modal-descripcion">${producto.descripcion}</p>
            `}
            
            <div class="modal-colores">
                <h3>COLORES DISPONIBLES:</h3>
                <div class="colores-lista">
                    ${producto.colores.map(color => `
                        <div class="color-circle" style="background-color: ${color};" onclick="seleccionarColor(this)"></div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-tallas">
                <h3>TALLAS:</h3>
                <div class="tallas-lista">
                    ${['S', 'M', 'L', 'XL'].map(talla => `
                        <button class="talla-btn" onclick="seleccionarTalla(this)">${talla}</button>
                    `).join('')}
                </div>
            </div>
            
            <button class="btn-primary" onclick="consultarWhatsApp('${producto.nombre}', ${producto.precio})">
                <i class="fab fa-whatsapp"></i> ${siteConfig.textoBtnModal}
            </button>
        </div>
    `;
    
    document.getElementById('productoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function crearModal() {
    const modal = document.createElement('div');
    modal.id = 'productoModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="cerrarModal()">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.getElementById('productoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function consultarWhatsApp(nombreProducto, precio) {
    const mensaje = encodeURIComponent(`¡Reyes Honduras! Me interesa la "${nombreProducto}" de ${formatearPrecio(precio)}. ¿Me dan más info? 👑`);
    window.open(`https://wa.me/${siteConfig.contactoWpp}?text=${mensaje}`, '_blank');
}

function seleccionarColor(element) {
    document.querySelectorAll('.colores-lista .color-circle').forEach(el => {
        el.style.transform = 'scale(1)';
        el.style.border = '2px solid var(--blanco)';
    });
    element.style.transform = 'scale(1.3)';
    element.style.border = '3px solid var(--amarillo)';
}

function seleccionarTalla(element) {
    document.querySelectorAll('.talla-btn').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
}

function filtrarProductos() {
    const filtroActivo = document.querySelector('.filtro-btn.active')?.dataset.filter || 'todos';
    const busqueda = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    let productosFiltrados = productos;
    
    if (filtroActivo !== 'todos') {
        productosFiltrados = productosFiltrados.filter(p => 
            p.categoria === filtroActivo || p.tipo === filtroActivo
        );
    }
    
    if (busqueda) {
        productosFiltrados = productosFiltrados.filter(p => 
            p.nombre.toLowerCase().includes(busqueda) ||
            p.descripcion.toLowerCase().includes(busqueda)
        );
    }
    
    const grid = document.getElementById('productos-grid');
    
    if (productosFiltrados.length === 0) {
        grid.innerHTML = '<div class="no-resultados">NO HAY COINCIDENCIAS 🔍</div>';
        return;
    }
    
    grid.innerHTML = productosFiltrados.map(producto => `
        <div class="producto-card" data-id="${producto.id}" data-categoria="${producto.categoria}" data-tipo="${producto.tipo}">
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                ${producto.tag ? `<span class="producto-tag">${producto.tag}</span>` : ''}
                <div class="producto-overlay">
                    <button class="btn-ver-producto" onclick="abrirModal(${producto.id})">VER MÁS</button>
                </div>
                ${isAdminLoggedIn ? `
                    <div class="admin-producto-actions">
                        <button onclick="editarProductoImagen(${producto.id})" class="admin-btn-small"><i class="fas fa-camera"></i></button>
                        <button onclick="editarProducto(${producto.id})" class="admin-btn-small"><i class="fas fa-edit"></i></button>
                        <button onclick="eliminarProducto(${producto.id})" class="admin-btn-small delete"><i class="fas fa-trash"></i></button>
                    </div>
                ` : ''}
            </div>
            <div class="producto-info">
                ${isAdminLoggedIn ? `
                    <div class="admin-edit-field" onclick="editarCampo('producto', ${producto.id}, 'nombre')">
                        <h3 class="producto-nombre">${producto.nombre} <i class="fas fa-pencil-alt edit-icon"></i></h3>
                    </div>
                    <div class="admin-edit-field" onclick="editarCampo('producto', ${producto.id}, 'precio')">
                        <p class="producto-precio">${formatearPrecio(producto.precio)} <i class="fas fa-pencil-alt edit-icon"></i></p>
                    </div>
                ` : `
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
                `}
                <div class="producto-colores">
                    ${producto.colores.map(color => `
                        <div class="color-circle" style="background-color: ${color};" title="Color disponible"></div>
                    `).join('')}
                </div>
                <button class="btn-whatsapp" onclick="consultarWhatsApp('${producto.nombre}', ${producto.precio})">
                    <i class="fab fa-whatsapp"></i> ${siteConfig.textoBtnWpp}
                </button>
            </div>
        </div>
    `).join('');
}

function observerProductos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.producto-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Sistema de Login
function mostrarLogin() {
    document.getElementById('loginModal').classList.add('active');
}

function cerrarLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        isAdminLoggedIn = true;
        localStorage.setItem('reyesAdmin', 'true');
        cerrarLoginModal();
        actualizarInterfazAdmin();
        activarEdicionElementos();
        mostrarNotificacion('👑 Modo Admin Activado - Haz clic en cualquier texto para editarlo', 'success');
        document.body.classList.add('modo-admin');
    } else {
        mostrarNotificacion('Credenciales incorrectas', 'error');
    }
}

function logout() {
    if (confirm('¿Salir del modo admin?')) {
        isAdminLoggedIn = false;
        localStorage.removeItem('reyesAdmin');
        document.body.classList.remove('modo-admin');
        mostrarNotificacion('Modo admin desactivado', 'info');
        
        const loginLink = document.getElementById('loginLink');
        if (loginLink) {
            loginLink.innerHTML = '<i class="fas fa-crown"></i> Login';
        }
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.parentElement.remove();
        }
        
        location.reload();
    }
}

function actualizarInterfazAdmin() {
    const loginLink = document.getElementById('loginLink');
    
    if (isAdminLoggedIn) {
        loginLink.innerHTML = '<i class="fas fa-crown"></i> Admin';
        loginLink.style.color = 'var(--amarillo)';
        
        if (!document.getElementById('logoutBtn')) {
            const navMenu = document.querySelector('.nav-menu');
            const logoutItem = document.createElement('li');
            logoutItem.innerHTML = '<a href="#" id="logoutBtn" style="color: #CD3318;"><i class="fas fa-sign-out-alt"></i> Salir</a>';
            navMenu.appendChild(logoutItem);
            
            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    }
    
    mostrarProductos();
}

// FUNCIONES PARA EDICIÓN
function editarHeroTitulo() {
    const nuevoTitulo = prompt('Editar título principal:', siteConfig.heroTitulo);
    if (nuevoTitulo) {
        siteConfig.heroTitulo = nuevoTitulo;
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        aplicarConfiguracion();
        mostrarNotificacion('Título actualizado', 'success');
    }
}

function editarHeroSubtitulo() {
    const nuevoSubtitulo = prompt('Editar subtítulo:', siteConfig.heroSubtitulo);
    if (nuevoSubtitulo) {
        siteConfig.heroSubtitulo = nuevoSubtitulo;
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        aplicarConfiguracion();
        mostrarNotificacion('Subtítulo actualizado', 'success');
    }
}

function editarHeroImagen() {
    const nuevaImagen = prompt('URL de la nueva imagen de fondo:', siteConfig.heroImagen);
    if (nuevaImagen) {
        siteConfig.heroImagen = nuevaImagen;
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        
        const bgOverlay = document.querySelector('.bg-overlay');
        if (bgOverlay) {
            bgOverlay.style.backgroundImage = `url('${nuevaImagen}')`;
        }
        
        mostrarNotificacion('Imagen de fondo actualizada', 'success');
    }
}

function editarTelefonos() {
    const nuevoTelefono = prompt('Editar teléfono (formato: +504 1234-5678):', siteConfig.contactoTel);
    if (nuevoTelefono) {
        siteConfig.contactoTel = nuevoTelefono;
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        
        document.querySelectorAll('.footer-section p').forEach(el => {
            if (el.innerHTML.includes('fa-phone')) {
                el.innerHTML = `<i class="fas fa-phone"></i> ${nuevoTelefono}`;
            } else if (el.innerHTML.includes('fa-whatsapp')) {
                el.innerHTML = `<i class="fab fa-whatsapp"></i> ${nuevoTelefono}`;
            }
        });
        
        mostrarNotificacion('Teléfono actualizado', 'success');
    }
}

function editarWhatsAppFooter() {
    const nuevoWpp = prompt('Editar número de WhatsApp (solo números, ej: 50412345678):', siteConfig.contactoWpp);
    if (nuevoWpp) {
        siteConfig.contactoWpp = nuevoWpp;
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        
        document.querySelectorAll('.footer-section p').forEach(el => {
            if (el.innerHTML.includes('fa-whatsapp')) {
                el.innerHTML = `<i class="fab fa-whatsapp"></i> +${nuevoWpp}`;
            }
        });
        
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            const mensaje = encodeURIComponent(`¡Reyes Honduras! Quiero saber más sobre sus camisas 👑`);
            whatsappFloat.href = `https://wa.me/${nuevoWpp}?text=${mensaje}`;
        }
        
        mostrarNotificacion('WhatsApp actualizado', 'success');
    }
}

function editarEmail() {
    const nuevoEmail = prompt('Editar email:', siteConfig.contactoEmail);
    if (nuevoEmail) {
        siteConfig.contactoEmail = nuevoEmail;
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        
        document.querySelectorAll('.footer-section p').forEach(el => {
            if (el.innerHTML.includes('fa-envelope')) {
                el.innerHTML = `<i class="fas fa-envelope"></i> ${nuevoEmail}`;
            }
        });
        
        mostrarNotificacion('Email actualizado', 'success');
    }
}

function editarUbicacion() {
    const nuevaUbicacion = prompt('Editar ubicación:', siteConfig.contactoUbicacion);
    if (nuevaUbicacion) {
        siteConfig.contactoUbicacion = nuevaUbicacion;
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        
        document.querySelectorAll('.footer-section p').forEach(el => {
            if (el.innerHTML.includes('fa-map-marker-alt')) {
                el.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${nuevaUbicacion}`;
            }
        });
        
        mostrarNotificacion('Ubicación actualizada', 'success');
    }
}

function editarMoneda() {
    const opciones = `
        Selecciona la moneda:
        1. Lempira (L) - HNL (Honduras)
        2. Dólar ($) - USD
        3. Euro (€) - EUR
        4. Personalizado
    `;
    
    const seleccion = prompt(opciones + '\n\nIngresa 1, 2, 3 o 4:');
    
    if (seleccion === '1') {
        siteConfig.monedaSimbolo = 'L';
        siteConfig.monedaCodigo = 'HNL';
    } else if (seleccion === '2') {
        siteConfig.monedaSimbolo = '$';
        siteConfig.monedaCodigo = 'USD';
    } else if (seleccion === '3') {
        siteConfig.monedaSimbolo = '€';
        siteConfig.monedaCodigo = 'EUR';
    } else if (seleccion === '4') {
        const simbolo = prompt('Ingresa el símbolo de la moneda (ej: £, ₿, ₵):');
        if (simbolo) {
            siteConfig.monedaSimbolo = simbolo;
        }
    }
    
    if (seleccion) {
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        mostrarProductos();
        mostrarNotificacion(`Moneda actualizada a ${siteConfig.monedaSimbolo}`, 'success');
    }
}

function editarSocialLink(element) {
    const social = element.dataset.social;
    let url = '';
    
    switch(social) {
        case 'ig': url = siteConfig.socialIg; break;
        case 'tk': url = siteConfig.socialTk; break;
        case 'fb': url = siteConfig.socialFb; break;
        case 'tw': url = siteConfig.socialTw; break;
        case 'wpp': 
            editarWhatsAppFooter();
            return;
    }
    
    const nuevaUrl = prompt('Editar URL de la red social:', url);
    if (nuevaUrl) {
        switch(social) {
            case 'ig': siteConfig.socialIg = nuevaUrl; break;
            case 'tk': siteConfig.socialTk = nuevaUrl; break;
            case 'fb': siteConfig.socialFb = nuevaUrl; break;
            case 'tw': siteConfig.socialTw = nuevaUrl; break;
        }
        localStorage.setItem('reyesConfig', JSON.stringify(siteConfig));
        aplicarConfiguracion();
        mostrarNotificacion('Red social actualizada', 'success');
    }
}

function activarEdicionElementos() {
    // Hero section editable
    const heroTitulo = document.querySelector('.hero-content h2');
    if (heroTitulo) {
        heroTitulo.setAttribute('onclick', 'editarHeroTitulo()');
        heroTitulo.style.cursor = 'pointer';
        heroTitulo.classList.add('editable');
    }
    
    const heroSubtitulo = document.querySelector('.hero-content p');
    if (heroSubtitulo) {
        heroSubtitulo.setAttribute('onclick', 'editarHeroSubtitulo()');
        heroSubtitulo.style.cursor = 'pointer';
        heroSubtitulo.classList.add('editable');
    }
    
    // Hero imagen editable
    const heroSection = document.querySelector('.hero');
    if (heroSection && !document.querySelector('.admin-edit-image')) {
        const heroImageBtn = document.createElement('div');
        heroImageBtn.className = 'admin-edit-image';
        heroImageBtn.innerHTML = '<i class="fas fa-camera"></i> Cambiar fondo';
        heroImageBtn.setAttribute('onclick', 'editarHeroImagen()');
        heroSection.appendChild(heroImageBtn);
    }
    
    // Redes sociales editables
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.setAttribute('onclick', 'editarSocialLink(this)');
        icon.style.cursor = 'pointer';
        icon.classList.add('editable');
    });
    
    // Footer elementos editables
    document.querySelectorAll('.footer-section p').forEach(el => {
        if (el.innerHTML.includes('fa-phone')) {
            el.setAttribute('onclick', 'editarTelefonos()');
            el.style.cursor = 'pointer';
            el.classList.add('editable');
        } else if (el.innerHTML.includes('fa-whatsapp')) {
            el.setAttribute('onclick', 'editarWhatsAppFooter()');
            el.style.cursor = 'pointer';
            el.classList.add('editable');
        } else if (el.innerHTML.includes('fa-envelope')) {
            el.setAttribute('onclick', 'editarEmail()');
            el.style.cursor = 'pointer';
            el.classList.add('editable');
        } else if (el.innerHTML.includes('fa-map-marker-alt')) {
            el.setAttribute('onclick', 'editarUbicacion()');
            el.style.cursor = 'pointer';
            el.classList.add('editable');
        }
    });
    
    // Precios editables para moneda
    document.querySelectorAll('.producto-precio').forEach(precio => {
        precio.setAttribute('onclick', 'editarMoneda()');
        precio.style.cursor = 'pointer';
        precio.classList.add('editable');
    });
}

function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('notificacion-show');
    }, 100);
    
    setTimeout(() => {
        notificacion.classList.remove('notificacion-show');
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    
    const savedSession = localStorage.getItem('reyesAdmin');
    if (savedSession === 'true') {
        isAdminLoggedIn = true;
        document.body.classList.add('modo-admin');
        actualizarInterfazAdmin();
        activarEdicionElementos();
    }
    
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarLogin();
        });
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filtrarProductos();
        });
    });
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filtrarProductos);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            mostrarNotificacion('¡Gracias por suscribirte, REY! 👑', 'success');
            newsletterForm.reset();
        });
    }
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('productoModal');
        if (e.target === modal) {
            cerrarModal();
        }
    });
});

// Hacer funciones globales
window.mostrarLogin = mostrarLogin;
window.cerrarLoginModal = cerrarLoginModal;
window.handleLogin = handleLogin;
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.consultarWhatsApp = consultarWhatsApp;
window.seleccionarColor = seleccionarColor;
window.seleccionarTalla = seleccionarTalla;
window.editarCampo = editarCampo;
window.editarProducto = editarProducto;
window.editarProductoImagen = editarProductoImagen;
window.eliminarProducto = eliminarProducto;
window.mostrarFormularioNuevoProducto = mostrarFormularioNuevoProducto;
window.guardarNuevoProducto = guardarNuevoProducto;
window.cerrarModalNuevoProducto = cerrarModalNuevoProducto;

// Funciones globales de edición
window.editarHeroTitulo = editarHeroTitulo;
window.editarHeroSubtitulo = editarHeroSubtitulo;
window.editarHeroImagen = editarHeroImagen;
window.editarTelefonos = editarTelefonos;
window.editarWhatsAppFooter = editarWhatsAppFooter;
window.editarEmail = editarEmail;
window.editarUbicacion = editarUbicacion;
window.editarMoneda = editarMoneda;
window.editarSocialLink = editarSocialLink;