var Controller = (function(window, $, Foundation) {
  var dbMaterie = "MaterieDB",
      dbConto   = "ContoDB";

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
    var arrayStorage = window.localStorage.getItem(dbMaterie);
    if(arrayStorage === null) {
      arrayStorage = [];
      window.localStorage.setItem(dbConto, parseInt(0,10));
      window.localStorage.setItem(dbMaterie, JSON.stringify(arrayStorage));
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
    if(db !== null) {
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
          tables +=             "<li><a class='editMateria button small large-small' id='"+db.id+"m' href='#'>Modifica</a></li>";
          tables +=             "<li><a class='deleteMateria button alert small large-small' id='"+db.id+"d' href='#'>Cancella</a></li>";
          tables +=           "</ul>";
          tables +=       "</div>";
          tables +=     "</div>";
          tables +=   "</dd>";

          return tables;
    } else {
      return false;
    }
  };

  /**
   * Funzione per mostrare i dati del localStorage
   */
  var showData = function () {
    var i, listone, corpoListone;
    //Se non esiste lo creo
    checkData();
    //Prendo i dati
    var DB = JSON.parse(window.localStorage.getItem(dbMaterie));
    if(DB.length > 0) {
      listone = Foundation.utils.S("#listone");
      //Pulisco tutto
      listone.html("");
      //Creo la tabella
      listone.append("<dl class='accordion' id='corpoListone' data-accordion='materiozze'>");
      corpoListone = Foundation.utils.S("#corpoListone");
      for(i in DB) {
        corpoListone.append(fillTables(DB[i]));
      }
      corpoListone.append("</dl></div>");
    }
    Foundation.utils.S("dd > a").off("click");
    Foundation.utils.S("dd > a").on("click", function() {
      Foundation.utils.S(this).next().toggleClass("active");
      return false;
    });
    Foundation.utils.S(".deleteMateria").off("click");
    Foundation.utils.S(".deleteMateria").on("click", deleteMateria);
    Foundation.utils.S(".editMateria").off("click");
    Foundation.utils.S(".editMateria").on("click",function() {
      riempi();
      Foundation.utils.S("#editMateria").foundation('reveal', 'open');
    });
  };

  /**
   * Funzione che prende i dati dal form di inserimento e li mette nel localStorage
   */
  var saveMateria = function() {
    var tmp, conto, i;
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
    tmp = JSON.parse(window.localStorage.getItem(dbMaterie));
    conto = window.localStorage.getItem(dbConto);
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
      id: (parseInt(conto, 10)+1)
    };

    if(dati.cfu.length > 0 && dati.nome.length > 0 && dati.voto.length > 0) {
      tmp.push(dati);
      window.localStorage.setItem(dbMaterie, JSON.stringify(tmp));
      window.localStorage.setItem(dbConto, parseInt(conto, 10)+1);
      //Pulisco i campi
      for(i=0; i < form.length; i++) {
        form[i].val("");
        form[i].blur();
      }
      //Mostro i dati a schermo
      showData();
      //Tolgo il modal
      Foundation.utils.S("#addMateria").foundation('reveal', 'close');
    }
  };

  var deleteMateria = function () {
    var id = this.id, i,
        tmp = JSON.parse(window.localStorage.getItem(dbMaterie));
    for(i in tmp) {
      if(tmp[i].id+'d' == id) {
        tmp.splice(i, 1);
        break;
      }
    }
    window.localStorage.setItem(dbMaterie, JSON.stringify(tmp));
    showData();
  };

  var riempi = function () {
    var dati = JSON.parse(window.localStorage.getItem(dbMaterie)),
        id = window.document.activeElement.id,
        index;

    //Scorro l'oggetto
    for(index in dati){
      //Se trovo quello cercato
      if(dati[index].id+'m' == id) {
        //Setto i campi con i valori trovati
        Foundation.utils.S("#editMateriaCFU").val(dati[index].cfu);
        Foundation.utils.S("#editMateriaNome").val(dati[index].nome);
        Foundation.utils.S("#editMateriaDocente").val(dati[index].docente);
        Foundation.utils.S("#editMateriaVoto").val(dati[index].voto);
        Foundation.utils.S("#editMateriaGiorno").val(dati[index].giorno);
        Foundation.utils.S("#editMateriaMese").val(dati[index].mese);
        Foundation.utils.S("#editMateriaAnno").val(dati[index].anno);
        Foundation.utils.S("#editMateriaNote").val(dati[index].note);
        Foundation.utils.S(".editMateriaInvia").attr("id", dati[index].id);
        console.log("IDTROVATO");
        break;
      }
    }
    //Edita la materia
    Foundation.utils.S(".editMateriaInvia").on("click", Foundation.utils.debounce(
          function() {
            Controller.setEdit();
            Foundation.utils.S("#editMateria").foundation('reveal', 'close');
          }, 300, true));
  };

  var setEdit = function () {
    //Campi del form
    var form = [
      Foundation.utils.S("#editMateriaCFU"),
      Foundation.utils.S("#editMateriaNome"),
      Foundation.utils.S("#editMateriaDocente"),
      Foundation.utils.S("#editMateriaVoto"),
      Foundation.utils.S("#editMateriaGiorno"),
      Foundation.utils.S("#editMateriaMese"),
      Foundation.utils.S("#editMateriaAnno"),
      Foundation.utils.S("#editMateriaNote"),
      Foundation.utils.S(".editMateriaInvia")
    ];

    //Accodo gli elementi al localStorage
    var tmp = JSON.parse(window.localStorage.getItem(dbMaterie)),
        i;
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
      idForm: form[8].attr('id')
    };

    if(dati.cfu.length > 0 && dati.nome.length > 0 && dati.voto.length > 0) {
      for(i in tmp) {
        if(tmp[i].id == dati.idForm) {
          tmp[i].cfu = dati.cfu;
          tmp[i].nome = dati.nome;
          tmp[i].docente = dati.docente;
          tmp[i].voto = dati.voto;
          tmp[i].giorno = dati.giorno;
          tmp[i].mese = dati.mese;
          tmp[i].anno = dati.anno;
          tmp[i].note = dati.note;
          console.log("TROVATI E AGGIORNATI");
          console.log(tmp[i]);
          break;
        }
      }

      window.localStorage.setItem(dbMaterie, JSON.stringify(tmp));

      //Pulisco i campi
      for(i=0; i < form.length; i++) {
        form[i].val("");
        form[i].blur();
      }

      //Mostro i dati a schermo
      showData();

    }
  };

  return {
    showData: showData,
    saveMateria: saveMateria,
    deleteMateria: deleteMateria,
    riempi: riempi,
    setEdit: setEdit
  };
}(window, $, Foundation));
