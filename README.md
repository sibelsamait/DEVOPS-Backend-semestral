# DEVOPS-EV2-Backend
Este repositorio centraliza la lógica de negocio del proyecto mediante una arquitectura de microservicios basada en Spring Boot y persistencia en MySQL.

## Estructura
- `back-Despachos_SpringBoot/`: Microservicio encargado de la logística de despachos.
- `back-Ventas_SpringBoot/`: Microservicio encargado del flujo de ventas y transacciones.
- `docker-compose.yml`: Orquestador local y de producción para el stack completo.

## Arquitectura y Persistencia
El stack se orquesta mediante Docker Compose, definiendo tres componentes críticos:
1. **Base de Datos (MySQL):** Utiliza **Named Volumes** (`db_data`) para garantizar que los datos de ventas y despachos no se pierdan al reiniciar los contenedores.
2. **Backend Despacho:** Expuesto en el puerto 8081.
3. **Backend Ventas:** Expuesto en el puerto 8082.

### Configuración de Entorno
El sistema requiere las siguientes variables de entorno para la conexión a la base de datos (inyectadas vía Docker Compose o GitHub Secrets):
- `DB_ENDPOINT`: Host de la base de datos (nombre del servicio en Docker).
- `DB_PORT`: 3306
- `DB_NAME`: proyecto_db
- `DB_USERNAME`: [Secret]
- `DB_PASSWORD`: [Secret]

## Seguridad y Buenas Prácticas DevOps
- **Multi-stage Build:** Los Dockerfiles compilan el código con Maven/JDK y ejecutan el JAR final con un JRE ligero.
- **Usuario No-Root:** Las aplicaciones se ejecutan bajo un usuario `appuser` sin privilegios de administrador.
- **Trazabilidad:** Cada imagen subida a Amazon ECR es etiquetada con el hash del commit para auditoría.

## Automatización CI/CD
El flujo de entrega continua está definido en `.github/workflows/deploy.yml`:
1. **Build:** Compilación de ambos JARs.
2. **Push:** Envío de imágenes a **Amazon ECR**.
3. **Deploy:** Actualización automática en la instancia **EC2** mediante SSH/SSM.

> **Regla de Oro:** El despliegue a producción solo ocurre tras un push a la rama `deploy`.
