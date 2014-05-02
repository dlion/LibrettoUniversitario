//Route
var Route = (function($, Controller, Foundation) {
  var bindAction =  function () {
    Foundation.utils.S("#aggiungiMateria").on("click", Foundation.utils.throttle(function() {
      Foundation.utils.S("#addMateria").foundation('reveal', 'open');
    }, 300));

    Foundation.utils.S("#addMateriaInvia").on("click", Foundation.utils.debounce(Controller.saveMateria, 300, true));
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
