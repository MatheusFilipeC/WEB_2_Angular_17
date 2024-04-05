import { Pedido } from "./models";
import { RoupasPedido } from "./models";
import { Cliente } from "./models";

export const pedidosHardCode: Pedido[] = [
  { 
    idPedido: 1, 
    dataPedido: new Date('2023-09-15T14:30:00'), 
    dataEstimativa: new Date('2023-09-15T14:30:00'), 
    dataColeta: new Date('2023-09-15T14:30:00'), 
    dataEntrega: new Date('2023-09-15T14:30:00'), 
    valor: 30.00, 
    statusPedido: 'Em Aberto',
    roupas: [
      new RoupasPedido(1, 1, 'Camisa', 15.00, 1),
      new RoupasPedido(1, 2, 'Calça', 25.00, 1),
      new RoupasPedido(1, 3, 'Meia', 5.00, 1),
    ]
  },
{ idPedido: 2, dataPedido: new Date('2023-09-20T10:00:00'), dataEstimativa: new Date('2023-09-20T10:00:00'), dataColeta: new Date('2023-09-20T10:00:00'), 
  dataEntrega: new Date('2023-09-20T10:00:00'), valor: 49.90, statusPedido: 'Cancelado' },
{ idPedido: 3, dataPedido: new Date('2023-10-05T08:45:00'), dataEstimativa: new Date('2023-10-05T08:45:00'), dataColeta: new Date('2023-10-05T08:45:00'), 
  dataEntrega: new Date('2023-10-05T08:45:00'), valor: 40.50, statusPedido: 'Recolhido' },
{ idPedido: 4, dataPedido: new Date('2023-10-10T13:15:00'), dataEstimativa: new Date('2023-10-10T13:15:00'), dataColeta: new Date('2023-10-10T13:15:00'), 
  dataEntrega: new Date('2023-10-10T13:15:00'), valor: 110.50, statusPedido: 'Aguardando Pagamento' },
{ idPedido: 5, dataPedido: new Date('2023-11-01T09:30:00'), dataEstimativa: new Date('2023-11-01T09:30:00'), dataColeta: new Date('2023-11-01T09:30:00'), 
  dataEntrega: new Date('2023-11-01T09:30:00'), valor: 60.89, statusPedido: 'Pago' },
{ idPedido: 6, dataPedido: new Date('2023-11-15T16:45:00'), dataEstimativa: new Date('2023-11-15T16:45:00'), dataColeta: new Date('2023-11-15T16:45:00'), 
  dataEntrega: new Date('2023-11-15T16:45:00'), valor: 10.80, statusPedido: 'Finalizado' },
{ idPedido: 7, dataPedido: new Date('2023-08-15T14:30:00'), dataEstimativa: new Date('2023-08-15T14:30:00'), dataColeta: new Date('2023-08-15T14:30:00'), 
  dataEntrega: new Date('2023-08-15T14:30:00'), valor: 60.00, statusPedido: 'Em Aberto' },
{ idPedido: 8, dataPedido: new Date('2023-09-22T14:30:00'), dataEstimativa: new Date('2023-09-22T14:30:00'), dataColeta: new Date('2023-09-22T14:30:00'), 
  dataEntrega: new Date('2023-09-22T14:30:00'), valor: 80.00, statusPedido: 'Em Aberto' },
{ idPedido: 9, dataPedido: new Date('2023-11-25T14:30:00'), dataEstimativa: new Date('2023-11-25T14:30:00'), dataColeta: new Date('2023-11-25T14:30:00'), 
  dataEntrega: new Date('2023-11-25T14:30:00'), valor: 20.00, statusPedido: 'Em Aberto' },
];