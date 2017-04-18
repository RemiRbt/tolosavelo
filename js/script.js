// Permet de supprimer les chiffres d'identifications devant le nom d'une station passée en paramètre
function renameStation(string) {
    var temp = "";
    // Si le nom de la station commence par "0", on supprimer les 8 premiers caractères (Voir données api JCdecaux)
    if (string.charAt(0) == 0) {
        temp = string.substr(8);
        // Sinon on supprimer les 6 premiers (Voir données api JCdecaux)
    } else {
        temp = string.substr(6);
    }
    return temp;
}

$(document).on("deviceready", function () {

    //Fonction plugin GPS

    console.log("done device ready");

    cordova.plugins.locationAccuracy.canRequest(function (canRequest) {
        if (canRequest) {
            cordova.plugins.locationAccuracy.request(function (success) {
                console.log("Successfully requested accuracy: " + success.message);
            }, function (error) {
                console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
                if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                    if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }
    });


});

$(document).ready(function () {
    $(document).load('js/views/station.html', function () {
        setTimeout(function () {
            var h = $("#height-decal").outerHeight(true);
            $("#main-decal").css("padding-top", h + 10 + "px");
        }, 1000);


    });
});