
var status = "CONFIGURACAO";
var statusPainel = "INICIO";
var statusPassos = "PASSO1PRE";
var statusFinal;


var temInicio = false;
var temDestino = false;

var matriz = new Matriz();

var divCelulaInicio;
var divCelulaDestino;

var celulaInicio;
var celulaDestino;

var current;
var open = [];
var close = [];

var textoInicio = "Click sobre uma célula para definir o ponto de início.";
var textoDestino = "Click sobre uma célula para definir o ponto de destino.";
var textoObstaculo = "Click sobre uma célula para inserir ou remover um ponto com obstáculo.";

var clicks = 0;
var easterEgg = true;

window.onload = function () {
    MatrizSetup(matriz);
}

function ProximoPasso()
{
    if (status == "CONFIGURACAO") {
        if (temInicio && temDestino) {
            status = "PASSOS";
        }
        else {
            return;
        }
    }
    LimparClassesPassos();
    switch (statusPassos) {
        case "PASSO1PRE":
            Passo1Pre();
            break;
        case "PASSO1":
            Passo1();
            break;
        case "PASSO2APRE":
            Passo2APre();
            break;
        case "PASSO2A":
            Passo2A();
            break;
        case "PASSO2BPRE":
            Passo2BPre();
            break;
        case "PASSO2B":
            Passo2B();
            break;
        case "PASSO2CPRE":
            Passo2CPre();
            break;
        case "PASSO2C":
            Passo2C();
            break;
        case "PASSO2DPRE":
            Passo2DPre();
            break;
        case "PASSO2D":
            Passo2D();
            break;
        case "PASSO3PRE":
            Passo3Pre();
            break;
        case "PASSO3":
            Passo3();
            break;
        default:
    }

    function Passo1Pre() {
        InserirClasse(document.getElementById("passo1"), "pre");
        statusPassos = "PASSO1";
        DesabilitarPainel();
    }
    function Passo1() {

        InserirClasse(document.getElementById("passo1"), "pos");

        //Calcular F, G e H do nó inicial
        celulaInicio.H = (Math.abs(celulaInicio.x - celulaDestino.x) + Math.abs(celulaInicio.y - celulaDestino.y)) * 10;
        celulaInicio.G = 0;
        celulaInicio.F = celulaInicio.H + celulaInicio.G;

        //Adicionar o nó inicial à lista aberta
        open.push(celulaInicio);
        current = celulaInicio;

        AtualizarOpen();

        statusPassos = "PASSO2APRE";
    }

    function Passo2APre() {

        InserirClasse(document.getElementById("passo2"), "pre");
        InserirClasse(document.getElementById("passo2A"), "pre");
        statusPassos = "PASSO2A";
    }

    function Passo2A() {

        
        InserirClasse(document.getElementById("passo2"), "pos");
        InserirClasse(document.getElementById("passo2A"), "pos");

        //Procurar o nó que tenha o menor custo de F na lista aberta (open). Este é o nó corrente (current).
        RemoverClasse(document.getElementById(current.id), "celula-current");
        var menorF = Infinity;
        for (var i = 0; i < open.length; i++) {
            if (open[i].F < menorF) {
                current = open[i];
                menorF = open[i].F;
            }
        }
        InserirClasse(document.getElementById(current.id), "celula-current");
        AtualizarCurrent();

        statusPassos = "PASSO2BPRE";
    }
    
    function Passo2BPre() {
        InserirClasse(document.getElementById("passo2"), "pre");
        InserirClasse(document.getElementById("passo2B"), "pre");
        statusPassos = "PASSO2B";
    }

    function Passo2B() {
        InserirClasse(document.getElementById("passo2"), "pos");
        InserirClasse(document.getElementById("passo2B"), "pos");

        //Mover o nó para a lista fechada(close). 
        InserirClasse(document.getElementById(current.id), "celula-close");
        close.push(current);
        open.splice(open.indexOf(current), 1);

        AtualizarClose();

        statusPassos = "PASSO2CPRE";
    }

    function Passo2CPre() {
        InserirClasse(document.getElementById("passo2"), "pre");
        InserirClasse(document.getElementById("passo2C"), "pre");
        InserirClasse(document.getElementById("passo2Ca"), "pre");
        InserirClasse(document.getElementById("passo2Cb"), "pre");
        InserirClasse(document.getElementById("passo2Cai"), "pre");
        InserirClasse(document.getElementById("passo2Caii"), "pre");
        statusPassos = "PASSO2C";
    }

    function Passo2C() {
        InserirClasse(document.getElementById("passo2"), "pos");
        InserirClasse(document.getElementById("passo2C"), "pos");
        InserirClasse(document.getElementById("passo2Ca"), "pos");
        InserirClasse(document.getElementById("passo2Cb"), "pos");
        InserirClasse(document.getElementById("passo2Cai"), "pos");
        InserirClasse(document.getElementById("passo2Caii"), "pos");

        //Repetir para cada nó vizinho:
        for (var x = current.x - 1; x <= current.x + 1; x++) {
            for (var y = current.y - 1; y <= current.y + 1; y++) {
                var vizinho = matriz.ObterCelula(x, y);
                if (vizinho != null) {
                    //Ignorar se não der para passar ou se já estiver na close. 
                    if (vizinho != current && !vizinho.isObstaculo && !EstaNaLista(close, vizinho)) {
                        //Se não estiver em open, coloque-o e faça o parent do nó apontar para o current. Grave F, G e H.
                        if (!EstaNaLista(open, vizinho)) {

                            vizinho.parent = current;
                            //Calcular H
                            vizinho.H = (Math.abs(vizinho.x - celulaDestino.x) + Math.abs(vizinho.y - celulaDestino.y)) * 10;
                            //Calcular G
                            if (vizinho.x == current.x || vizinho.y == current.y) { //Se estão na mesma linha ou coluna -> 10
                                vizinho.G = current.G + 10;
                            }
                            else {//Diagonal -> 10 * raiz de 2
                                vizinho.G = current.G + 14; 
                            }
                            //Calcular F
                            vizinho.F = vizinho.H + vizinho.G;

                            open.push(vizinho)
                            //Atualizar interface
                            var lblF = document.createElement("label");
                            lblF.setAttribute("id", vizinho.id + "-F");
                            lblF.innerText = "F: " + vizinho.F;
                            var lblG = document.createElement("label");
                            lblG.innerText = "G: " + vizinho.G;
                            lblG.setAttribute("id", vizinho.id + "-G");
                            var lblH = document.createElement("label");
                            lblH.innerText = "H: " + vizinho.H;
                            lblH.setAttribute("id", vizinho.id + "-H");
                            var lblP = document.createElement("label");
                            lblP.innerText = "Parent: (" + vizinho.parent.x + "," + vizinho.parent.y + ")";
                            lblP.setAttribute("id", vizinho.id + "-P");

                            var divCelula = document.getElementById(vizinho.x + "-" + vizinho.y);
                            divCelula.appendChild(lblF);
                            divCelula.appendChild(lblG);
                            divCelula.appendChild(lblH);
                            divCelula.appendChild(lblP);
                        }
                        else { //Se já estiver em open, veja se o caminho não é melhor. Ou seja, se G é menor. Se for, recalcule o parent, F, G e H.

                            var G;
                            if (vizinho.x == current.x || vizinho.y == current.y) { //Se estão na mesma linha ou coluna -> 10
                                G = current.G + 10;
                            }
                            else {
                                G = current.G + 10 * Math.sqrt(2);
                            }
                            if (G < vizinho.G) {
                                vizinho.G = G;
                                vizinho.F = vizinho.H + vizinho.G;
                                vizinho.parent = current;

                                document.getElementById(vizinho.id + "-G").innerHTML = "G: " + vizinho.G;
                                document.getElementById(vizinho.id + "-F").innerHTML = "F: " + vizinho.F;
                                document.getElementById(vizinho.id + "-P").innerHTML = "Parent: (" + current.x + "," + current.y + ")";
                            }
                        }
                    }
                }
            }
        }

        AtualizarOpen();

        statusPassos = "PASSO2DPRE";
    }

    function Passo2DPre() {
        InserirClasse(document.getElementById("passo2"), "pre");
        InserirClasse(document.getElementById("passo2D"), "pre");
        InserirClasse(document.getElementById("passo2Da"), "pre");
        InserirClasse(document.getElementById("passo2Db"), "pre");
        statusPassos = "PASSO2D";
    }

    function Passo2D() {
        InserirClasse(document.getElementById("passo2"), "pos");
        InserirClasse(document.getElementById("passo2D"), "pos");
        InserirClasse(document.getElementById("passo2Da"), "pos");
        InserirClasse(document.getElementById("passo2Db"), "pos");

        //Interrompa o processo quando:

        //Achou! Quadrado alvo esta na close.
        if (EstaNaLista(close, celulaDestino)) {
            statusPassos = "PASSO3PRE";
            statusFinal = "ACHOU";
        }
        else if (open.length == 0) { //Não achou - open vazia.
            statusPassos = "PASSO3PRE";
            statusFinal = "NAOACHOU";
        }
        else {
            statusPassos = "PASSO2APRE";
        }
    }

    function Passo3Pre() {
        if (statusFinal == "ACHOU") {

            InserirClasse(document.getElementById("passo3"), "pre");
            statusPassos = "PASSO3";
        }
        else {
            var alerta = document.getElementById("pInstrucoes");
            alerta.innerHTML = "Impossível encontrar um caminho.";
            InserirClasse(alerta, "alerta");
        }
    }

    function Passo3() {
        InserirClasse(document.getElementById("passo3"), "pos");
        RemoverClasse(divCelulaDestino, "celula-current");
        while (current.parent != null) {
            
            InserirClasse(document.getElementById(current.id), "celula-caminho");
            current = current.parent;

        }
        clicks = 0;
    }

    //-------------------------------------------Atualizações das listas
    function AtualizarClose() {
        var texto = "Close:";
        for (var i = 0; i < close.length; i++) {
            texto += " (" + close[i].x + "," + close[i].y + ")";
        }
        texto = texto.length > 140 ? texto.substring(0, 140) + "..." : texto;
        document.getElementById("lblClose").innerHTML = texto;
    }

    function AtualizarOpen() {
        var texto = "Open:";
        for (var i = 0; i < open.length; i++) {
            texto += " (" + open[i].x + "," + open[i].y + ") = " + open[i].F;
        }
        texto = texto.length > 140 ? texto.substring(0, 140) + "..." : texto;
        document.getElementById("lblOpen").innerHTML = texto;
    }

    function AtualizarCurrent() {

        document.getElementById("lblCurrent").innerHTML = "Current: (" + current.x + "," + current.y + ")";
    }


    //----------------------------------------Alteração das classes
    function LimparClassesPassos() {
        RemoverClasse(document.getElementById("passo1"), "pre");
        RemoverClasse(document.getElementById("passo1"), "pos");
        RemoverClasse(document.getElementById("passo2"), "pre");
        RemoverClasse(document.getElementById("passo2"), "pos");
        RemoverClasse(document.getElementById("passo2A"), "pre");
        RemoverClasse(document.getElementById("passo2A"), "pos");
        RemoverClasse(document.getElementById("passo2B"), "pre");
        RemoverClasse(document.getElementById("passo2B"), "pos");
        RemoverClasse(document.getElementById("passo2C"), "pre");
        RemoverClasse(document.getElementById("passo2C"), "pos");
        RemoverClasse(document.getElementById("passo2Ca"), "pre");
        RemoverClasse(document.getElementById("passo2Ca"), "pos");
        RemoverClasse(document.getElementById("passo2Cb"), "pre");
        RemoverClasse(document.getElementById("passo2Cb"), "pos");
        RemoverClasse(document.getElementById("passo2Cai"), "pre");
        RemoverClasse(document.getElementById("passo2Cai"), "pos");
        RemoverClasse(document.getElementById("passo2Caii"), "pre");
        RemoverClasse(document.getElementById("passo2Caii"), "pos");
        RemoverClasse(document.getElementById("passo2D"), "pre");
        RemoverClasse(document.getElementById("passo2D"), "pos");
        RemoverClasse(document.getElementById("passo2Da"), "pre");
        RemoverClasse(document.getElementById("passo2Da"), "pos");
        RemoverClasse(document.getElementById("passo2Db"), "pre");
        RemoverClasse(document.getElementById("passo2Db"), "pos");
        RemoverClasse(document.getElementById("passo3"), "pre");
        RemoverClasse(document.getElementById("passo3"), "pos");
    }

    function DesabilitarPainel() {

        RemoverClasse(document.getElementById("btnInicio"), "botao-ativo")
        RemoverClasse(document.getElementById("btnDestino"), "botao-ativo")
        RemoverClasse(document.getElementById("btnObstaculo"), "botao-ativo")
        InserirClasse(document.getElementById("btnInicio"), "botao-inativo")
        InserirClasse(document.getElementById("btnDestino"), "botao-inativo")
        InserirClasse(document.getElementById("btnObstaculo"), "botao-inativo")
        document.getElementById("pInstrucoes").innerHTML = "";
    }

    //-------------------------------------Consulta em lista
    function EstaNaLista(lista, celula) {
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].x == celula.x && lista[i].y == celula.y) {
                return true;
            }
        }
        return false;
    }
}

function setStatus(novoStatus) {
    if (status != "CONFIGURACAO") {
        return;
    }
    switch (statusPainel) {
        case "INICIO":
            RemoverClasse(document.getElementById("btnInicio"), "botao-ativo")
            break;
        case "DESTINO":
            RemoverClasse(document.getElementById("btnDestino"), "botao-ativo")
            break;
        case "OBSTACULO":
            RemoverClasse(document.getElementById("btnObstaculo"), "botao-ativo")
            break;
        default:
    }
    switch (novoStatus) {
        case "INICIO":
            InserirClasse(document.getElementById("btnInicio"), "botao-ativo")
            document.getElementById("pInstrucoes").innerHTML = textoInicio;
            break;
        case "DESTINO":
            InserirClasse(document.getElementById("btnDestino"), "botao-ativo")
            document.getElementById("pInstrucoes").innerHTML = textoDestino;
            break;
        case "OBSTACULO":
            InserirClasse(document.getElementById("btnObstaculo"), "botao-ativo")
            document.getElementById("pInstrucoes").innerHTML = textoObstaculo;
            clicks++;
            if (clicks >= 3 && easterEgg) {
                MontarLabirinto();
                easterEgg = false;
            }
            break;
        default:
    }
    statusPainel = novoStatus;
}

function celulaClick(id) {
    easterEgg = false;

    if (status != "CONFIGURACAO") {
        return;
    }
    switch (statusPainel) {
        case "INICIO":
            DefinirInicio();
            break;
        case "DESTINO":
            DefinirDestino();
            break;
        case "OBSTACULO":
            DefinirObstaculo();
            break;
        default:
    }

    function DefinirInicio() {

        if (temInicio) {
            RemoverClasse(divCelulaInicio, "celula-inicio");
        }

        var x = id.split("-")[0];
        var y = id.split("-")[1];
        celulaInicio = matriz.ObterCelula(x, y);

        divCelulaInicio = document.getElementById(id);
        InserirClasse(divCelulaInicio, "celula-inicio");

        temInicio = true;
        if (temDestino) {
            statusPainel = "OBSTACULO";
            InserirClasse(document.getElementById("btnObstaculo"), "botao-ativo");
            document.getElementById("pInstrucoes").innerHTML = textoObstaculo;
            RemoverClasse(document.getElementById("btnProximo"), "botao-inativo")
        }
        else {
            statusPainel = "DESTINO";
            InserirClasse(document.getElementById("btnDestino"), "botao-ativo");
            document.getElementById("pInstrucoes").innerHTML = textoDestino;
        }
        RemoverClasse(document.getElementById("btnInicio"), "botao-ativo");

    }
    function DefinirDestino() {

        if (temDestino) {
            RemoverClasse(divCelulaDestino, "celula-destino");
        }

        var x = id.split("-")[0];
        var y = id.split("-")[1];
        celulaDestino = matriz.ObterCelula(x, y);

        divCelulaDestino = document.getElementById(id);
        InserirClasse(divCelulaDestino, "celula-destino");

        temDestino = true;

        if (temInicio) {
            statusPainel = "OBSTACULO";
            InserirClasse(document.getElementById("btnObstaculo"), "botao-ativo");
            document.getElementById("pInstrucoes").innerHTML = textoObstaculo;
            RemoverClasse(document.getElementById("btnProximo"), "botao-inativo")
        }
        else {
            statusPainel = "INICIO";
            InserirClasse(document.getElementById("btnInicio"), "botao-ativo");
            document.getElementById("pInstrucoes").innerHTML = textoInicio;
        }
        RemoverClasse(document.getElementById("btnDestino"), "botao-ativo");
    }
    function DefinirObstaculo() {

        var x = id.split("-")[0];
        var y = id.split("-")[1];
        var obstaculo = matriz.ObterCelula(x, y);
        if (obstaculo.isObstaculo) {
            obstaculo.isObstaculo = false;
            RemoverClasse(document.getElementById(id), "celula-obstaculo");
        }
        else {
            obstaculo.isObstaculo = true;
            InserirClasse(document.getElementById(id), "celula-obstaculo");
        }
    }

    
}

function MontarLabirinto() {
    
    setStatus("INICIO");
    celulaClick("1-1");
    setStatus("DESTINO");
    celulaClick("10-8");
    setStatus("OBSTACULO");
    celulaClick("7-1");
    celulaClick("1-2");
    celulaClick("2-2");
    celulaClick("3-2");
    celulaClick("4-2");
    celulaClick("5-2");
    celulaClick("7-2");
    celulaClick("9-2");
    celulaClick("7-3");
    celulaClick("9-3");
    celulaClick("2-4");
    celulaClick("3-4");
    celulaClick("4-4");
    celulaClick("5-4");
    celulaClick("7-4");
    celulaClick("9-4");
    celulaClick("5-5");
    celulaClick("9-5");
    celulaClick("1-6");
    celulaClick("2-6");
    celulaClick("3-6");
    celulaClick("5-6");
    celulaClick("6-6");
    celulaClick("7-6");
    celulaClick("8-6");
    celulaClick("9-6");
    celulaClick("10-6");
    celulaClick("5-7");
    celulaClick("2-8");
    celulaClick("3-8");
    celulaClick("7-8");
    celulaClick("8-8");
    celulaClick("9-8");
    document.getElementById("btnProximo").style.display = "none";
    document.getElementById("btnGoGoGo").style.removeProperty("display");
}