//******************************************** */
//evenment mettre container et container-image et container-image2 en d-none au chargement de la page
document.addEventListener("DOMContentLoaded", (event) =>  {
    let test =  document.querySelectorAll(".Container, #container-image, #container-image2, .resultat, .Konami");
    console.log(test);
    test.forEach(element => {
        element.classList.toggle("d-none");
    });
});
//***************************************************** */



//******************************************************* */
//toogle eneleve nbjoueur et fait apparaitre blaze pour njouer a deux ou seul
//this.id va chercher l'id du boutton sur lequelle j'ai cliqué
let nbJoueurs = 0;
$(".nbJoueurs").click(function(){
        $(".container-nbJoueur").toggleClass("d-none");
        $(".Container").toggleClass("d-none");
    if(this.id == 'Contre-ordi'){
        $(".secondInput").toggleClass("d-none");
    }
    nbJoueurs = parseInt($(this).attr("name"));
});
//******************************************************** */


//******************************************************** */
// //toogle eneleve container , blaze2 et fait apparaitre container image 
// ligne 5 apeelle la valeur rentrer dans jo1 et l'insert dans blaze
document.querySelector("#Blazes").addEventListener("click", (event) => {
    document.querySelector(".Container").classList.toggle("d-none");
    document.querySelector("#Blaze2").classList.toggle("d-none");
    document.querySelector("#Blaze").textContent=document.querySelector('#jo1').value;
    document.querySelector("#container-image").classList.toggle("d-none");
});
//*********************************************************** */


//*********************************************************** */
// oblige la saisi des blaze pour activer le boutton play 
$(".jo").change(function() {
    let NbBlazes = 0;
    $(".jo").each(function() {
        if (this.value !== ""){
            NbBlazes += 1;
        }
    });
        if(NbBlazes === nbJoueurs) {
            $("#Blazes").prop('disabled',false);
        } else {
            $("#Blazes").prop('disabled',true);
        }
});
//*********************************************************** */


//********************************************************** */
// selectionne, stockes et change de joueur pour le jeu shifumi
let J1_select = "";
let J2_select = "";
//evenement clik sur l'image(pierre feuille ou ciseau)
$(".select").click(function(){
// si container image a la classe j1
    if ($("#container-image").hasClass("J1")) {
//J1_select stocke l'id de celui qui a etait cliqué pour le j1
        J1_select = this.id;
//change le nom du joueur 1 pour donner celui du joueur 2
        document.querySelector("#Blaze").textContent = document.querySelector('#jo2').value;
    } else {
////J2_select stocke l'id de celui qui a etait cliqué pour le j2
        J2_select = this.id;
        document.querySelector("#Blaze").textContent = document.querySelector('#jo1').value;
        whoWin(J1_select,J2_select);
    }
    if (nbJoueurs === 1) {
          // nomme le j2 ordi
          // calculer ce qu'a joué l'ordi et appeler WhoWin
            
            win(J1_select);
          // appel de la fonction J1_select
          // ...
            document.querySelector("#Blaze").textContent = document.querySelector('#jo1').value;
            
        } else {
            // fait passer la classe j1 en j2
                document.querySelector("#container-image").classList.toggle("J1");
        }
});
//******************************************************************** */


//******************************************************************** */
document.querySelector("#recommencer").addEventListener("click", (event) => {
    nbWinJ1 = 0;
    nbWinJ2 = 0;
    document.querySelector(".resultat").classList.toggle("d-none");
    

});
//********************************************************************* */


//***************************************************************** */
// condition pour determiner le gagnant du jeu contre l'ordi
function win(pj1Select) {
    $('#jo2').val("ordi");
    const choixOrdi = ["pierre", "feuille", "ciseaux"][Math.floor(Math.random() * 3)];
whoWin(pj1Select, choixOrdi);
}
//*********************************************************************** */



//********************************************************************** */
let nbWinJ1 = 0;
let nbWinJ2 = 0;
// Condition pour determiner le gagnant du jeu a 2 
function whoWin(joueur1,joueur2) {
    let reponse ;
    let multimanches = document.querySelector('input[name=isMultiManches]:checked').value
    if  (joueur1  === joueur2) {
        reponse = "Egalité !";
    }
    else if  ((joueur1 === "pierre" && joueur2 === "ciseaux") || (joueur1 === "feuille" && joueur2 === "pierre") || (joueur1 === "ciseaux" && joueur2 === "feuille")){        
        reponse = " The winner is ! <br/>" + document.querySelector('#jo1').value;
        nbWinJ1 ++;

    } else {
        reponse = " The winner is ! <br/>" + document.querySelector('#jo2').value;
        nbWinJ2 ++;
    }
    
    if (multimanches ) {
        document.querySelector("#j1").innerHTML = document.querySelector('#jo1').value;
        document.querySelector("#j2").innerHTML = document.querySelector('#jo2').value ;
        document.querySelector("#scoreJ1").innerHTML = nbWinJ1;
        document.querySelector("#scoreJ2").innerHTML = nbWinJ2;        
    }

    if ((!multimanches) || (nbWinJ1 === 3) || (nbWinJ2 === 3 )  ){
        document.querySelector(".resultat").classList.toggle("d-none");
    
        document.querySelector(".Resultat").innerHTML = reponse;
    }
}
//********************************************************************************** */



//***********************************************************************************$ */
//konami kode
var global = {

    konami: function() {
        let konamikeys = [38,38,40,40,37,39,37,39,66,65], 
        started = false, 
        count = 0;

        $(document).keydown(function(e){
        let reset = function() {
            started = false; 
            count = 0;
            return;
        };
        
        key = e.keyCode;
        
        // Begin watching if first key in sequence was pressed.
        if(!started){
            if(key == 38){
            started = true;
        }
        }
        
        // If we've started, pay attention to key presses, looking for right sequence.
        if (started){
            
            if (konamikeys[count] == key){
            count++;
            } else {
            // Incorrect key, restart.
            reset();
            }
            if (count == 10){
            // Success!
            nbWinJ1++;
            document.querySelector("#scoreJ1").innerHTML = nbWinJ1;
            document.querySelector(".Konami").computedStyleMap.width = "100vw";
            document.querySelector(".Konami").computedStyleMap.height = "100vh";
            reponse = document.querySelector(".Konami").classList.toggle("d-none");
            setTimeout (() => {
                document.querySelector(".Konami").classList.toggle("d-none");
            }, 5000 );
            reset();
            }
        } else {
            reset();
        }
        });
    }
    }
    
    global.konami();
//************************************************************************************* */



//*************************************************************************************** */
// Background radio boutton
$(".Radio").click(function(){
        if (this.id === "NoMulti_Manche") {
        $("#Multi_Manche").removeClass("MultiIsChecked");
        $("#NoMulti_Manche").addClass("MultiIsChecked");
        }
        else if (this.id === "Multi_Manche") {
            $("#NoMulti_Manche").removeClass("MultiIsChecked");
            $("#Multi_Manche").addClass("MultiIsChecked");
        }
});
//**************************************************************************************** */










