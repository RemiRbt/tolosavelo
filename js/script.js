function renameStation(string) {
    var temp = "";
    if(string.charAt(0) == 0) {
        temp = string.substr(8);
    } else {
        temp = string.substr(6);
    }
    return temp;
}
