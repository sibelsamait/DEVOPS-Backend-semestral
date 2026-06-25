# STAGE 1: Build
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /build

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x ./mvnw

# Descargar dependencias
RUN ./mvnw dependency:go-offline -B

COPY src src
RUN ./mvnw clean package -DskipTests

# STAGE 2: Producción (Mínimo Privilegio)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Creación de usuario no root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /build/target/*.jar app.jar
RUN chown appuser:appgroup app.jar

USER appuser

# Puerto asignado
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]