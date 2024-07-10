CREATE DATABASE lavanderia;

\c lavanderia;

CREATE TABLE Clientes (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco TEXT
);

CREATE TABLE Servicos (
    id_servico SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Funcionarios (
    id_funcionario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cargo VARCHAR(50)
);

CREATE TABLE Pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES Clientes(id_cliente),
    id_funcionario INT REFERENCES Funcionarios(id_funcionario),
    data_pedido DATE NOT NULL DEFAULT CURRENT_DATE,
    data_entrega DATE,
    status VARCHAR(50) NOT NULL,
    observacoes TEXT
);

CREATE TABLE Detalhes_Pedido (
    id_detalhe SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES Pedidos(id_pedido),
    id_servico INT REFERENCES Servicos(id_servico),
    quantidade INT NOT NULL,
    preco_total DECIMAL(10, 2) NOT NULL
);

INSERT INTO Clientes (nome, telefone, email, endereco)
VALUES 
('Maria Silva', '1111-1111', 'maria@exemplo.com', 'Rua A, 123'),
('João Souza', '2222-2222', 'joao@exemplo.com', 'Rua B, 456');

INSERT INTO Servicos (descricao, preco)
VALUES 
('Lavagem Simples', 15.00),
('Passadoria', 10.00),
('Lavagem Completa', 25.00);

INSERT INTO Funcionarios (nome, telefone, email, cargo)
VALUES 
('Ana Pereira', '3333-3333', 'ana@exemplo.com', 'Atendente'),
('Carlos Mendes', '4444-4444', 'carlos@exemplo.com', 'Gerente');

INSERT INTO Pedidos (id_cliente, id_funcionario, data_entrega, status, observacoes)
VALUES 
(1, 1, '2024-07-15', 'Em andamento', 'Nenhuma'),
(2, 2, '2024-07-20', 'Concluído', 'Entrega expressa');

INSERT INTO Detalhes_Pedido (id_pedido, id_servico, quantidade, preco_total)
VALUES 
(1, 1, 3, 45.00),
(1, 2, 2, 20.00),
(2, 3, 1, 25.00);
