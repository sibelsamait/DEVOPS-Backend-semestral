# Etapa de construcción (Builder)
FROM eclipse-temurin:17-jdk-alpine as builder
WORKDIR /build
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Etapa final de ejecución
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Crear un usuario y grupo no-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copiar el JAR desde la etapa de construcción
COPY --from=builder /build/target/*.jar app.jar

# Exponer el puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]