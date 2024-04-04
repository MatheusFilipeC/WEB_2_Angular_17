import { RoupasPedido } from "./roupas-pedido.model";
import { Cliente } from "./cliente.model";

export class Pedido {
    constructor(
      public idPedido?: number,
      public dataPedido?: Date,
      public dataEstimativa?: Date,
      public dataColeta?: Date,
      public dataEntrega?: Date,
      public valor?: number,
      public statusPedido?: string,
      public roupas?: RoupasPedido[],
      public cliente?: Cliente[]) {}
  }