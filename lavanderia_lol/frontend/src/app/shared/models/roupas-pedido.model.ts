export class RoupasPedido {
  constructor(
    public idPedido?: number,
    public idRoupa?: number,
    public pecaRoupa?: string,
    public valorPeca: number = 0,
    public quantidade?: number,
    public prazo?: number,) {}
}