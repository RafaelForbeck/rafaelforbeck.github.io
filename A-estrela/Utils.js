
function InserirClasse(elemento, classe) {
    elemento.setAttribute("class", elemento.getAttribute("class") + " " + classe);
}
function RemoverClasse(elemento, classe) {
    elemento.setAttribute("class", elemento.getAttribute("class").replace(classe, "").trim());
}