// const main = document.querySelector("main");
// const basicArray = [
//   { pic: 0, min: 1 },
//   { pic: 1, min: 1 },
//   { pic: 2, min: 1 },
//   { pic: 3, min: 1 },
//   { pic: 4, min: 1 },
//   { pic: 5, min: 1 },
//   { pic: 6, min: 1 },
//   { pic: 7, min: 1 },
//   { pic: 8, min: 1 },
//   { pic: 9, min: 1 },
// ];

// class Exercice{}

 // toutes les fonctions qui seront utiles au projet
// const utils ={
//     pageContent: function (title, content, btn){},
//     handleEventMinutes: function (){},
//     handleEventArrow: function (){},
//     reboot: function (){},
//     store: function (){},

// }

// const page ={
//     loby: function(){},
//     routine: function (){},
//     finish: function (){}
// }
// Le script Javascript ci-dessus comporte plusieurs éléments, décrits ci-dessous :

// 1. La première ligne de code qui déclare une constante "main" qui fait référence à l'élément HTML "main" de la page :
// ```const main = document.querySelector("main");```
// Cette ligne permet de retrouver et de stocker dans la variable "main" l'élément HTML "main" de la page, qui sera utilisé plus tard pour afficher et masquer des éléments.

// 2. La deuxième ligne de code qui déclare une constante "basicArray" qui contient un tableau d'objets :
// ```const basicArray = [ ... ];```
// Ce tableau d'objets est utilisé pour stocker des informations sur des images, avec chaque objet contenant deux propriétés : "pic" pour l'indice de l'image dans un autre tableau d'images, et "min" pour le temps minimum en secondes que l'utilisateur doit passer à regarder cette image.

// 3. Une classe "Exercice" est déclarée mais non utilisée dans ce script.

// 4. Le reste du code est constitué de deux objets :

// - L'objet "utils" qui contient plusieurs fonctions qui seront utilisées tout au long du projet pour gérer différents aspects de l'interface utilisateur, notamment pour charger du contenu HTML, ajouter des événements, réinitialiser l'application et stocker des données.

// - L'objet "page" qui contient également plusieurs fonctions pour gérer l'affichage des différentes pages de l'application, y compris la page d'accueil, la page principale d'exercice et la page de fin. Ces fonctions se basent sur le contenu HTML généré par les fonctions de l'objet "utils" pour afficher les éléments nécessaires à chaque étape du processus.

// En résumé, ce script Javascript met en place une structure d'application pour un exercice qui consiste à regarder des images pendant une certaine période de temps. Il utilise des tableaux d'objets pour stocker des données sur les images et des objets pour gérer l'interface utilisateur.



const main = document.querySelector("main");
const h1= document.querySelector("h1");
const bouton =document.querySelector(".btn-container");
// Variable qui sert à stocker tous les exercises

const exerciceArray  = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];


class Exercice{};

// toutes les fonctions qui seront utiles au projet
const utils ={
    pageContent: function (title, content, btn){
        h1.innerHTML = title;
        main.innerHTML = content;
        bouton.innerHTML = btn;
    },
    handleEventMinutes: function (){
        document.querySelectorAll(`input[type="number"]`).forEach((input) => {
            input.addEventListener("input", (e) => {
                console.log(e);
              exerciceArray.map((exo) => {
                if (exo.pic == e.target.id) {
                  exo.min = parseInt(e.target.value);
                  console.log(exerciceArray);
                }
              });
            });
          });
    },
    handleEventArrow: function (){},
    reboot: function (){},
    store: function (){},
    
};

const page = { 
    lobby: function(){
        let mapArray = exerciceArray.map(
            (exo) =>
              `
                  <li>
                      <div class = 'card-header'>
                          <input type = "number" id= ${exo.pic} min="1" max="10" value=${exo.min}>
                          <span>min</span>
                      </div>
                      <img src= "img/${exo.pic}.png">
                <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
                <i class = "fas fa-times-circle deleteBtn" data-pic = ${exo.pic}></i>
            
                  </li>
                `
          ).join("");
        utils.pageContent(
            "Paramétrage <i id = 'reboot' class = 'fas fa-undo'></i>",
            "<ul>" + mapArray + "</ul>",
            "<button id='start'>Commencer<i class='far fa-play-circle'></i></button>"
          );
    },
    routine: function (){
        utils.pageContent("Routine", "Exercice avec chrono", null)
    },
    finish: function (){
        utils.pageContent(
            "C'est terminé !",
            "<button id='start'>Recommencer</button>",
            "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fas fa-times-circle'></i></button>",
            null
          );
    }
};
page.lobby();
// page.routine();
// page.finish();


// Dans ce contexte, le "lobby" se réfère à la page d'accueil de l'application. Le nom "lobby" est souvent utilisé pour désigner la pièce ou la zone où les visiteurs attendent avant d'entrer dans une réunion, un événement ou une organisation. Dans le contexte de cette application, le "lobby" est l'endroit où l'utilisateur arrive avant de commencer à utiliser l'application. Il contient un bouton qui permet de démarrer l'application

// Ce code est constitué de deux parties principales : la première répertorie les éléments HTML et définit un tableau basique d'exercices, et la deuxième définit des fonctions utiles ainsi que des fonctions pour afficher différentes pages.

// - La première partie commence par récupérer à l'aide de la méthode querySelector() les éléments HTML main, h1 et bouton pour pouvoir les modifier plus tard. Ensuite, un tableau appelé exerciceArray est créé, il contient 10 objets qui décrivent chaque exercice (pic qui contient l'indice de l'image et min qui contient la durée en minutes de l'exercice). 
// Enfin, est créée une classe Exercice qui ne contient rien pour le moment.

// - La seconde partie contient un objet utils qui stocke différentes méthodes utiles pour l'application. La méthode pageContent permet de modifier le contenu des éléments HTML avec les arguments qui lui sont passés. handleEventMinutes et handleEventArrow sont des fonctions qui gèrent les événements de clic sur les boutons pour ajouter des minutes et naviguer entre les différents exercices. reboot permet de réinitialiser la page et store sera utilisé pour stocker ou récupérer des données dans le navigateur. 

// L'objet page (dans la deuxième partie) contient également des méthodes qui affichent différentes pages. La méthode lobby affiche la page pour paramétrer les exercices : la fonction map() est utilisée pour créer une liste (constituée d'éléments li) d'exercices à partir du tableau des exercices basiques, chaque élément de la liste contient un champ pour la durée et des icônes pour la fonctionnalité de suppression et de navigation. La méthode routine affiche simplement la page pour la routine d'exercice (qui n'est pas encore implémentée). Enfin, la méthode finish affiche une page qui indique la fin de la routine avec un bouton pour recommencer et un autre bouton pour réinitialiser les paramètres.

// Enfin, la dernière ligne du script appelle la méthode lobby pour afficher la page de paramétrage des exercices.