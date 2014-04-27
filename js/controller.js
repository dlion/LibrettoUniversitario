var Controller = (function(window,$) {
  var dbName = "materiaDB";

  /**
   * Funzione per mostrare a schermo gli alert usando i modal
   */
  var omgAlert = function (title, subtitle, msg) {
    $("#omgAlertTitle").html(title);
    $("#omgAlertSubtitle").html(subtitle);
    $("#omgAlertMsg").html(msg);
    $("#omgAlert").foundation('reveal', 'open');
  };


  return {
    checkData: function () {
      var dati = window.localStorage.getItem(dbName);
      if(dati) {
        return true;
      }
      return false;
    },

    showData: function (id) {
      var dati = JSON.parse(window.localStorage.getItem(dbName));
      var index;
      if(!id) {
        for(index in dati) {
          console.log("VEDO: "+dati[index]);
        }
      }
    }
  };
}(window, $));
