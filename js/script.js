// Permet de supprimer les chiffres d'identifications devant le nom d'une station passée en paramètre
function renameStation(string) {
    var temp = "";
    // Si le nom de la station commence par "0", on supprimer les 8 premiers caractères (Voir données api JCdecaux)
    if(string.charAt(0) == 0) {
        temp = string.substr(8);
    // Sinon on supprimer les 6 premiers (Voir données api JCdecaux)
    } else {
        temp = string.substr(6);
    }
    return temp;
}
