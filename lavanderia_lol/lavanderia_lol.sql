--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.6

-- Started on 2024-08-06 19:59:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 84867)
-- Name: tb_clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_clientes (
    id_cliente integer NOT NULL,
    nome_cliente character varying(100) NOT NULL,
    email_cliente character varying(30) NOT NULL,
    senha_cliente character varying(30),
    cpf character varying(14) NOT NULL,
    telefone character varying(20),
    endereco character varying(50),
    numero character varying(10),
    complemento character varying(20),
    bairro character varying(30),
    cep character varying(11),
    cidade character varying(30),
    uf character varying(2)
);


ALTER TABLE public.tb_clientes OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 84881)
-- Name: tb_funcionarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_funcionarios (
    id_func integer NOT NULL,
    nome_func character varying(100) NOT NULL,
    email_func character varying(30) NOT NULL,
    senha_func character varying(30),
    data_nascimento date,
    habilitada boolean
);


ALTER TABLE public.tb_funcionarios OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 84900)
-- Name: tb_pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_pedidos (
    id_pedido integer NOT NULL,
    data_pedido timestamp without time zone NOT NULL,
    data_estimativa timestamp without time zone,
    data_coleta timestamp without time zone,
    data_entrega timestamp without time zone,
    data_pagamento timestamp without time zone,
    valor_total numeric(10,2),
    prazo integer,
    status character varying(50),
    id_cli integer
);


ALTER TABLE public.tb_pedidos OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 84899)
-- Name: tb_pedidos_id_pedido_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_pedidos ALTER COLUMN id_pedido ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_pedidos_id_pedido_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 84894)
-- Name: tb_roupas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_roupas (
    id_roupa integer NOT NULL,
    peca_roupa character varying(50) NOT NULL,
    preco numeric(10,2) NOT NULL,
    prazo integer NOT NULL,
    habilitada boolean
);


ALTER TABLE public.tb_roupas OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 84893)
-- Name: tb_roupas_id_roupa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_roupas ALTER COLUMN id_roupa ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_roupas_id_roupa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 84911)
-- Name: tb_roupas_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_roupas_pedido (
    id_item integer NOT NULL,
    id_pedido integer,
    id_roupa integer,
    peca_roupa character varying(50),
    valor_peca numeric(10,2),
    quantidade integer,
    prazo integer
);


ALTER TABLE public.tb_roupas_pedido OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 84910)
-- Name: tb_roupas_pedido_id_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_roupas_pedido ALTER COLUMN id_item ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_roupas_pedido_id_item_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 84862)
-- Name: tb_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_usuarios (
    id_usu integer NOT NULL,
    nome_usu character varying(100) NOT NULL,
    email_usu character varying(30) NOT NULL,
    senha_usu character varying(100) NOT NULL,
    perfil_usu character varying(10) NOT NULL
);


ALTER TABLE public.tb_usuarios OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 84861)
-- Name: tb_usuarios_id_usu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_usuarios ALTER COLUMN id_usu ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_usuarios_id_usu_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3351 (class 0 OID 84867)
-- Dependencies: 211
-- Data for Name: tb_clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_clientes (id_cliente, nome_cliente, email_cliente, senha_cliente, cpf, telefone, endereco, numero, complemento, bairro, cep, cidade, uf) FROM stdin;
2	Cliente	cliente	cliente	000000000	\N	\N	\N	\N	\N	\N	\N	\N
5	João	joao@mail.com	3484	12345678910	11987654321	Rua das Flores	123	apto 45	Jardim das Rosas	01023456	São Paulo	SP
6	José	jose@mail.com	7196	23456789021	21998765432	Avenida Brasil	456	Bloco B, Sala 202	Centro	20040002	Rio de Janeiro	RJ
7	Joana	joana@mail.com	5759	34567890132	31987656789	Rua das Acácias	789	Casa 7	Savassi	30130000	Belo Horizonte	MG
8	Joaquina	joaquina@mail.com	7760	45678901243	41988765432	Rua dos Cedros	101	\N	Batel	80230000	Curitiba	PR
\.


--
-- TOC entry 3352 (class 0 OID 84881)
-- Dependencies: 212
-- Data for Name: tb_funcionarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_funcionarios (id_func, nome_func, email_func, senha_func, data_nascimento, habilitada) FROM stdin;
1	Admin	admin	admin	\N	f
3	Maria	maria@mail.com	1234	2000-01-01	f
4	Mário	mario@mail.com	1234	1999-12-31	f
\.


--
-- TOC entry 3356 (class 0 OID 84900)
-- Dependencies: 216
-- Data for Name: tb_pedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_pedidos (id_pedido, data_pedido, data_estimativa, data_coleta, data_entrega, data_pagamento, valor_total, prazo, status, id_cli) FROM stdin;
4	2024-08-06 19:29:33.903639	\N	\N	\N	\N	80.00	4	Rejeitado	5
1	2024-08-06 19:28:51.534614	2024-08-10 23:28:51.534614	2024-08-06 23:28:51.534614	2024-08-10 23:28:51.534614	\N	35.00	4	Cancelado	5
5	2024-08-06 19:30:09.537936	2024-08-10 23:30:09.537936	2024-08-06 23:30:09.537936	2024-08-10 23:30:09.537936	\N	95.00	4	Em Aberto	5
7	2024-08-06 19:30:45.969479	2024-08-10 23:30:45.969479	2024-08-06 23:30:45.969479	2024-08-10 23:30:45.969479	\N	80.00	4	Em Aberto	5
9	2024-08-06 19:30:58.704122	2024-08-08 23:30:58.704122	2024-08-06 23:30:58.704122	2024-08-08 23:30:58.704122	\N	30.00	2	Em Aberto	5
6	2024-08-06 19:30:35.302154	2024-08-10 23:30:35.302154	2024-08-06 23:30:35.302154	2024-08-10 23:30:35.302154	\N	95.00	4	Recolhido	5
2	2024-08-06 19:29:01.307364	2024-08-10 23:29:01.307364	2024-08-06 23:29:01.307364	2024-08-10 23:29:01.307364	\N	70.00	4	Recolhido	5
21	2024-08-06 19:39:48.403792	2024-08-09 23:39:48.403792	2024-08-06 23:39:48.403792	2024-08-09 23:39:48.403792	2024-08-06 22:43:43.067	60.00	3	Finalizado	7
19	2024-08-06 19:39:31.65666	2024-08-10 23:39:31.65666	2024-08-06 23:39:31.65666	2024-08-10 23:39:31.65666	2024-08-06 22:43:32.948	55.00	4	Finalizado	7
8	2024-08-06 19:30:52.896298	2024-08-10 23:30:52.896298	2024-08-06 23:30:52.896298	2024-08-10 23:30:52.896298	2024-08-06 22:32:14.403	75.00	4	Pago	5
3	2024-08-06 19:29:12.639212	2024-08-07 23:29:12.639212	2024-08-06 23:29:12.639212	2024-08-07 23:29:12.639212	2024-08-06 22:32:17.843	15.00	1	Pago	5
10	2024-08-06 19:34:55.824397	2024-08-10 23:34:55.824397	2024-08-06 23:34:55.824397	2024-08-10 23:34:55.824397	\N	75.00	4	Em Aberto	6
24	2024-08-06 19:45:10.489488	2024-08-09 23:45:10.489488	2024-08-06 23:45:10.489488	2024-08-09 23:45:10.489488	\N	100.00	3	Recolhido	8
14	2024-08-06 19:35:45.310753	2024-08-10 23:35:45.310753	2024-08-06 23:35:45.310753	2024-08-10 23:35:45.310753	\N	80.00	4	Aguardando Pagamento	6
15	2024-08-06 19:35:50.175793	2024-08-07 23:35:50.175793	2024-08-06 23:35:50.175793	2024-08-07 23:35:50.175793	\N	20.00	1	Aguardando Pagamento	6
11	2024-08-06 19:35:05.629941	2024-08-10 23:35:05.629941	2024-08-06 23:35:05.629941	2024-08-10 23:35:05.629941	2024-08-06 22:38:13.264	60.00	4	Pago	6
12	2024-08-06 19:35:12.78548	2024-08-10 23:35:12.78548	2024-08-06 23:35:12.78548	2024-08-10 23:35:12.78548	2024-08-06 22:38:09.656	70.00	4	Finalizado	6
13	2024-08-06 19:35:27.779606	2024-08-10 23:35:27.779606	2024-08-06 23:35:27.779606	2024-08-10 23:35:27.779606	2024-08-06 22:38:00.126	95.00	4	Finalizado	6
16	2024-08-06 19:39:13.981519	2024-08-09 23:39:13.981519	2024-08-06 23:39:13.981519	2024-08-09 23:39:13.981519	\N	40.00	3	Recolhido	7
25	2024-08-06 19:45:15.923531	2024-08-10 23:45:15.923531	2024-08-06 23:45:15.923531	2024-08-10 23:45:15.923531	\N	80.00	4	Recolhido	8
30	2024-08-06 19:46:00.09963	2024-08-10 23:46:00.09963	2024-08-06 23:46:00.09963	2024-08-10 23:46:00.09963	\N	85.00	4	Aguardando Pagamento	8
26	2024-08-06 19:45:28.238638	2024-08-08 23:45:28.238638	2024-08-06 23:45:28.238638	2024-08-08 23:45:28.238638	2024-08-06 22:47:18.62	65.00	2	Pago	8
27	2024-08-06 19:45:35.029695	2024-08-10 23:45:35.029695	2024-08-06 23:45:35.029695	2024-08-10 23:45:35.029695	2024-08-06 22:47:20.733	80.00	4	Pago	8
29	2024-08-06 19:45:53.047842	2024-08-08 23:45:53.047842	2024-08-06 23:45:53.047842	2024-08-08 23:45:53.047842	2024-08-06 22:47:24.609	35.00	2	Finalizado	8
22	2024-08-06 19:40:03.324481	2024-08-10 23:40:03.324481	2024-08-06 23:40:03.324481	2024-08-10 23:40:03.324481	\N	60.00	4	Aguardando Pagamento	7
23	2024-08-06 19:40:09.730998	2024-08-10 23:40:09.730998	2024-08-06 23:40:09.730998	2024-08-10 23:40:09.730998	\N	50.00	4	Aguardando Pagamento	7
17	2024-08-06 19:39:18.374156	2024-08-10 23:39:18.374156	2024-08-06 23:39:18.374156	2024-08-10 23:39:18.374156	2024-08-06 22:43:28.371	60.00	4	Pago	7
18	2024-08-06 19:39:23.814587	2024-08-09 23:39:23.814587	2024-08-06 23:39:23.814587	2024-08-09 23:39:23.814587	2024-08-06 22:43:30.895	40.00	3	Pago	7
28	2024-08-06 19:45:48.0438	2024-08-10 23:45:48.0438	2024-08-06 23:45:48.0438	2024-08-10 23:45:48.0438	2024-08-06 22:47:22.735	45.00	4	Finalizado	8
20	2024-08-06 19:39:41.316024	2024-08-10 23:39:41.316024	2024-08-06 23:39:41.316024	2024-08-10 23:39:41.316024	2024-08-06 22:43:35.189	65.00	4	Finalizado	7
\.


--
-- TOC entry 3354 (class 0 OID 84894)
-- Dependencies: 214
-- Data for Name: tb_roupas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_roupas (id_roupa, peca_roupa, preco, prazo, habilitada) FROM stdin;
1	Calça	15.00	3	f
2	Camisa	20.00	4	f
3	Camiseta	10.00	2	f
4	Meia	5.00	1	f
5	Cueca	5.00	1	f
\.


--
-- TOC entry 3358 (class 0 OID 84911)
-- Dependencies: 218
-- Data for Name: tb_roupas_pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_roupas_pedido (id_item, id_pedido, id_roupa, peca_roupa, valor_peca, quantidade, prazo) FROM stdin;
1	1	2	Camisa	20.00	1	4
2	1	3	Camiseta	10.00	1	2
3	1	4	Meia	5.00	1	1
4	2	2	Camisa	20.00	2	4
5	2	1	Calça	15.00	2	3
6	3	5	Cueca	5.00	2	1
7	3	4	Meia	5.00	1	1
8	4	2	Camisa	20.00	2	4
9	4	1	Calça	15.00	1	3
10	4	3	Camiseta	10.00	1	2
11	4	4	Meia	5.00	2	1
12	4	5	Cueca	5.00	1	1
13	5	3	Camiseta	10.00	2	2
14	5	2	Camisa	20.00	3	4
15	5	1	Calça	15.00	1	3
16	6	3	Camiseta	10.00	2	2
17	6	5	Cueca	5.00	2	1
18	6	1	Calça	15.00	3	3
19	6	2	Camisa	20.00	1	4
20	7	2	Camisa	20.00	2	4
21	7	1	Calça	15.00	2	3
22	7	5	Cueca	5.00	2	1
23	8	3	Camiseta	10.00	2	2
24	8	2	Camisa	20.00	2	4
25	8	1	Calça	15.00	1	3
26	9	5	Cueca	5.00	2	1
27	9	4	Meia	5.00	2	1
28	9	3	Camiseta	10.00	1	2
29	10	2	Camisa	20.00	2	4
30	10	3	Camiseta	10.00	2	2
31	10	1	Calça	15.00	1	3
32	11	2	Camisa	20.00	2	4
33	11	3	Camiseta	10.00	2	2
34	12	1	Calça	15.00	2	3
35	12	2	Camisa	20.00	2	4
36	13	5	Cueca	5.00	2	1
37	13	4	Meia	5.00	2	1
38	13	3	Camiseta	10.00	2	2
39	13	2	Camisa	20.00	2	4
40	13	1	Calça	15.00	1	3
41	14	2	Camisa	20.00	2	4
42	14	1	Calça	15.00	2	3
43	14	3	Camiseta	10.00	1	2
44	15	4	Meia	5.00	2	1
45	15	5	Cueca	5.00	2	1
46	16	1	Calça	15.00	2	3
47	16	4	Meia	5.00	2	1
48	17	3	Camiseta	10.00	2	2
49	17	2	Camisa	20.00	2	4
50	18	1	Calça	15.00	2	3
51	18	5	Cueca	5.00	2	1
52	19	5	Cueca	5.00	1	1
53	19	4	Meia	5.00	1	1
54	19	3	Camiseta	10.00	1	2
55	19	2	Camisa	20.00	1	4
56	19	1	Calça	15.00	1	3
57	20	2	Camisa	20.00	2	4
58	20	1	Calça	15.00	1	3
59	20	5	Cueca	5.00	1	1
60	20	4	Meia	5.00	1	1
61	21	4	Meia	5.00	2	1
62	21	3	Camiseta	10.00	2	2
63	21	1	Calça	15.00	2	3
64	22	3	Camiseta	10.00	2	2
65	22	2	Camisa	20.00	2	4
66	23	4	Meia	5.00	1	1
67	23	3	Camiseta	10.00	1	2
68	23	2	Camisa	20.00	1	4
69	23	1	Calça	15.00	1	3
70	24	3	Camiseta	10.00	1	2
71	24	1	Calça	15.00	6	3
72	25	2	Camisa	20.00	2	4
73	25	3	Camiseta	10.00	4	2
74	26	5	Cueca	5.00	3	1
75	26	4	Meia	5.00	4	1
76	26	3	Camiseta	10.00	3	2
77	27	1	Calça	15.00	2	3
78	27	5	Cueca	5.00	2	1
79	27	2	Camisa	20.00	2	4
80	28	3	Camiseta	10.00	1	2
81	28	2	Camisa	20.00	1	4
82	28	1	Calça	15.00	1	3
83	29	3	Camiseta	10.00	2	2
84	29	5	Cueca	5.00	2	1
85	29	4	Meia	5.00	1	1
86	30	2	Camisa	20.00	2	4
87	30	1	Calça	15.00	2	3
88	30	4	Meia	5.00	3	1
\.


--
-- TOC entry 3350 (class 0 OID 84862)
-- Dependencies: 210
-- Data for Name: tb_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_usuarios (id_usu, nome_usu, email_usu, senha_usu, perfil_usu) FROM stdin;
1	Admin	admin	admin	FUNC
2	Cliente	cliente	cliente	CLIENTE
3	Maria	maria@mail.com	1234	FUNC
4	Mário	mario@mail.com	1234	FUNC
5	João	joao@mail.com	3484	CLIENTE
6	José	jose@mail.com	7196	CLIENTE
7	Joana	joana@mail.com	5759	CLIENTE
8	Joaquina	joaquina@mail.com	7760	CLIENTE
\.


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 215
-- Name: tb_pedidos_id_pedido_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_pedidos_id_pedido_seq', 30, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 213
-- Name: tb_roupas_id_roupa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_roupas_id_roupa_seq', 5, true);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 217
-- Name: tb_roupas_pedido_id_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_roupas_pedido_id_item_seq', 88, true);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 209
-- Name: tb_usuarios_id_usu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_usuarios_id_usu_seq', 8, true);


--
-- TOC entry 3190 (class 2606 OID 84875)
-- Name: tb_clientes tb_clientes_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_cpf_key UNIQUE (cpf);


--
-- TOC entry 3192 (class 2606 OID 84873)
-- Name: tb_clientes tb_clientes_email_cliente_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_email_cliente_key UNIQUE (email_cliente);


--
-- TOC entry 3194 (class 2606 OID 84871)
-- Name: tb_clientes tb_clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_pkey PRIMARY KEY (id_cliente);


--
-- TOC entry 3196 (class 2606 OID 84887)
-- Name: tb_funcionarios tb_funcionarios_email_func_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_funcionarios
    ADD CONSTRAINT tb_funcionarios_email_func_key UNIQUE (email_func);


--
-- TOC entry 3198 (class 2606 OID 84885)
-- Name: tb_funcionarios tb_funcionarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_funcionarios
    ADD CONSTRAINT tb_funcionarios_pkey PRIMARY KEY (id_func);


--
-- TOC entry 3202 (class 2606 OID 84904)
-- Name: tb_pedidos tb_pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_pedidos
    ADD CONSTRAINT tb_pedidos_pkey PRIMARY KEY (id_pedido);


--
-- TOC entry 3204 (class 2606 OID 84915)
-- Name: tb_roupas_pedido tb_roupas_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roupas_pedido
    ADD CONSTRAINT tb_roupas_pedido_pkey PRIMARY KEY (id_item);


--
-- TOC entry 3200 (class 2606 OID 84898)
-- Name: tb_roupas tb_roupas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roupas
    ADD CONSTRAINT tb_roupas_pkey PRIMARY KEY (id_roupa);


--
-- TOC entry 3188 (class 2606 OID 84866)
-- Name: tb_usuarios tb_usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id_usu);


--
-- TOC entry 3205 (class 2606 OID 84876)
-- Name: tb_clientes tb_clientes_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.tb_usuarios(id_usu);


--
-- TOC entry 3206 (class 2606 OID 84888)
-- Name: tb_funcionarios tb_funcionarios_id_func_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_funcionarios
    ADD CONSTRAINT tb_funcionarios_id_func_fkey FOREIGN KEY (id_func) REFERENCES public.tb_usuarios(id_usu);


--
-- TOC entry 3207 (class 2606 OID 84905)
-- Name: tb_pedidos tb_pedidos_id_cli_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_pedidos
    ADD CONSTRAINT tb_pedidos_id_cli_fkey FOREIGN KEY (id_cli) REFERENCES public.tb_clientes(id_cliente);


--
-- TOC entry 3208 (class 2606 OID 84916)
-- Name: tb_roupas_pedido tb_roupas_pedido_id_pedido_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roupas_pedido
    ADD CONSTRAINT tb_roupas_pedido_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.tb_pedidos(id_pedido);


--
-- TOC entry 3209 (class 2606 OID 84921)
-- Name: tb_roupas_pedido tb_roupas_pedido_id_roupa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_roupas_pedido
    ADD CONSTRAINT tb_roupas_pedido_id_roupa_fkey FOREIGN KEY (id_roupa) REFERENCES public.tb_roupas(id_roupa);


-- Completed on 2024-08-06 19:59:03

--
-- PostgreSQL database dump complete
--

