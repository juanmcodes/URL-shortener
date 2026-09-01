# 🚀 Craft it! - Acortador de Enlaces

**Craft it!** es una aplicación web full stack que permite a los usuarios acortar enlaces largos, gestionarlos de forma sencilla y exportarlos en formato JSON. Está pensada para ser intuitiva, moderna y segura, con soporte para autenticación mediante OAuth con Google y GitHub, y también permite su uso sin registro.

---

## 🧹 Características Principales

* 🔗 **Acortar enlaces:** crea URLs cortas personalizadas.
* 🛠️ **Gestión de enlaces:** edita, elimina y organiza tus enlaces desde el dashboard.
* 📂 **Exportación:** descarga todos tus enlaces en formato JSON.
* 🔐 **Autenticación segura:** inicia sesión con Google o GitHub gracias a Supabase.
* 👥 **Modo invitado:** los usuarios sin cuenta pueden acortar enlaces (sin gestión posterior).
* 🧱 **Redirección automática:** los enlaces cortos redirigen a la URL original.
* 🧐 **Interfaz clara y minimalista:** pensada para facilitar el uso.

---

## 🛠️ Tecnologías Utilizadas

### 💻 Frontend

* **React** – Librería para construir interfaces de usuario.
* **Vite** – Bundler rápido para entornos de desarrollo modernos.
* **React Router** – Manejo de rutas del cliente.
* **Supabase Auth** – Autenticación y gestión de sesiones.
* **CSS Puro** – Estilos personalizados y accesibles.

### 🧪 Backend

* **Node.js** – Entorno de ejecución para JavaScript.
* **Express** – Framework minimalista para APIs REST.
* **Supabase** – Base de datos SQL y autenticación integrada.
* **JWT** – Seguridad en la autenticación y autorización.
* **dotenv** – Manejo de variables de entorno.

---

## ⚙️ Instalación y Configuración

### 📋 Requisitos Previos

* Node.js (v16 o superior)
* pnpm (recomendado)
* Cuenta en [Supabase](https://supabase.com/)

---

### 📦 Clonación del Proyecto

```bash
git clone https://github.com/tu-usuario/link-shortener.git
cd link-shortener
pnpm install
```

---

### 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
SUPABASE_URL=<tu_supabase_url>
SUPABASE_KEY=<tu_supabase_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<tu_service_role_key>
JWT_SECRET=<tu_jwt_secret>
```

En el frontend, si usas Vite, crea `.env` con:

```env
VITE_SUPABASE_URL=<tu_supabase_url>
VITE_SUPABASE_KEY=<tu_supabase_anon_key>
```

---

## 🚀 Despliegue

Puedes desplegar el frontend en Vercel y el backend en Render. Asegúrate de:

* Configurar bien las **reglas de `vercel.json`** para permitir redirecciones.
* Apuntar los enlaces acortados al backend con `/:shortUrl` para que funcione correctamente.

---

## 📁 Estructura del Proyecto

```bash
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       │   ├── fonts/
│       │   └── logos/
│       ├── components/
│       │   ├── Button/
│       │   ├── ConfirmAlert/
│       │   ├── CrafterModal/
│       │   ├── InputLink/
│       │   ├── InputSearch/
│       │   ├── InputShort/
│       │   ├── LinkElement/
│       │   ├── LogModal/
│       │   ├── Navbar/
│       │   ├── Particles/
│       │   ├── SkeletonLinkElement/
│       │   ├── Toast/
│       │   └── UpdateModal/
│       ├── config/
│       └── pages/
│           ├── Dashboard/
│           │   └── Tabs/
│           │       ├── Links/
│           │       └── Settings/
│           └── Home/
│
└── backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        └── services/
```

---

## 🧑‍💻 Contribución

¿Te gustaría aportar ideas o mejoras? ¡Los PRs son bienvenidos! Puedes abrir issues para reportar bugs o sugerir mejoras.

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🙌 Autor

Desarrollado con ❤️ por [Albert Castro - BeruzDev](https://github.com/BeruzDev)
