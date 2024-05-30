export class Cliente {
  constructor(
    public idCliente?: number,
    public cpf?: string,
    public nome?: string,
    public email?: string,
    public endereco?: string,
    public numero?: number,
    public complemento?: number,
    public bairro?: string,
    public cep?: string,
    public cidade?: string,
    public uf?: string,
    public telefone?: string,
    public senha?: string,
  ) {}
}
