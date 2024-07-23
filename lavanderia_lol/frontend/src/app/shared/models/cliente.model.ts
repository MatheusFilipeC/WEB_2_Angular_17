export class Cliente {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public cpf?: string,
    public telefone?: string,
    public endereco?: string,
    public numero?: string,
    public complemento?: number,
    public bairro?: string,
    public cep?: string,
    public cidade?: string,
    public uf?: string,
    public senha?: string
  ) {}
}
