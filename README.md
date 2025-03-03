# Projet SI

## **Description**
Ce projet utilise le framework **NestJS** pour implémenter une API backend capable de :
- Gérer des questions (CRUD).
- Gérer des quizs (CRUD).
- Interconnecter les modules pour fournir des fonctionnalités avancées.
- ..

## **Structure du projet**
- **Questions Module** : Gère les opérations CRUD sur les questions.
- **Quizs Module** : Gère les opérations CRUD sur les quizs et récupère leurs questions.
- .. 

## **Installations nécessaires**

Commencer par installer [NodeJS], une plateforme qui permet d'exécuter du JavaScript côté serveur. On l'installe directement depuis le site. (https://nodejs.org/en/download/prebuilt-installer)

### **Pourquoi NodeJS ?**
NestJS est un framework pour Node.js qui utilise TypeScript, idéal pour construire des applications backend rapides, organisées et faciles à maintenir grâce à sa structure modulaire et ses bonnes pratiques intégrées.

### **Installation de NestJS**

Installer la CLI de NestJS : 

``` bash
npm i -g @nestjs/cli
```



On installe également [PostMan] aussi depuis le site.  (https://www.postman.com/) 
C'est un outil pour tester les API backend, en envoyant des requêtes HTTP et en visualisant les réponses.


# **Lancement du serveur**

Le node module est propore à chacun, il ne peut pas être mis sur Git, donc ne pas oublier de faire 
``` bash
npm install
```
avant de run le backend : 
``` bash
npm run start
```
Avec la commande , Nest recompilera et relancera le serveur à chaque modification : 
``` bash
npm run start:dev
```

Le serveur sera accessible par défaut à l'adresse  :  **http://localhost:3000/**
 

On peut tester avec une requête HTTP GET :
![Sur PostMan](assets/TestLancementServeur.png)

Tout fonctionne bien, on a un code 200 et une réponse : Hello World ! 


## **Étapes du projet**

1. Implémentation des différents Endpoints
2. 
3. 


## **1. Implémentation des différents end points**
### **Modules**
Nous commençons par créer les **modules**, un par un. 


Les modules dans NestJS servent à organiser le code en regroupant les fonctionnalités liées à une même responsabilité métier.

La commande pour créer un module est : 
``` bash
nest g module <nom-du-module>
```

Par exemple pour créer un module media : 
``` bash
nest g module medias
```
### **Contrôleurs**
Un contrôleur dans NestJS gère les requêtes HTTP et lie les routes aux méthodes de traitement définies dans le backend.


La commande pour créer un contrôleur est : 
``` bash
nest g controller <nom-du-module>
```

Par exemple pour créer un module media : 
``` bash
nest g controller medias
```

### **Endpoints**
Un endpoint est une URL qui permet à un client d'accéder aux ressources du serveur, définie à l'aide de décorateurs comme @Get(), @Post(), ..

Dans nos controllers, on a ajouté des endpoints pour faire les différentes opérations CRUD. 


