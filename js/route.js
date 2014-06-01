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
