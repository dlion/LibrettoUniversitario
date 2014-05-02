//Route
var Route = (function($, Controller, Foundation) {
  var bindAction =  function () {
    Foundation.utils.S("#aggiungiMateria").on("click", function() {
      Foundation.utils.S("#addMateria").foundation('reveal', 'open');
    });

    Foundation.utils.S("#addMateriaInvia").on("click", Controller.saveMateria);
    //Foundation.utils.S("#statistiche").on("click", showStatistiche);
    //Foundation.utils.S("#aboutMe").on("click", showAboutMe);
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
