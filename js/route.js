//Route
var Route = (function($, Controller) {
  var bindAction =  function () {
    $("#aggiungiMateria").on("click", function() {
      $("#addMateria").foundation('reveal', 'open');
    });

    $("#addMateriaInvia").on("click", Controller.saveMateria);
    //$("#statistiche").on("click", showStatistiche);
    //$("#aboutMe").on("click", showAboutMe);
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
}($, Controller));
