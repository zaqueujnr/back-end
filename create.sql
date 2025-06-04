create table company (
	company_id uuid primary key,
	name text,
	cnpj text,
    email text,
    endereco text
);

create table work (
    work_id uuid primary key,
	description text,
	date_init timestamp,
	date_end timestamp,
	type_contract text,
	time text,
    company_id uuid,

    CONSTRAINT fk_company
        FOREIGN KEY (company_id)
        REFERENCES company(company_id)
        ON DELETE CASCADE
);

create table professional (
	professional_id uuid primary key,
	name text,
	email text,
	position text,
	salary numeric
);

INSERT INTO company (company_id, name, cnpj, email, endereco) VALUES
('e90f1f10-0001-4f10-aaaa-000000000001', 'Industria do Aco', '12345678000101', 'contato@aco.com', 'Rua Industrial 123 - Sao Paulo SP'),
('e90f1f10-0002-4f10-aaaa-000000000002', 'Metalurgica Forte', '98765432000122', 'contato@metalurgicaforte.com', 'Av Central 455 - Curitiba PR'),
('e90f1f10-0003-4f10-aaaa-000000000003', 'Fabrica de Maquinas', '23456789000133', 'suporte@fabrica.com', 'Praca das Maquinas 45 - Rio de Janeiro RJ'),
('e90f1f10-0004-4f10-aaaa-000000000004', 'Engenharia Pesada', '34567890000144', 'admin@engenhariapesada.com', 'Rua Construcao 89 - Porto Alegre RS'),
('e90f1f10-0005-4f10-aaaa-000000000005', 'Automacao Brasil', '45678901000155', 'vendas@automacaobrasil.com', 'Rua Tecnologia 512 - Belo Horizonte MG'),
('080c25de-72db-44d5-a027-14f4da7903e7', 'Industria do Aco', '12345678000101', 'contato@aco.com', 'Rua Industrial 123 - Sao Paulo SP'),
('ecbead35-2a5f-4a83-882f-ac6e6827c092', 'Metalurgica Forte', '98765432000122', 'contato@metalurgicaforte.com', 'Av Central 455 - Curitiba PR'),
('0a002d45-96e9-4e17-8fc8-273e0ae52cac', 'Fabrica de Maquinas', '23456789000133', 'suporte@fabrica.com', 'Praca das Maquinas 45 - Rio de Janeiro RJ');

INSERT INTO work (work_id, description, date_init, date_end, type_contract, time, company_id) VALUES
('aaaf1f10-0001-4f10-bbbb-000000000001', 'Soldador de estruturas metalicas', '2024-01-10', '2025-01-10', 'CLT', 'manha', 'e90f1f10-0001-4f10-aaaa-000000000001'),
('aaaf1f10-0002-4f10-bbbb-000000000002', 'Operador de torno mecanico', '2024-02-01', '2025-02-01', 'CLT', 'noturno', 'e90f1f10-0002-4f10-aaaa-000000000002'),
('aaaf1f10-0003-4f10-bbbb-000000000003', 'Montador de maquinas', '2024-03-15', '2024-09-15', 'Temporario', 'manha', 'e90f1f10-0003-4f10-aaaa-000000000003'),
('aaaf1f10-0004-4f10-bbbb-000000000004', 'Engenheiro Civil', '2024-01-01', '2026-01-01', 'PJ', 'integral', 'e90f1f10-0004-4f10-aaaa-000000000004'),
('855797eb-21b3-464e-84bb-33f7e16a95b1', 'Soldador de estruturas metalicas', '2024-01-10', '2025-01-10', 'CLT', 'manha', '080c25de-72db-44d5-a027-14f4da7903e7'),
('5273588b-d06f-4664-9463-4a31b698181d', 'Operador de torno mecanico', '2024-02-01', '2025-02-01', 'CLT', 'noturno', 'ecbead35-2a5f-4a83-882f-ac6e6827c092'),
('4e149fd3-0add-4ff9-9283-9849b629a03c', 'Montador de maquinas', '2024-03-15', '2024-09-15', 'Temporario', 'manha', '0a002d45-96e9-4e17-8fc8-273e0ae52cac'),
('aaaf1f10-0005-4f10-bbbb-000000000005', 'Tecnico em Automacao', '2024-04-01', '2025-04-01', 'CLT', 'manha', 'e90f1f10-0005-4f10-aaaa-000000000005');

INSERT INTO professional (professional_id, name, email, position, salary) VALUES
('6b8a72f5-9f5a-4c2e-9b43-4b5d6c898f01', 'Zaqueu Junior', 'zaqueu@gmail.com', 'CALDEREIRO', 20000.0),
('80f45dce-18d0-4c42-bef3-39c62c9b84f2', 'Felipe Junior', 'felipe@gmail.com', 'PINTOR', 20000.0),
('c228dfd5-901b-4789-9e68-3f14a87a8813', 'Matheus Junior', 'mat@gmail.com', 'AUTOMACAO', 20000.0),
('fc5a28ee-1c3e-4125-ae96-8ac1d598ee6a', 'Jorge Junior', 'jorg@gmail.com', 'ELETRICISTA', 20000.0),
('d4560982-421a-4b76-99db-3431d3c12e01', 'Amadeu Junior', 'amadeu@gmail.com', 'SEGURANCA DO TRABALHO', 20000.0),
('51cb165c-2b3e-4e71-b4b6-0f25e77517e6', 'Richard Junior', 'rich@gmail.com', 'PREPARADOR', 20000.0),
('b2b6a6f3-226b-4300-9db4-91b95e1b2428', 'Moises Junior', 'moisr@gmail.com', 'MECANICO 1', 20000.0),
('728f6708-6f8e-4c08-984e-d7f3e18bd40e', 'Diego Junior', 'diego@gmail.com', 'MECANICO 2', 20000.0),
('0a8e3f12-c5d2-4423-9611-eaa01288b505', 'Gabriel Junior', 'gabir@gmail.com', 'ENGENHEIRO CIVIL', 20000.0),
('358f5e68-5120-45dc-ae7e-f426c44cd7cf', 'Vitor Junior', 'vitor@gmail.com', 'ENGENHEIRO MECANICO', 20000.0),
('97b50a2d-62d1-4814-bf5e-1085cfeeb7a9', 'Fernando Junior', 'fernan@gmail.com', 'INSPETORS DE SOLDA', 20000.0),
('1fa491b1-0225-4c55-b88a-09c5040cb38f', 'Igor Junior', 'igr@gmail.com', 'ENGENHEIRO CIVIL', 20000.0),
('a99f8c5a-d44d-453c-a90c-4207355e0bcd', 'Bruno Junior', 'bruno@gmail.com', 'ENGENHEIRO CIVIL', 20000.0);

-- INSERT INTO company (company_id, name, cnpj, email, endereco) VALUES 
-- ('f1c25484-daa2-4df1-a10b-24fc491edfb1', 'Indústria do Aço', '12345678000101', 'contato@aco.com', 'Rua Industrial 123 - São Paulo SP'),
-- ('e4f819c0-4e2e-41ec-b5e5-3c22d7cf810e', 'Metalúrgica Brasil', '22345678000102', 'contato@metalbr.com', 'Av. das Indústrias 500 - Contagem MG'),
-- ('b3d3cc16-14a9-42f2-babc-772f1ab62f7f', 'Ferro Forte Ltda', '32345678000103', 'vendas@ferroforte.com.br', 'Rua do Aço 45 - Curitiba PR'),
-- ('bd442ac2-601e-44bc-a0e2-6b60de3e09c8', 'Aço Minas', '42345678000104', 'suporte@acominas.com.br', 'Av. Tiradentes 800 - Belo Horizonte MG'),
-- ('3a6e86c7-b540-4689-a765-12ed62a2f77c', 'Companhia do Ferro', '52345678000105', 'contato@compferro.com', 'Rua do Ferro 98 - Campinas SP'),
-- ('98ff71aa-dc93-4c7c-a3f7-d420f1a4ab67', 'Inox Brasil', '62345678000106', 'relacionamento@inoxbr.com', 'Rua das Máquinas 400 - Joinville SC'),
-- ('d2489862-57de-4dd1-86e8-536fc9fc92b0', 'Metal Total', '72345678000107', 'atendimento@metaltotal.com', 'Alameda Industrial 77 - Caxias do Sul RS'),
-- ('5f5c1036-3a9b-4d69-99cb-9405a47880ae', 'Aço Forte', '82345678000108', 'comercial@aco-forte.com', 'Rod. BR-101 Km 200 - Recife PE'),
-- ('d1c57a15-5a11-45ad-bbde-f3ef9ff2b4e1', 'Indústria Nord', '92345678000109', 'info@nordindustria.com', 'Rua Norte 12 - Natal RN'),
-- ('c4dbbe02-cdb1-4a8d-8a28-f29591ef5de6', 'Ferro e Cia', '10345678000110', 'ferro@ferroecia.com', 'Rua do Comércio 789 - Porto Alegre RS'),
-- ('09b1512c-7a4b-417a-850e-c53c31ac3c3f', 'MegaMetal', '11345678000111', 'contato@megametal.com', 'Av. Industrial 1590 - São José dos Campos SP'),
-- ('6f8ec3cb-8ae2-4033-9a20-860f8d0bb08b', 'Brasil Inox', '12345678000112', 'contato@brasilinox.com', 'Rua Central 100 - Salvador BA');
-- ('f315bce3-36c1-4db6-a1b3-37cde293af6c', 'Ferro Real Ltda', '13345678000113', 'ferro@ferroreal.com', 'Av. Real 88 - Goiânia GO');

-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Zaqueu Junior' ,'zaqueu@gmail.com', 'CALDEREIRO', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Felipe Junior' ,'felipe@gmail.com', 'PINTOR', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Matheus Junior' ,'mat@gmail.com', 'AUTOMACAO', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Jorge Junior' ,'jorg@gmail.com', 'ELETRICISTA', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Amadeu Junior' ,'amadeu@gmail.com', 'SEGURANCA DO TRABALHO', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Richard Junior' ,'rich@gmail.com', 'PREPARADOR', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Moises Junior' ,'moisr@gmail.com', 'MECANICO 1', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Diego Junior' ,'diego@gmail.com', 'MECANICO 2', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Gabriel Junior' ,'gabir@gmail.com', 'ENGENHEIRO CIVIL', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Vitor Junior' ,'vitor@gmail.com', 'ENGENHEIRO MECANICO', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Fernando Junior' ,'fernan@gmail.com', 'INSPETORS DE SOLDA', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Igor Junior' ,'igr@gmail.com', 'ENGENHEIRO CIVIL', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Bruno Junior' ,'bruno@gmail.com', 'ENGENHEIRO CIVIL', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Guilherme Junior' ,'guiva@gmail.com', 'ACESSO A CORDA', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Jorge Junior' ,'jorsge@gmail.com', 'ACESSO A CORDA', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Edson Junior' ,'edson@gmail.com', 'SERVICOS GERAIS', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Arthur Junior' ,'arthhur@gmail.com', 'AUTOMACAO', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Sander Junior' ,'sander@gmail.com', 'CARPINTEIRO', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Gabriel Junior' ,'gabriel@gmail.com', 'TECNOLOGIA DA INFORMACAO', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Batista Junior' ,'batista@gmail.com', 'PROGRAMADOR', 20000.0);
-- insert into professional (professional_id, name, email, position, salary) values (uuid_generate_v4(), 'Zaqueu Junior' ,'zaqus@gmail.com', 'PROGRAMADOR', 20000.0);

-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ACESSO A CORDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'CALDEREIRO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'PINTOR', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'SERVICOS GERAIS', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'AUTOMACAO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ELETRECISTA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'OPERADOR MAQUINA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'SEGURANCA DO TRABALHO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'PREPARADOR', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'MECANICO 1', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'MECANICO 2', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ENGENHEIRO CIVIL', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ENGENHEIRO MECANICO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ACESSO A CORDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'CALDEREIRO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'PINTOR', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'SERVICOS GERAIS', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'AUTOMACAO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ELETRECISTA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'OPERADOR MAQUINA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'SEGURANCA DO TRABALHO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'PREPARADOR', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'MECANICO 1', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'MECANICO 2', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ENGENHEIRO CIVIL', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ENGENHEIRO MECANICO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ACESSO A CORDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'CALDEREIRO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'PINTOR', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'SERVICOS GERAIS', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'AUTOMACAO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ELETRECISTA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'OPERADOR MAQUINA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'SEGURANCA DO TRABALHO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'PREPARADOR', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'MECANICO 1', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'MECANICO 2', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ENGENHEIRO CIVIL', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'ENGENHEIRO MECANICO', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');
-- insert into work (work_id,description, date_init, date_end, type_contract, time) values (uuid_generate_v4(),'INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');

-- INSERT INTO company (company_id, name, cnpj, email, endereco) VALUES
-- (uuid_generate_v4(), 'Industria do Aco', '12345678000101', 'contato@aco.com', 'Rua Industrial 123 - Sao Paulo SP'),
-- (uuid_generate_v4(), 'Metalurgica Forte', '98765432000122', 'contato@metalurgicaforte.com', 'Av Central 455 - Curitiba PR'),
-- (uuid_generate_v4(), 'Fabrica de Maquinas', '23456789000133', 'suporte@fabrica.com', 'Praca das Maquinas 45 - Rio de Janeiro RJ'),
-- (uuid_generate_v4(), 'Engenharia Pesada', '34567890000144', 'admin@engenhariapesada.com', 'Rua Construcao 89 - Porto Alegre RS'),
-- (uuid_generate_v4(), 'Automacao Brasil', '45678901000155', 'vendas@automacaobrasil.com', 'Rua Tecnologia 512 - Belo Horizonte MG'),
-- (uuid_generate_v4(), 'Industrias Unidas', '56789012000166', 'unidas@industrias.com', 'Alameda Producao 321 - Salvador BA'),
-- (uuid_generate_v4(), 'Construmetal', '67890123000177', 'contato@construmetal.com', 'Rua das Obras 77 - Campinas SP'),
-- (uuid_generate_v4(), 'Equipamentos Norte', '78901234000188', 'norte@equipamentos.com', 'Av Norte 88 - Fortaleza CE'),
-- (uuid_generate_v4(), 'Siderurgica Legal', '89012345000199', 'contato@siderurgicalegal.com', 'Rua do Ferro 999 - Recife PE'),
-- (uuid_generate_v4(), 'Industria Central', '90123456000110', 'central@industria.com', 'Centro Industrial 101 - Goiania GO'),
-- (uuid_generate_v4(), 'Fabrica de Motores', '11223344000111', 'motores@fabrica.com', 'Rua dos Motores 111 - Manaus AM'),
-- (uuid_generate_v4(), 'Equipamentos Industriais', '22334455000122', 'equipamentos@industriais.com', 'Rua Equipamentos 222 - Porto Velho RO'),
-- (uuid_generate_v4(), 'Construcao Pesada', '33445566000133', 'construcao@pesada.com', 'Av Obra Pesada 333 - Natal RN'),
-- (uuid_generate_v4(), 'Metal Forte', '44556677000144', 'contato@metalforte.com', 'Rua Aco Forte 444 - Aracaju SE'),
-- (uuid_generate_v4(), 'Producao Industrial', '55667788000155', 'producao@industrial.com', 'Rua Producao 555 - Palmas TO'),
-- (uuid_generate_v4(), 'Industrial Norte', '66778899000166', 'norte@industrial.com', 'Av Norte Industrial 666 - Boa Vista RR'),
-- (uuid_generate_v4(), 'Solucoes em Maquinas', '77889900000177', 'solucoes@maquinas.com', 'Rua Solucao 777 - Maceio AL'),
-- (uuid_generate_v4(), 'Fabricacao Pesada', '88990011000188', 'fabricacao@pesada.com', 'Rua Industria Pesada 888 - Florianopolis SC'),
-- (uuid_generate_v4(), 'Maquinas de Producao', '99001122000199', 'maquinas@producao.com', 'Av Producao 999 - Teresina PI'),
-- (uuid_generate_v4(), 'Servicos Industriais', '10111213000100', 'servicos@industriais.com', 'Rua dos Servicos 1000 - Vitoria ES'),
-- (uuid_generate_v4(), 'Produtos Metalicos', '11121314000111', 'produtos@metalicos.com', 'Av Metalurgica 1111 - Sao Luis MA'),
-- (uuid_generate_v4(), 'Engenharia de Metais', '12131415000122', 'engenharia@metais.com', 'Rua dos Metais 1222 - Belem PA'),
-- (uuid_generate_v4(), 'Automatizacao Industrial', '13141516000133', 'automatizacao@industrial.com', 'Rua dos Robos 1333 - Campo Grande MS'),
-- (uuid_generate_v4(), 'Fundicao Brasileira', '14151617000144', 'fundicao@brasileira.com', 'Rua Fundicao 1444 - Salvador BA'),
-- (uuid_generate_v4(), 'Manutencao Industrial', '15161718000155', 'manutencao@industrial.com', 'Av Manutencao 1555 - Recife PE');

-- INSERT INTO work (work_id, description, date_init, date_end, type_contract, time, company_id) VALUES
-- (uuid_generate_v4(), 'Soldador de estruturas metalicas', '2024-01-10', '2025-01-10', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Industria do Aco')),
-- (uuid_generate_v4(), 'Operador de torno mecanico', '2024-02-01', '2025-02-01', 'CLT', 'noturno', (SELECT company_id FROM company WHERE name = 'Metalurgica Forte')),
-- (uuid_generate_v4(), 'Montador de maquinas', '2024-03-15', '2024-09-15', 'Temporario', 'manha', (SELECT company_id FROM company WHERE name = 'Fabrica de Maquinas')),
-- (uuid_generate_v4(), 'Engenheiro Civil', '2024-01-01', '2026-01-01', 'PJ', 'integral', (SELECT company_id FROM company WHERE name = 'Engenharia Pesada')),
-- (uuid_generate_v4(), 'Tecnico em Automacao', '2024-04-01', '2025-04-01', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Automacao Brasil')),
-- (uuid_generate_v4(), 'Auxiliar de producao', '2024-05-10', '2025-05-10', 'CLT', 'noturno', (SELECT company_id FROM company WHERE name = 'Industrias Unidas')),
-- (uuid_generate_v4(), 'Engenheiro de Materiais', '2024-01-20', '2026-01-20', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Construmetal')),
-- (uuid_generate_v4(), 'Tecnico de manutencao', '2024-06-01', '2024-12-01', 'Temporario', 'integral', (SELECT company_id FROM company WHERE name = 'Equipamentos Norte')),
-- (uuid_generate_v4(), 'Analista de qualidade', '2024-02-15', '2025-02-15', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Siderurgica Legal')),
-- (uuid_generate_v4(), 'Supervisor de producao', '2024-03-01', '2025-03-01', 'CLT', 'integral', (SELECT company_id FROM company WHERE name = 'Industria Central')),

-- (uuid_generate_v4(), 'Mecanico de motores', '2024-04-15', '2025-04-15', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Fabrica de Motores')),
-- (uuid_generate_v4(), 'Montador industrial', '2024-05-01', '2026-05-01', 'PJ', 'integral', (SELECT company_id FROM company WHERE name = 'Equipamentos Industriais')),
-- (uuid_generate_v4(), 'Tecnico de seguranca', '2024-06-20', '2025-06-20', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Construcao Pesada')),
-- (uuid_generate_v4(), 'Soldador TIG', '2024-07-01', '2024-12-01', 'Temporario', 'noturno', (SELECT company_id FROM company WHERE name = 'Metal Forte')),
-- (uuid_generate_v4(), 'Operador de maquina CNC', '2024-08-10', '2025-08-10', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Producao Industrial')),
-- (uuid_generate_v4(), 'Inspetor de qualidade', '2024-09-01', '2025-09-01', 'CLT', 'integral', (SELECT company_id FROM company WHERE name = 'Industrial Norte')),
-- (uuid_generate_v4(), 'Projetista mecanico', '2024-10-01', '2025-10-01', 'PJ', 'manha', (SELECT company_id FROM company WHERE name = 'Solucoes em Maquinas')),
-- (uuid_generate_v4(), 'Engenheiro de producao', '2024-11-01', '2025-11-01', 'CLT', 'integral', (SELECT company_id FROM company WHERE name = 'Fabricacao Pesada')),
-- (uuid_generate_v4(), 'Operador de linha de producao', '2024-12-01', '2025-12-01', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Maquinas de Producao')),
-- (uuid_generate_v4(), 'Eletricista industrial', '2025-01-01', '2026-01-01', 'CLT', 'noturno', (SELECT company_id FROM company WHERE name = 'Servicos Industriais')),

-- (uuid_generate_v4(), 'Tecnico em metalurgia', '2025-02-01', '2026-02-01', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Produtos Metalicos')),
-- (uuid_generate_v4(), 'Engenheiro metalurgico', '2025-03-01', '2026-03-01', 'PJ', 'integral', (SELECT company_id FROM company WHERE name = 'Engenharia de Metais')),
-- (uuid_generate_v4(), 'Programador de CLP', '2025-04-01', '2026-04-01', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Automatizacao Industrial')),
-- (uuid_generate_v4(), 'Operador de fundicao', '2025-05-01', '2026-05-01', 'CLT', 'integral', (SELECT company_id FROM company WHERE name = 'Fundicao Brasileira')),
-- (uuid_generate_v4(), 'Tecnico em manutencao', '2025-06-01', '2026-06-01', 'CLT', 'manha', (SELECT company_id FROM company WHERE name = 'Manutencao Industrial'));

