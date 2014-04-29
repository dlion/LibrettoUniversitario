var Controller = (function(window,$) {
  /**
   * Funzione per mostrare a schermo gli alert usando i modal
   */
  var omgAlert = function (title, subtitle, msg) {
    $("#omgAlertTitle").html(title);
    $("#omgAlertSubtitle").html(subtitle);
    $("#omgAlertMsg").html(msg);
    $("#omgAlert").foundation('reveal', 'open');
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
    var i, index;
    //Se non esiste lo creo
    checkData();
    //Prendo i dati
    var DB = JSON.parse(window.localStorage.getItem("MaterieDB"));
    if(DB.length > 0) {
      console.log("ORA GUARDO LE MEMBRA");
      for(i=0; i < DB.length; i++) {
        for(index in DB[i]) {
          console.log("VEDO: "+DB[i][index]);
        }
      }
    }
    else {
      console.log("NESSUN DORMA");
    }
  };

  /**
   * Funzione che prende i dati dal form di inserimento e li mette nel localStorage
   */
  var saveMateria = function() {
    var tmp, i;
    //Campi del form
    var form = [
      $("#addMateriaCFU"),
      $("#addMateriaNome"),
      $("#addMateriaDocente"),
      $("#addMateriaVoto"),
      $("#addMateriaGiorno"),
      $("#addMateriaMese"),
      $("#addMateriaAnno"),
      $("#addMateriaNote")
    ];
    //Oggetto da aggiungere al localStorage
    var dati = {
      cfu: form[0].val(),
      nome: form[1].val(),
      docente: form[2].val(),
      voto: form[3].val(),
      giorno: form[4].val(),
      mese: form[5].val(),
      anno: form[6].val(),
      note: form[7].val()
    };

    //Se non ci sono dati creo l'array
    checkData();
    //Accodo gli elementi al localStorage
    tmp = JSON.parse(window.localStorage.getItem("MaterieDB"));
    tmp.push(dati);
    window.localStorage.setItem("MaterieDB", JSON.stringify(tmp));

    //Pulisco i campi
    for(i=0; i < form.length; i++) {
      form[i].val("");
    }

    //Mostro i dati a schermo
    showData();

    //Tolgo il modal
    $("#addMateria").foundation('reveal', 'close');
  };

  return {
    showData: showData,
    saveMateria: saveMateria
  };
}(window, $));
