var Controller = (function(window, $, Foundation) {
  /**
   * Funzione per mostrare a schermo gli alert usando i modal
   */
  var omgAlert = function (title, subtitle, msg) {
    Foundation.utils.S("#omgAlertTitle").html(title);
    Foundation.utils.S("#omgAlertSubtitle").html(subtitle);
    Foundation.utils.S("#omgAlertMsg").html(msg);
    Foundation.utils.S("#omgAlert").foundation('reveal', 'open');
  };

  /**
   * Funzione per creare - se non esiste- l'array del localStorage
   */
  var checkData = function () {
    var arrayStorage = window.localStorage.getItem("MaterieDB");
    if(arrayStorage === null) {
      arrayStorage = [];
      window.localStorage.setItem("MaterieDB", JSON.stringify(arrayStorage));
    }
  };

  /**
   * Funzione per mostrare i dati del localStorage
   */
  var showData = function () {
    var i;
    //Se non esiste lo creo
    checkData();
    //Prendo i dati
    var DB = JSON.parse(window.localStorage.getItem("MaterieDB"));
    if(DB.length > 0) {
      var listone = Foundation.utils.S("#listone");
      //Pulisco tutto
      listone.html("");
      //Creo la tabella
      listone.append("<dl class='accordion' id='corpoListone' data-accordion='materiozze'>");
      var corpoListone = Foundation.utils.S("#corpoListone");
      for(i=0; i < DB.length; i++) {
        corpoListone.append("<dd><a href='#materia"+DB[i].id+"'><p class='materiaListone text-center' id='"+DB[i].id+"'>"+DB[i].nome+"</p></a><div id='materia"+DB[i].id+"' class='content'><p>Questo è un gran bel contenuto</p></div></dd>");
      }
      corpoListone.append("</dl></div>");
    }
  };

  /**
   * Funzione che prende i dati dal form di inserimento e li mette nel localStorage
   */
  var saveMateria = function() {
    var tmp, i;
    //Campi del form
    var form = [
      Foundation.utils.S("#addMateriaCFU"),
      Foundation.utils.S("#addMateriaNome"),
      Foundation.utils.S("#addMateriaDocente"),
      Foundation.utils.S("#addMateriaVoto"),
      Foundation.utils.S("#addMateriaGiorno"),
      Foundation.utils.S("#addMateriaMese"),
      Foundation.utils.S("#addMateriaAnno"),
      Foundation.utils.S("#addMateriaNote")
    ];

    //Se non ci sono dati creo l'array
    checkData();
    //Accodo gli elementi al localStorage
    tmp = JSON.parse(window.localStorage.getItem("MaterieDB"));
    //Oggetto da aggiungere al localStorage
    var dati = {
      cfu: form[0].val(),
      nome: form[1].val(),
      docente: form[2].val(),
      voto: form[3].val(),
      giorno: form[4].val(),
      mese: form[5].val(),
      anno: form[6].val(),
      note: form[7].val(),
      id: (tmp.length)+1
    };

    tmp.push(dati);
    window.localStorage.setItem("MaterieDB", JSON.stringify(tmp));

    //Pulisco i campi
    for(i=0; i < form.length; i++) {
      form[i].val("");
    }

    //Mostro i dati a schermo
    showData();

    //Tolgo il modal
    Foundation.utils.S("#addMateria").foundation('reveal', 'close');
  };

  return {
    showData: showData,
    saveMateria: saveMateria
  };
}(window, $, Foundation));
