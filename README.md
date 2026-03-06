**Nombres:** Juliana Katherin Moreno Carvajal y Mariana Salas Gutiérrez

# Parcial I: Patrones Arquitectónicos Avanzados

## Descripción

.

## Instalación

minikube start
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
cd backend
mvn clean package -DskipTests
cd ...
docker build -t pedido-backend:1.0 ./backend
docker build -t pedido-frontend:1.0 ./frontend
cd charts/pedido-app
helm dependency build
helm install pedido .
minikube image load pedido-backend:1.0
minikube image load pedido-frontend:1.0
minikube addons enable ingress
kubectl get pods -n ingress-nginx
kubectl get pods
minikube tunnel
minikube service ingress-nginx-controller -n ingress-nginx --url

### Cómo instalar el chart manualmente con Helm 

.

### Cómo está configurado ArgoCD para sincronizar 

.

### Endpoints de acceso (frontend y backend)

.

## Usos

.

## Tecnologías

.
