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
   * Progress Bar Percentuals
   */
  var percentual = function(voto) {
    if(voto === "I" || voto === "30L") {
      voto = 30;
    }
    return parseFloat(voto-17) / 13.0 * 100;
  };

  var fillTables = function(db) {
    var status;
    if(db.voto === "I") {
      status = "secondary";
    } else if (db.voto >= 18 && db.voto <= 22) {
      status = "alert";
    } else if (db.voto > 22 && db.voto <= 25) {
      status = "warning";
    } else if ((db.voto > 25 && db.voto <= 30) || db.voto === "30L") {
      status = "success";
    }

    var tables = "<dd>";
        tables +=   "<a href='#materia"+db.id+"'>";
        tables +=     "<p class='materiaListone text-center' id='"+db.id+"'>"+db.nome+"</p>";
        tables +=   "</a>";
        tables +=   "<div id='materia"+db.id+"' class='content'>";
        tables +=     "<div class='progress "+status+"'>";
        tables +=       "<span class='meter' style='width: "+percentual(db.voto)+"%'></span>";
        tables +=     "</div>";
        tables +=     "<div class='row'>";
        tables +=       "<div class='small-4 large-4 columns'>";
        tables +=         "<label>CFU";
        tables +=           "<p class='contenutoCFU'>"+db.cfu+"</p>";
        tables +=         "</label>";
        tables +=       "</div>";
        if(db.giorno && db.mese && db.anno) {
          tables +=       "<div class='small-4 large-4 columns'>";
          tables +=         "<label class='text-center'>DATA";
          tables +=           "<p class='text-center contenutoDATA'>"+db.giorno+"-"+db.mese+"-"+db.anno+"</p>";
          tables +=         "</label>";
          tables +=       "</div>";
        }
        tables +=       "<div class='small-4 large-4 columns'>";
        tables +=         "<label class='text-center'>VOTO";
        tables +=           "<p class='contenutoVOTO text-center'>"+db.voto+"</p>";
        tables +=         "</label>";
        tables +=       "</div>";
        tables +=     "</div>";
        tables +=     "<div class='row'>";
        tables +=       "<div class='small-12 small-centered large-4 large-offset-4 large-centered columns'>";
        tables +=           "<ul class='button-group'>";
        tables +=             "<li><a class='editMateria button small-tiny large-small' id='"+db.id+"' href='#'>Modifica</a></li>";
        tables +=             "<li><a class='editMateria button alert small-only-tiny large-small' id='"+db.id+"' href='#'>Cancella</a></li>";
        tables +=           "</ul>";
        tables +=       "</div>";
        tables +=     "</div>";
        tables +=   "</dd>";

        return tables;
  };

  /**
   * Funzione per mostrare i dati del localStorage
   */
  var showData = function () {
    var i, listone, corpoListone;
    //Se non esiste lo creo
    checkData();
    //Prendo i dati
    var DB = JSON.parse(window.localStorage.getItem("MaterieDB"));
    if(DB.length > 0) {
      listone = Foundation.utils.S("#listone");
      //Pulisco tutto
      listone.html("");
      //Creo la tabella
      listone.append("<dl class='accordion' id='corpoListone' data-accordion='materiozze'>");
      corpoListone = Foundation.utils.S("#corpoListone");
      for(i=0; i < DB.length; i++) {
        corpoListone.append(fillTables(DB[i]));
      }
      corpoListone.append("</dl></div>");
    }
    Foundation.utils.S("dd > a").off("click");
    Foundation.utils.S("dd > a").on("click", function() {
      Foundation.utils.S(this).next().toggleClass("active");
      return false;
    });
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

    if(dati.cfu.length > 0 && dati.nome.length > 0 && dati.voto.length > 0) {
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
    }
  };

  return {
    showData: showData,
    saveMateria: saveMateria
  };
}(window, $, Foundation));
