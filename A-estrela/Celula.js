function Celula(posicaoX, posicaoY) {
    
    this.x = posicaoX;
    this.y = posicaoY;

    this.id = posicaoX + "-" + posicaoY;
    
    this.F;
    this.G;
    this.H;

    this.parent;

    this.isObstaculo = false;
}