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



