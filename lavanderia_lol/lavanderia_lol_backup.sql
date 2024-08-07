PGDMP                         |            lavanderia_lol    14.6    14.6 &    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    84860    lavanderia_lol    DATABASE     n   CREATE DATABASE lavanderia_lol WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE lavanderia_lol;
                postgres    false            �            1259    84867    tb_clientes    TABLE       CREATE TABLE public.tb_clientes (
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
    DROP TABLE public.tb_clientes;
       public         heap    postgres    false            �            1259    84881    tb_funcionarios    TABLE     �   CREATE TABLE public.tb_funcionarios (
    id_func integer NOT NULL,
    nome_func character varying(100) NOT NULL,
    email_func character varying(30) NOT NULL,
    senha_func character varying(30),
    data_nascimento date,
    habilitada boolean
);
 #   DROP TABLE public.tb_funcionarios;
       public         heap    postgres    false            �            1259    84900 
   tb_pedidos    TABLE     �  CREATE TABLE public.tb_pedidos (
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
    DROP TABLE public.tb_pedidos;
       public         heap    postgres    false            �            1259    84899    tb_pedidos_id_pedido_seq    SEQUENCE     �   ALTER TABLE public.tb_pedidos ALTER COLUMN id_pedido ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_pedidos_id_pedido_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    84894 	   tb_roupas    TABLE     �   CREATE TABLE public.tb_roupas (
    id_roupa integer NOT NULL,
    peca_roupa character varying(50) NOT NULL,
    preco numeric(10,2) NOT NULL,
    prazo integer NOT NULL,
    habilitada boolean
);
    DROP TABLE public.tb_roupas;
       public         heap    postgres    false            �            1259    84893    tb_roupas_id_roupa_seq    SEQUENCE     �   ALTER TABLE public.tb_roupas ALTER COLUMN id_roupa ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_roupas_id_roupa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    84911    tb_roupas_pedido    TABLE     �   CREATE TABLE public.tb_roupas_pedido (
    id_item integer NOT NULL,
    id_pedido integer,
    id_roupa integer,
    peca_roupa character varying(50),
    valor_peca numeric(10,2),
    quantidade integer,
    prazo integer
);
 $   DROP TABLE public.tb_roupas_pedido;
       public         heap    postgres    false            �            1259    84910    tb_roupas_pedido_id_item_seq    SEQUENCE     �   ALTER TABLE public.tb_roupas_pedido ALTER COLUMN id_item ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_roupas_pedido_id_item_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    84862    tb_usuarios    TABLE     �   CREATE TABLE public.tb_usuarios (
    id_usu integer NOT NULL,
    nome_usu character varying(100) NOT NULL,
    email_usu character varying(30) NOT NULL,
    senha_usu character varying(100) NOT NULL,
    perfil_usu character varying(10) NOT NULL
);
    DROP TABLE public.tb_usuarios;
       public         heap    postgres    false            �            1259    84861    tb_usuarios_id_usu_seq    SEQUENCE     �   ALTER TABLE public.tb_usuarios ALTER COLUMN id_usu ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tb_usuarios_id_usu_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210                      0    84867    tb_clientes 
   TABLE DATA           �   COPY public.tb_clientes (id_cliente, nome_cliente, email_cliente, senha_cliente, cpf, telefone, endereco, numero, complemento, bairro, cep, cidade, uf) FROM stdin;
    public          postgres    false    211   �2                 0    84881    tb_funcionarios 
   TABLE DATA           r   COPY public.tb_funcionarios (id_func, nome_func, email_func, senha_func, data_nascimento, habilitada) FROM stdin;
    public          postgres    false    212   �3                 0    84900 
   tb_pedidos 
   TABLE DATA           �   COPY public.tb_pedidos (id_pedido, data_pedido, data_estimativa, data_coleta, data_entrega, data_pagamento, valor_total, prazo, status, id_cli) FROM stdin;
    public          postgres    false    216   Y4                 0    84894 	   tb_roupas 
   TABLE DATA           S   COPY public.tb_roupas (id_roupa, peca_roupa, preco, prazo, habilitada) FROM stdin;
    public          postgres    false    214   �7                 0    84911    tb_roupas_pedido 
   TABLE DATA           s   COPY public.tb_roupas_pedido (id_item, id_pedido, id_roupa, peca_roupa, valor_peca, quantidade, prazo) FROM stdin;
    public          postgres    false    218   ;8                 0    84862    tb_usuarios 
   TABLE DATA           Y   COPY public.tb_usuarios (id_usu, nome_usu, email_usu, senha_usu, perfil_usu) FROM stdin;
    public          postgres    false    210   ::       %           0    0    tb_pedidos_id_pedido_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.tb_pedidos_id_pedido_seq', 30, true);
          public          postgres    false    215            &           0    0    tb_roupas_id_roupa_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.tb_roupas_id_roupa_seq', 5, true);
          public          postgres    false    213            '           0    0    tb_roupas_pedido_id_item_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.tb_roupas_pedido_id_item_seq', 88, true);
          public          postgres    false    217            (           0    0    tb_usuarios_id_usu_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.tb_usuarios_id_usu_seq', 8, true);
          public          postgres    false    209            v           2606    84875    tb_clientes tb_clientes_cpf_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_cpf_key UNIQUE (cpf);
 I   ALTER TABLE ONLY public.tb_clientes DROP CONSTRAINT tb_clientes_cpf_key;
       public            postgres    false    211            x           2606    84873 )   tb_clientes tb_clientes_email_cliente_key 
   CONSTRAINT     m   ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_email_cliente_key UNIQUE (email_cliente);
 S   ALTER TABLE ONLY public.tb_clientes DROP CONSTRAINT tb_clientes_email_cliente_key;
       public            postgres    false    211            z           2606    84871    tb_clientes tb_clientes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_pkey PRIMARY KEY (id_cliente);
 F   ALTER TABLE ONLY public.tb_clientes DROP CONSTRAINT tb_clientes_pkey;
       public            postgres    false    211            |           2606    84887 .   tb_funcionarios tb_funcionarios_email_func_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.tb_funcionarios
    ADD CONSTRAINT tb_funcionarios_email_func_key UNIQUE (email_func);
 X   ALTER TABLE ONLY public.tb_funcionarios DROP CONSTRAINT tb_funcionarios_email_func_key;
       public            postgres    false    212            ~           2606    84885 $   tb_funcionarios tb_funcionarios_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.tb_funcionarios
    ADD CONSTRAINT tb_funcionarios_pkey PRIMARY KEY (id_func);
 N   ALTER TABLE ONLY public.tb_funcionarios DROP CONSTRAINT tb_funcionarios_pkey;
       public            postgres    false    212            �           2606    84904    tb_pedidos tb_pedidos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.tb_pedidos
    ADD CONSTRAINT tb_pedidos_pkey PRIMARY KEY (id_pedido);
 D   ALTER TABLE ONLY public.tb_pedidos DROP CONSTRAINT tb_pedidos_pkey;
       public            postgres    false    216            �           2606    84915 &   tb_roupas_pedido tb_roupas_pedido_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.tb_roupas_pedido
    ADD CONSTRAINT tb_roupas_pedido_pkey PRIMARY KEY (id_item);
 P   ALTER TABLE ONLY public.tb_roupas_pedido DROP CONSTRAINT tb_roupas_pedido_pkey;
       public            postgres    false    218            �           2606    84898    tb_roupas tb_roupas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.tb_roupas
    ADD CONSTRAINT tb_roupas_pkey PRIMARY KEY (id_roupa);
 B   ALTER TABLE ONLY public.tb_roupas DROP CONSTRAINT tb_roupas_pkey;
       public            postgres    false    214            t           2606    84866    tb_usuarios tb_usuarios_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id_usu);
 F   ALTER TABLE ONLY public.tb_usuarios DROP CONSTRAINT tb_usuarios_pkey;
       public            postgres    false    210            �           2606    84876 '   tb_clientes tb_clientes_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tb_clientes
    ADD CONSTRAINT tb_clientes_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.tb_usuarios(id_usu);
 Q   ALTER TABLE ONLY public.tb_clientes DROP CONSTRAINT tb_clientes_id_cliente_fkey;
       public          postgres    false    3188    211    210            �           2606    84888 ,   tb_funcionarios tb_funcionarios_id_func_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tb_funcionarios
    ADD CONSTRAINT tb_funcionarios_id_func_fkey FOREIGN KEY (id_func) REFERENCES public.tb_usuarios(id_usu);
 V   ALTER TABLE ONLY public.tb_funcionarios DROP CONSTRAINT tb_funcionarios_id_func_fkey;
       public          postgres    false    212    3188    210            �           2606    84905 !   tb_pedidos tb_pedidos_id_cli_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tb_pedidos
    ADD CONSTRAINT tb_pedidos_id_cli_fkey FOREIGN KEY (id_cli) REFERENCES public.tb_clientes(id_cliente);
 K   ALTER TABLE ONLY public.tb_pedidos DROP CONSTRAINT tb_pedidos_id_cli_fkey;
       public          postgres    false    211    216    3194            �           2606    84916 0   tb_roupas_pedido tb_roupas_pedido_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tb_roupas_pedido
    ADD CONSTRAINT tb_roupas_pedido_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.tb_pedidos(id_pedido);
 Z   ALTER TABLE ONLY public.tb_roupas_pedido DROP CONSTRAINT tb_roupas_pedido_id_pedido_fkey;
       public          postgres    false    3202    218    216            �           2606    84921 /   tb_roupas_pedido tb_roupas_pedido_id_roupa_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tb_roupas_pedido
    ADD CONSTRAINT tb_roupas_pedido_id_roupa_fkey FOREIGN KEY (id_roupa) REFERENCES public.tb_roupas(id_roupa);
 Y   ALTER TABLE ONLY public.tb_roupas_pedido DROP CONSTRAINT tb_roupas_pedido_id_roupa_fkey;
       public          postgres    false    218    3200    214               F  x�m�KN�0���> �l�y�h"���m7C⅑��8�� V���N�V$'�=�����Y3L�?�X��}X
;:�����tt�D�Jt��E)HYy��DIhf�=z~�h4>n|���P����y� �X�@����{�՟����U�e���� )Y�,lOf�=�jDoĚ���xu�[tȕPP��#�B��
K�7|���a�ٱ<�8`�;��N�U��K.���O�mw��lHk��sh��[H©�ѕq�h��o���|��E]^~e�3��t:�k�&�kӏ:-d��
'��]�z�d��;lc�CQ�^         Y   x�3�tL����LD"c�8Ӹ�9}�29sA�Cnbf�^r~.����	�������!�p�^X��V�������R��H��2F��� T��         t  x���ˎ�0E��W�`�.�ٍ,�5��iA�yHh���T��]N+����։}�\�=��>x���a�\�$��o_�/y�}�������vz|mB�9u\ �Y�T�Ե%U\
Aa��xz�q~!BA��Y=1��U�b�K!���������[-�%s�v9+��\��XCd���q�Ҵ\E�mɺ�� �
B,��y�P�nU�!v�V��p�����2dm�=�'���դ)�;]
}�,�'�^����OU%ٖn��c��y��h�|����.����-���N���E��z.B�95a:�+�T�0��s�9���.T����&Nh_O?��$�&@�a��q�EE�m�k��.150@�;�r���-MȔc��5iڪ��>��I�\Pp��;Nz©Hk]�mɺ�����R%��]�����4m�Nת����{��xzy|�Ӄ9=�_�}s+�.x1�-R�~]�mɺ��- ӌB��2��_�4vi�S�P[��Ue)U٨u����­(3�A�@�w�6��s�ڐr�%�+at1f��դ��kdӓE���k6s��~ws�����DE�mɺ4Zl*.�X��SP��ɨJK��q]�K�S�Y���9KY�5eb���	�O-����!%�U���sI���.�WcI���0�dC�)T9����:J��V���(mK�h>�w�r��E��+�Cg]�m�k�b'>O�	\ח��=�u�'GȜLFk�Ķӥ��[w��Zٌxx�D�`��*-@{\
n�y��>|Be��ҁ���{	���2��Nj�pH+��W�d[���Z�ce���D�%�Sgv�d�
s�9Ƅ�GJcoM�K_3 �k�&-���q�����NU< ���m��eRh         N   x�3�tN�9�<���T���Ә3��(��Y��id 2
C�RK����F@AN���DN�>C ߔӹ45I F��� ql�         �  x�uU;rc1���d�(Q��un�͛��T�=S���SxE�y� P||%�d�r��}�Ɏ�� в�Y�����a��N�׷3�+�Aa�0hx������	��5w{��������� ���Ԕ����k.pi���8H�o�%������\���S�4���	tө�Y��i��X.�n<T���vi��w�"�����H+��&@yS����Z�h-����Za�ob���hɡ�NB����<�AxO^'Q]y��AB�k._�f$D�VI��7��y����!s�[�A"� �Щ�"�vl�9c	/$�%�c���+�}�x#*��NJ�o�I�kp��3듄:�H�� �{�pUBK��-핔ڻ{r�I��'.�>����IJ��/����(��3�g`6lc��Dk�cۻ�'����D�N���;&��e[��׉?b�2�,�D��]��&F��;��k:���Ej9�s���$�ö�z�90��H         �   x�3�tL����LD"�B����8�s2S�JR9��hgOW�W.cN�Ģ�D�\鐛�������ihdl1���¢�|��|l*L9��/����OD�76�0��bTR|x%PIq*B����\�9PIb^"Ȕ<$����Z��X���fB��H����U��qqq NtT�     