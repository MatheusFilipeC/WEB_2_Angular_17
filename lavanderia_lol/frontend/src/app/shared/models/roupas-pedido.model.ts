export class RoupasPedido {
  constructor(
    public idPedido?: number,
    public idRoupa?: number,
    public nomeRoupa?: string,
    public valorLavagemPeca?: number,
    public quantidade?: number,
    public prazo?: number,) {}
}