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
Presionar sync

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
