-- drop table company;
-- drop table professional;
drop table work;

-- create table company (
-- 	company_id uuid primary key,
-- 	name text,
-- 	cnpj text,
--     email text,
--     endereco text
-- );

-- create table professional (
-- 	professional_id uuid primary key,
-- 	name text,
-- 	email text,
-- 	position text,
-- 	salary numeric
-- );

create table work (
	description text,
	date_init timestamp,
	date_end timestamp,
	type_contract text,
	time text
);


insert into work (description, date_init, date_end, type_contract, time) values ('ACESSO A CORDA', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('CALDEREIRO', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('PINTOR', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('SERVICOS GERAIS', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('AUTOMACAO', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('ELETRECISTA', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('OPERADOR MAQUINA', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('SEGURANCA DO TRABALHO', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('PREPARADOR', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('MECANICO 1', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('MECANICO 2', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('ENGENHEIRO CIVIL', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('ENGENHEIRO MECANICO', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');
insert into work (description, date_init, date_end, type_contract, time) values ('INSPETOR DE SOLDA', NOW(), NOW(), 'Temporario', 'Integral');
