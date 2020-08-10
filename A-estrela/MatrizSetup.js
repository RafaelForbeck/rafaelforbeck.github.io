
function MatrizSetup(matriz) {

    var divMatriz = document.getElementById("matriz");
    var cssClass = "celula";
    var cssClassAlternada = "celula-alternada";
    var alternanda = false;

    for (var y = 1; y <= 8; y++) {
        for (var x = 1; x <= 10; x++) {

            matriz.InserirCelula(x, y);
            var id = x + "-" + y;
            var divCelula = document.createElement("div");
            divCelula.setAttribute("id", id);
            divCelula.setAttribute("onclick", "celulaClick('" + id + "')");

            if (alternanda) {
                divCelula.setAttribute("class", "celula alternada");
            }
            else {
                divCelula.setAttribute("class", "celula");
            }
            alternanda = !alternanda;

            var posicao = document.createElement("label");
            posicao.setAttribute("class", "bold");
            posicao.innerText = "(" + x + "," + y + ")";

            divCelula.appendChild(posicao);
            divMatriz.appendChild(divCelula);
        }
        alternanda = !alternanda;
    }
}