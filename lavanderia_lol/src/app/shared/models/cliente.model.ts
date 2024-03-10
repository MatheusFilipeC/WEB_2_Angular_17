export class Cliente {
  constructor(
    public idCliente?: number,
    public cpf?: number,
    public nomeCliente?: string,
    public email?: string,
    public cep?: number,
    public endereco?: string,
    public bairro?: string,
    public logradouro?: string,
    public numero?: number,
    public cidade?: string,
    public uf?: string,
    public senha?: string
  ) {}
}
