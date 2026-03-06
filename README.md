**Nombres:** Juliana Katherin Moreno Carvajal y Mariana Salas Gutiérrez

# Parcial I: Patrones Arquitectónicos Avanzados

## 1. Descripción

Este proyecto implementa una aplicación de gestión de pedidos desplegada sobre Kubernetes utilizando principios de arquitectura cloud-native y GitOps. La solución incluye un frontend, un backend y una base de datos PostgreSQL, gestionados mediante Helm Charts y desplegados automáticamente con ArgoCD. La arquitectura permite mantener entornos separados de desarrollo y producción, facilitando la automatización de despliegues, escalabilidad y consistencia entre ambientes.

El objetivo del proyecto es demostrar el uso de herramientas modernas de contenedorización, orquestación y despliegue continuo, permitiendo administrar la infraestructura y las aplicaciones declarativamente desde un repositorio Git.

## 2. Instalación

Para lograr abrir la aplicación, se deben ingresar los siguientes comandos:

```Powershell
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
```

### 2.1. Video de funcionamiento de aplicación

## 3. Funcionamiento

### 3.1. Cómo instalar el chart manualmente con Helm 

.

### 3.2. Cómo está configurado ArgoCD para sincronizar 

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get pods -n argocd
kubectl apply -f environments/dev/application.yaml
kubectl apply -f environments/prod/application.yaml
kubectl get pods -n pedido-dev
kubectl get pods -n pedido-prod
kubectl port-forward svc/argocd-server -n argocd 8080:443
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 --decode (bash)
kubectl delete ingress pedido-ingress -n default

### 3.3. Video de funcionamiento de ArgoCD

[Click aquí para visualizar](https://www.canva.com/design/DAHDIz7-v7M/d2fLPu04_cwl9rUhzCPkOA/watch?utm_content=DAHDIz7-v7M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=haadd778041)

### 3.4. Endpoints de acceso (frontend y backend)

.

### 3.5. Video de funcionamiento general

[Click aquí para visualizar](https://youtu.be/Itug-d1ShLg)
