# Multi-architecture Dockerfile for BffMini
# Supports: linux/amd64 (x64), linux/arm64 (Raspberry Pi 5)

# Build stage
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
ARG TARGETARCH
WORKDIR /src

# Copy project file and restore dependencies
COPY BffMini.csproj .
RUN dotnet restore -a $TARGETARCH

# Copy source code and build
COPY . .
RUN dotnet publish -a $TARGETARCH --no-restore -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS runtime
WORKDIR /app

# Create data directory
RUN mkdir -p /app/data /app/logs && \
    chmod 755 /app/data /app/logs

# Copy published application
COPY --from=build /app/publish .

# Create non-root user for security
RUN useradd -m bffmini && \
    chown -R bffmini:bffmini /app
USER bffmini

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Set environment
ENV ASPNETCORE_URLS=http://+:8080 \
    DOTNET_RUNNING_IN_CONTAINER=true \
    ASPNETCORE_ENVIRONMENT=Production

# Run application
ENTRYPOINT ["dotnet", "BffMini.dll"]
