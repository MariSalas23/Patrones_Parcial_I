**Nombres:** Juliana Katherin Moreno Carvajal y Mariana Salas Gutiérrez

# Parcial I: Patrones Arquitectónicos Avanzados

## 1. Descripción

Este proyecto implementa una aplicación de gestión de pedidos desplegada sobre Kubernetes utilizando principios de arquitectura cloud-native y GitOps. La solución incluye un frontend, un backend y una base de datos PostgreSQL, gestionados mediante Helm Charts y desplegados automáticamente con ArgoCD. La arquitectura permite mantener entornos separados de desarrollo y producción, facilitando la automatización de despliegues, escalabilidad y consistencia entre ambientes.

El objetivo del proyecto es demostrar el uso de herramientas modernas de contenedorización, orquestación y despliegue continuo, permitiendo administrar la infraestructura y las aplicaciones declarativamente desde un repositorio Git.

## 2. Instalación

### 2.1. Comandos

Para lograr abrir la aplicación, se deben ingresar los siguientes comandos:

```Powershell
# Iniciar Minikube
minikube start

# Usar Docker de Minikube
& minikube -p minikube docker-env --shell powershell | Invoke-Expression

# Construir backend
cd backend
mvn clean package -DskipTests
cd ..
docker build -t pedido-backend:1.0 ./backend

# Construir frontend
docker build -t pedido-frontend:1.0 ./frontend

# Cargar imágenes en Minikube
minikube image load pedido-backend:1.0
minikube image load pedido-frontend:1.0

# Habilitar ingress
minikube addons enable ingress

# Construir dependencias del chart
cd charts/pedido-app
helm dependency build

# Instalar la aplicación con Helm
helm install pedido .

# Verificar pods
kubectl get pods

# Abrir acceso externo (dejar corriendo)
minikube tunnel

# Obtener URL del ingress (en otra consola y dejar corriendo)
minikube service ingress-nginx-controller -n ingress-nginx --url
```

### 2.2. Video de funcionamiento de aplicación

[Click aquí para visualizar]()

## 3. Funcionamiento

### 3.1. Cómo instalar el chart manualmente con Helm 

La aplicación se despliega en Kubernetes utilizando Helm. Según [1], esta se trata de una herramienta que permite gestionar recursos de Kubernetes, ayudando a definir, instalar y actualizar aplicaciones de Kubernetes.

En este proyecto se creó un chart principal llamado *pedido-app*, el cual define todos los recursos necesarios para ejecutar la aplicación. Este chart incluye:

* Subchart de PostgreSQL utilizando el chart oficial de Bitnami.
* Deployment y Service para el backend, encargado de exponer la API de gestión de pedidos.
* Deployment y Service para el frontend, que permite a los usuarios interactuar con la aplicación.
* ConfigMap y Secret para manejar la configuración y credenciales de conexión a la base de datos.
* Ingress para exponer la aplicación externamente.
* Horizontal Pod Autoscaler (HPA) para escalar automáticamente el backend según el uso de CPU.
* PersistentVolumeClaim (PVC) para garantizar la persistencia de datos en PostgreSQL.

En general, la estructura del proyecto se organiza mediante un Helm Chart principal (pedido-app) que contiene las plantillas de Kubernetes necesarias para desplegar la aplicación. Dentro del directorio *templates/* se definen los recursos como Deployments y Services para el frontend y backend, ConfigMap y Secret para la configuración y credenciales de la base de datos, Ingress para el acceso externo, HPA para el escalamiento automático del backend y un PVC para la persistencia de datos. La carpeta *charts/* incluye el subchart oficial de PostgreSQL de Bitnami, utilizado como base de datos de la aplicación. Además, los archivos values.yaml, values-dev.yaml y values-prod.yaml permiten parametrizar el despliegue y definir configuraciones específicas para distintos entornos, facilitando la gestión y automatización del despliegue con Helm y ArgoCD.

```
charts/
└── pedido-app/
    ├── charts/
    │   └── postgresql-15.5.33.tgz
    ├── templates/
    │   ├── backend-deployment.yaml
    │   ├── backend-service.yaml
    │   ├── configmap.yaml
    │   ├── frontend-deployment.yaml
    │   ├── frontend-service.yaml
    │   ├── hpa.yaml
    │   ├── ingress.yaml
    │   ├── pvc.yaml
    │   └── secret.yaml
    ├── files/
    ├── Chart.yaml
    ├── Chart.lock
    ├── values.yaml
    ├── values-dev.yaml
    └── values-prod.yaml
```

Para instalar manualmente el chart con Helm, se deben ejecutar los siguientes comandos dentro del directorio del chart:

```Bash
cd charts/pedido-app
helm dependency build
helm install pedido .
```
El primer comando descarga e instala las dependencias definidas en el archivo *Chart.yaml*, en este caso el chart de PostgreSQL. El segundo comando instala la aplicación en el clúster de Kubernetes utilizando la configuración definida en el chart. Una vez instalado el chart, Kubernetes creará automáticamente todos los recursos definidos en las plantillas dentro de la carpeta templates, incluyendo los deployments del frontend y backend, los servicios de red, el Ingress y la base de datos.

Si todos los pods se encuentran en estado Running, la aplicación estará disponible a través del Ingress configurado en el clúster. Se puede verificar el estado con los siguientes comandos:
```Bash
kubectl get pods
kubectl get services
kubectl get ingress
```

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

## Referencias
[1] https://helm.sh/es/
