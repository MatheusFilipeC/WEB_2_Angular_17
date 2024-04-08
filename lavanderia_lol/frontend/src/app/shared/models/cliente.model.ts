export class Cliente {
  constructor(
    public idCliente?: number,
    public cpf?: string,
    public nomeCliente?: string,
    public email?: string,
    public logradouro?: string,
    public endereco?: string,
    public numero?: number,
    public bairro?: string,
    public cep?: string,
    public cidade?: string,
    public uf?: string,
    public senha?: string,
  ) {}
}
