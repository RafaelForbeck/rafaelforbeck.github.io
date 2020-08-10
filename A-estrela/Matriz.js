function Matriz() {
    var celulas = [];


    this.InserirCelula = function (x, y) {

        var celula = new Celula(x, y);
        celulas.push(celula);
    }

    this.ObterCelula = function(x, y){
        for (var i = 0; i < celulas.length; i++) {
            if (celulas[i].x == x && celulas[i].y == y) {
                return celulas[i];
            }
        }
        return null;
    }
}