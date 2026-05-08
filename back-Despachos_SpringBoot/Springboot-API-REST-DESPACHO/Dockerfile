# Etapa 1: Build (Compilación)
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Copiamos los archivos de dependencias
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copiamos y compilamos
COPY src src
RUN ./mvnw clean package -DskipTests


# Etapa 2: Run (Ejecución)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Creación de usuario y grupo no root por seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiamos solo el JAR compilado de la etapa anterior y asignamos permisos
COPY --from=builder --chown=appuser:appgroup /app/target/*.jar app.jar

# Cambiamos al usuario no root
USER appuser

# Exponemos el puerto estándar de Spring Boot
EXPOSE 8080

# Punto de entrada limpio y optimizado
ENTRYPOINT ["java", "-jar", "app.jar"]