//Route
var Route = (function($, Controller, Foundation) {
  var bindAction =  function () {
    //Modal per Aggiungere una materia
    Foundation.utils.S("#aggiungiMateria").on("click", Foundation.utils.throttle(
        function() {
          Foundation.utils.S("#addMateria").foundation('reveal', 'open');
        }, 300));

    //Aggiunge la materia
    Foundation.utils.S("#addMateriaInvia").on("click", Foundation.utils.debounce(
        Controller.saveMateria, 300, true));
    //Cancella una materia
    Foundation.utils.S(".deleteMateria").on("click", Foundation.utils.debounce(
        Controller.deleteMateria, 300, true));

    //Modal per editare una materia
    Foundation.utils.S(".editMateria").on("click", Foundation.utils.throttle(
        function() {
          Foundation.utils.S("#editMateria").foundation('reveal', 'open');
          Controller.riempi();
        }, 300));

    // Informazioni
    Foundation.utils.S("#informazioni").on("click", Foundation.utils.throttle(
      function() {
        Foundation.utils.S("#aboutMe").foundation('reveal', 'open');
      }, 300));

    // Statistiche
    Foundation.utils.S("#statistiche").on("click", Foundation.utils.throttle(
      function() {
        Foundation.utils.S("#stats").foundation('reveal', 'open');
        Controller.faiStats();
      }, 400));

      //Click sui vari link
      Foundation.utils.S("#linkEmail").on("click", function() {
        new MozActivity({
          name: "email",
          data: {
            type: "mail",
            url:  "mailto:domenicoleoneluciani@gmail.com"
          }
        });
      });

      Foundation.utils.S("#linkSito").on("click", function() {
        new MozActivity({
          name: "viewSite",
          data: {
            type: "url",
            url: "http://dlion.it",
            name: "Domenico Luciani | DLion ~ Blog",
            icon: "http://dlion.it/favicon.ico"
          }
        });
      });

      Foundation.utils.S("#linkTwitter").on("click", function() {
        new MozActivity({
          name: "viewTwitter",
          data: {
            type: "url",
            url: "http://twitter.com/dlion92",
            name: "Twitter",
            icon: "http://twitter.com/favicon.ico"
          }
        });
      });

      Foundation.utils.S("#linkGithub").on("click", function() {
        new MozActivity({
          name: "viewGithub",
          data: {
            type: "url",
            url: "http://github.com/DLion",
            name: "Github",
            icon: "http://github.com/favicon.ico"
          }
        });
      });

      Foundation.utils.S("#linkEmail").on("click", function() {
        new MozActivity({
          name: "viewEmail",
          data: {
            type: "url",
            url: "mailto:domenicoleoneluciani@gmail.com",
            name: "Email"
          }
        });
      });

  };

  return {
    /**
     * Controllo iniziale
     */
    init: function () {
      Controller.showData();
      bindAction();
    }
  };
}($, Controller, Foundation));
