export class Funcionario {
  constructor(
    public idFuncionario: number,
    public nomeFuncionario: string,
    public email: string,
    public senha:string,
    public dataNascimento: Date,
    public habilitada: boolean) {}
}