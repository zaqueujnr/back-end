drop table company;
drop table professional;
drop table work;

create table company (
	company_id uuid primary key,
	name text,
	cnpj text,
    email text,
    endereco text
);

create table professional (
	professional_id uuid primary key,
	name text,
	email text,
	position text,
	salary numeric
);

create table work (
	description text,
	date_init timestamp,
	date_end timestamp,
	type_contract text,
	time text
);


-- insert into company (company_id, name, email) values ('aa354842-59bf-42e6-be3a-6188dbb5fff8', 'DIAMANTE', 'diamante@gmail.com');
-- insert into professional (professional_id, name, position) values ('d5f5c6cb-bf69-4743-a288-dafed2517e38', 'Zaqueu Junior', 'Caldereiro');