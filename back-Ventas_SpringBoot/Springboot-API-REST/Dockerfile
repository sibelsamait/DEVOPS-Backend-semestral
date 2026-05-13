# ==========================================
# STAGE 1: Construcción (Build Seguro con Maven Nativo)
# ==========================================
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder

WORKDIR /build

# Copiar el archivo de dependencias
COPY pom.xml .

# Descargar las dependencias en una capa en caché para acelerar futuros builds
RUN mvn dependency:go-offline -B

# Copiar el código fuente real
COPY src ./src

# Compilar el binario omitiendo pruebas para despliegue ágil en CI/CD
RUN mvn clean package -DskipTests

# ==========================================
# STAGE 2: Producción (Run Ligero - Mínimo Privilegio)
# ==========================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Crear usuario y grupo del sistema para cumplir con la pauta de Usuario No Root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiar el JAR compilado desde el Stage 1
COPY --from=builder /build/target/*.jar app.jar

# Ajustar permisos al usuario seguro
RUN chown appuser:appgroup app.jar

# Cambiar al usuario sin privilegios
USER appuser

# Exponer el puerto interno del contenedor (Spring Boot por defecto usa 8080)
EXPOSE 8080

# Punto de entrada de la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]