# 🏫 Colegio Real de Santiago — Sitio Web Oficial
## Plantel San Juan del Río · 2025

---

## 📁 Estructura del proyecto

```
colegio-real-web/
├── index.html              ← Página principal
├── css/
│   └── style.css           ← Estilos completos
├── js/
│   └── main.js             ← Interacciones, partículas, galería
├── assets/
│   └── logo.png            ← Logotipo institucional
├── img/
│   └── eventos/            ← Fotos de eventos escolares (agregar aquí)
│       └── planteles/      ← Fotos de instalaciones
└── README.md
```

---

## 🗂️ Secciones incluidas

| Sección        | Descripción                                      |
|----------------|--------------------------------------------------|
| **Hero**       | Animación, logo, stats animados, CTA             |
| **Planteles**  | San Juan del Río (principal) + Querétaro          |
| **Acerca de**  | Historia, misión, visión, valores                |
| **Eventos**    | Galería con filtros y lightbox                   |
| **Reglamentos**| Accordion con 4 reglamentos                     |
| **Costos**     | 3 tarjetas: Primaria, Secundaria, Descuentos     |
| **Vacantes**   | 3 puestos + tarjeta abierta para CVs             |
| **Colaboradores** | Placeholder para Facturación y SICRS         |
| **Contacto**   | Formulario + datos de contacto                   |

---

## 🖼️ Cómo agregar fotos a la galería

1. Copia tus imágenes a `img/eventos/`
2. Abre `js/main.js` y busca el arreglo `const eventos = [...]`
3. Reemplaza cada objeto así:

```javascript
// ANTES (placeholder):
{ src: '', title: 'Día del Estudiante 2024', cat: 'cultural', placeholder: true }

// DESPUÉS (con foto real):
{ src: 'img/eventos/dia-estudiante.jpg', title: 'Día del Estudiante 2024', cat: 'cultural', placeholder: false }
```

**Categorías disponibles:** `cultural` · `deportes` · `academico` · `graduacion`

---

## 📞 Datos de contacto a personalizar

En `index.html`, busca y reemplaza:
- `+52 (427) 000-0000` → teléfono real
- `contacto@colegiorealdesantiago.mx` → correo real
- `San Juan del Río, Querétaro` → dirección exacta

---

## 🤝 Sección Colaboradores (SICRS / Facturación)

La sección está lista como placeholder. Cuando tengas los logos o información:
- Agrega los logos en `assets/`
- En `index.html` busca `id="colaboradores"` y reemplaza las tarjetas `.colab-placeholder`

---

## 🎨 Colores institucionales

| Variable       | Valor     | Uso                    |
|----------------|-----------|------------------------|
| `--gold`       | `#c9a84c` | Dorado principal       |
| `--gold-light` | `#e8c96a` | Dorado claro / hover   |
| `--navy-deep`  | `#070f3a` | Azul muy oscuro        |
| `--navy-bg`    | `#0a0e2e` | Fondo general          |
| `--royal`      | `#1a237e` | Azul royal             |

---

## 🚀 Subir a GitHub Pages

```bash
git init
git add .
git commit -m "feat: sitio web Colegio Real de Santiago"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Luego en GitHub → **Settings → Pages → Source: main / root → Save**

---

## ✨ Funciones y animaciones

- Partículas doradas flotantes en toda la página (canvas fixed)
- Birretes 🎓 cayendo continuamente por toda la pantalla
- Cursor personalizado dorado con lag suave
- Hero con contador animado (25+, 800+, 60+)
- Galería con filtros por categoría + lightbox con teclado
- Accordion para reglamentos
- Reveal on scroll en todas las secciones
- Tilt 3D en tarjetas de planteles y misión/visión
- Nav con blur glass al hacer scroll
- Formulario de contacto con feedback visual
- 100% responsive (móvil, tablet, escritorio)

---

*Diseñado con el estilo y colores del Colegio Real de Santiago · Plantel San Juan del Río*
