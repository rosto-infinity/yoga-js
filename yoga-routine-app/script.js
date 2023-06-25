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



let main = document.querySelector("main");
let h1= document.querySelector("h1");

let bouton =document.querySelector(".btn-container");
// Variable qui sert à stocker tous les exercises
let basicArray  = [
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
let exerciceArray  = [];

//Get stored exercices array
(() => {
  if(localStorage.exercices){
    exerciceArray =JSON.parse(localStorage.exercices);
  }else{
    exerciceArray = basicArray;
  }
})();
//---------------------------------------------
class Exercice {
  constructor(){
    this.index = 0;
    this.minutes = exerciceArray[this.index].min;
    this.seconds = 0;
  }
  updateCountdown() {
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

    // compte à rebours
    setTimeout(() => {
      if (this.minutes === 0 && this.seconds === "00") {
        this.ring();
        this.index++;
        // 'if' ça continue, car on a encore des photos à faire passer
        if (this.index < exerciceArray.length) {
          this.minutes = exerciceArray[this.index].min;
          this.seconds = 0;
          this.updateCountdown(); // récursive
        } else {
          return page.finish(); // quand c'est terminé
        }
      } else if (this.seconds === "00") {
        this.minutes--;
        this.seconds = 59;
        this.updateCountdown(); // récursive
      } else {
        this.seconds--;
        this.updateCountdown(); // récursive
      }
    }, 1000);

    console.log(this.seconds);

   return ( main.innerHTML = `
        <div class = "exercice-container">
            <p>${this.minutes}:${this.seconds}</p>
            <img src = "img/${exerciceArray[this.index].pic}.png">
            <div>${this.index + 1}/${exerciceArray.length}</div>
        </div>
        `);
  }
// on instancie un objet natif Audio() qu'on appel audio, et on donne une source à cet audio
ring() {
  const audio = new Audio();
  audio.src = "ring.mp3";
  audio.play();
}
};
//---------------------------------------------
// methode DRY
// toutes les fonctions qui seront utiles au projet
const utils ={
  // sous-entend en paramètre h1, main, btn-container)
  // utils.pageContent(paramétrage) , sur la page routine je te passe le titre routine, et finish le titre: c'est terminé
    pageContent: function (title, content, btn){
        h1.innerHTML = title;
        main.innerHTML = content;
        bouton.innerHTML = btn;
    },
     // on se récupère l'évènement à l'input
  // on pointe tous les inputs de type number de la page (10), on dit pour chacun d'eux, je te fais un évènement
  // parseInt() transforme string to number
    handleEventMinutes: function (){
        document.querySelectorAll(`input[type="number"]`).forEach((input) => {
            input.addEventListener("input", (e) => {
              exerciceArray.map((exo) => {
                 if (exo.pic == e.target.id) {
                  exo.min = parseInt(e.target.value);
                  // console.log(exerciceArray);
                  this.store();  // il faut se stocker le changement de minutes
                }
              });
            });
          });
    },
    handleEventArrow: function (){
      document.querySelectorAll(".arrow").forEach((arrow)=>{
        arrow.addEventListener("click", (e)=>{
          let position =0;
          exerciceArray.map((exo)=>{
            if(exo.pic == e.target.dataset.pic && position != 0){
              [exerciceArray[position],exerciceArray[position -1]]=[exerciceArray[position -1],exerciceArray[position],]
              // au clique un nouveau map est fait
              page.lobby();
              this.store();
            }else{
              position++;
            }
          });
        });
      });
    },
    deleteItem:function () {
      document.querySelectorAll(".deleteBtn")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let newArray = [];
          exerciceArray.map((exo) => {
             if (exo.pic != e.target.dataset.pic) {
                newArray.push(exo);
              }
            });
            exerciceArray = newArray
            page.lobby();
            this.store();
        });
      });
    },
    reboot: function (){
       // si jamais on te reboot, tu réccupéres basicArray
      exerciceArray = basicArray;
       // actualiser le map, remettre les éléments
      page.lobby();
      // quand on fait un reboot, on veut restocker le nouveau tableau. 'this' car on est dans l'objet utils
      this.store();
    },
    store: function (){
      // exercises est crée dans le navigateur de l'utilisateur pour stocker les choses
      localStorage.exercices = JSON.stringify(exerciceArray);
    },
    
};
//---------------------------------------------
const page = { 
    lobby: function(){
        let mapArray = exerciceArray.map(
            (exo) =>
              `  <li>
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
          utils.handleEventMinutes();
          utils.handleEventArrow();
          utils.deleteItem();
          reboot.addEventListener("click", ()=> utils.reboot());
          start.addEventListener("click", ()=> this.routine());
    },
    
    routine: function (){
      const exercice = new Exercice();
   // utils.pageContent("Routine", "Exercise avec chrono", null);
      utils.pageContent("Routine", exercice.updateCountdown(), null);
    },

    finish: function (){
        utils.pageContent(
            "C'est terminé !",
            "<button id='start'>Recommencer</button>",
            `<button id='reboot' class='btn-reboot'>
            Réinitialiser <i class='fas fa-times-circle'></i></button>`,
            null
          );
          // quand on appuie sur start, on relance la routine  reboot - on repart à zéro
    start.addEventListener("click", () => this.routine());
    reboot.addEventListener("click", () => utils.reboot());
    }
};
page.lobby();
// // page.routine();
// // page.finish();






// Voici quelques suggestions d'optimisation pour ce code :

// 1. Éviter la répétition de code en créant une fonction pour mettre à jour l'affichage de la minuterie et la page .

// 2. Utiliser la méthode `addEventListener` pour ajouter des événements aux boutons plutôt que d'utiliser des attributs `onclick`.

// 3. Utiliser des constantes plutôt que des variables pour les sélecteurs d'éléments HTML qui ne changeront pas pendant l'exécution de l'application.

// 4. Utiliser la méthode `forEach` pour itérer sur les éléments d'un tableau plutôt que d'utiliser une boucle `for`.

// 5. Passer des objets en paramètre plutôt que des valeurs dans la fonction `utils.pageContent()` pour éviter la répétition de code.

// Voici le code optimisé :

// ```
// const main = document.querySelector("main");
// const h1 = document.querySelector("h1");
// const bouton = document.querySelector(".btn-container");
// const rebootBtn = document.querySelector("#reboot");
// const startBtn = document.querySelector("#start");

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

// let exerciceArray = JSON.parse(localStorage.getItem("exercices")) || basicArray;

// class Exercice {
//   constructor() {
//     this.index = 0;
//     this.minutes = exerciceArray[this.index].min;
//     this.seconds = 0;
//   }

//   updateCountdown() {
//     this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

//     setTimeout(() => {
//       if (this.minutes === 0 && this.seconds === "00") {
//         this.ring();
//         this.index++;

//         if (this.index < exerciceArray.length) {
//           this.minutes = exerciceArray[this.index].min;
//           this.seconds = 0;
//           this.updateCountdown();
//         } else {
//           return page.finish();
//         }
//       } else if (this.seconds === "00") {
//         this.minutes--;
//         this.seconds = 59;
//         this.updateCountdown();
//       } else {
//         this.seconds--;
//         this.updateCountdown();
//       }
//       const countdownContainer = document.querySelector(".exercice-container");
//       countdownContainer.innerHTML = `
//           <p>${this.minutes}:${this.seconds}</p>
//           <img src="img/${exerciceArray[this.index].pic}.png">
//           <div>${this.index + 1}/${exerciceArray.length}</div>
//           `;
//     }, 1000);
//   }

//   ring() {
//     const audio = new Audio();
//     audio.src = "ring.mp3";
//     audio.play();
//   }
// }

// const utils = {
//   pageContent: function ({ title, content, button }) {
//     h1.innerHTML = title;
//     main.innerHTML = content;
//     bouton.innerHTML = button || "";
//   },

//   handleEventMinutes: function () {
//     document.querySelectorAll(`input[type="number"]`).forEach((input) => {
//       input.addEventListener("input", (e) => {
//         exerciceArray.map((exo) => {
//           if (exo.pic == e.target.id) {
//             exo.min = parseInt(e.target.value);
//             this.store();
//           }
//         });
//       });
//     });
//   },

//   handleEventArrow: function () {
//     document.querySelectorAll(".arrow").forEach((arrow) => {
//       arrow.addEventListener("click", (e) => {
//         const position = exerciceArray.findIndex(
//           (exo) => exo.pic == e.target.dataset.pic
//         );
//         if (position > 0) {
//           [exerciceArray[position], exerciceArray[position - 1]] = [
//             exerciceArray[position - 1],
//             exerciceArray[position],
//           ];
//           page.lobby();
//           this.store();
//         }
//       });
//     });
//   },

//   deleteItem: function () {
//     document.querySelectorAll(".deleteBtn").forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         exerciceArray = exerciceArray.filter(
//           (exo) => exo.pic != e.target.dataset.pic
//         );
//         page.lobby();
//         this.store();
//       });
//     });
//   },

//   reboot: function () {
//     exerciceArray = basicArray;
//     page.lobby();
//     this.store();
//   },

//   store: function () {
//     localStorage.setItem("exercices", JSON.stringify(exerciceArray));
//   },
// };

// const page = {
//   lobby: function () {
//     const mapArray = exerciceArray
//       .map(
//         (exo) => `
//             <li>
//               <div class="card-header">
//                 <input type="number" id="${exo.pic}" min="1" max="10" value="${
//           exo.min
//         }">
//                 <span>min</span>
//               </div>
//               <img src="img/${exo.pic}.png">
//               <i class="fas fa-arrow-alt-circle-left arrow" data-pic="${
//                 exo.pic
//               }"></i>
//               <i class="fas fa-times-circle deleteBtn" data-pic="${
//                 exo.pic
//               }"></i>
//             </li>
//           `
//       )
//       .join("");

//     utils.pageContent({
//       title: `Paramétrage<i id="reboot" class="fas fa-undo"></i>`,
//       content: `<ul>${mapArray}</ul>`,
//       button: '<button id="start">Commencer<i class="far fa-play-circle"></i></button>',
//     });

//     utils.handleEventMinutes();
//     utils.handleEventArrow();
//     utils.deleteItem();

//     rebootBtn.addEventListener("click", () => utils.reboot());
//     startBtn.addEventListener("click", () => this.routine());
//   },

//   routine: function () {
//     const exercice = new Exercice();
//     utils.pageContent({
//       title: "Routine",
//       content: `<div class="exercice-container"></div>`,
//     });
//     exercice.updateCountdown();
//   },

//   finish: function () {
//     utils.pageContent({
//       title: `C'est terminé !`,
//       content: '<button id="start">Recommencer</button>',
//       button: `
//           <button id="reboot" class="btn-reboot">
//             Réinitialiser<i class="fas fa-times-circle"></i>
//           </button>
//         `,
//     });
//     startBtn.addEventListener("click", () => this.routine());
//     rebootBtn.addEventListener("click", () => utils.reboot());
//   },
// };

// page.lobby();
