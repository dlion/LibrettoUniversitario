//Route
var Route = (function($, Controller) {
  var bindAction =  function () {
    $("#aggiungiMateria").on("click", function() {
      $("#addMateria").foundation('reveal', 'open');
    });
    //$("#statistiche").on("click", showStatistiche);
    //$("#aboutMe").on("click", showAboutMe);
  };

  return {
    /**
     * Controllo iniziale
     */
    init: function () {
      if(Controller.checkData()) {
        Controller.showData();
      }
      else {
        console.log("NESSUN DORMA");
      }
      bindAction();
    }
  };
}($, Controller));
