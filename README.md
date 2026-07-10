# DEVOPS-EV2-Backend
Este repositorio centraliza la lógica de negocio del proyecto mediante una arquitectura de microservicios basada en Spring Boot y persistencia en MySQL.

## Estructura
- `back-Despachos_SpringBoot/`: Microservicio encargado de la logística de despachos.
- `back-Ventas_SpringBoot/`: Microservicio encargado del flujo de ventas y transacciones.
- `docker-compose.yml`: Orquestador del stack completo apuntando a RDS y a las imágenes publicadas en ECR.

## Arquitectura y Persistencia
El stack se orquesta mediante Docker Compose y ECS/Fargate, definiendo dos componentes críticos de backend conectados a una base MySQL externa en RDS:
1. **Backend Despacho:** Expuesto en el puerto 8081.
2. **Backend Ventas:** Expuesto en el puerto 8082.

### Configuración de Entorno
El sistema requiere las siguientes variables de entorno para la conexión a la base de datos y para resolver las imágenes de despliegue:
- `AWS_REGION`: `us-east-2`
- `ACCOUNT_ID`: `271369142585`
- `DB_ENDPOINT`: Host de la base de datos (nombre del servicio en Docker).
- `DB_PORT`: 3306
- `DB_NAME`: `proyectodb`
- `DB_USERNAME`: `dbadmin`
- `DB_PASSWORD`: `admin123`

## Seguridad y Buenas Prácticas DevOps
- **Multi-stage Build:** Los Dockerfiles compilan el código con Maven/JDK y ejecutan el JAR final con un JRE ligero.
- **Usuario No-Root:** Las aplicaciones se ejecutan bajo un usuario `appuser` sin privilegios de administrador.
- **Trazabilidad:** Cada imagen subida a Amazon ECR es etiquetada con el hash del commit para auditoría.

## Automatización CI/CD
El flujo de entrega continua está definido en `.github/workflows/deploy.yml`:
1. **Build:** Compilación de ambos JARs.
2. **Push:** Envío de imágenes a **Amazon ECR**.
3. **Deploy:** Renderizado y despliegue de task definitions en **ECS Fargate**.

> **Regla de Oro:** El despliegue se dispara con push a `main` o manualmente con `workflow_dispatch`.
