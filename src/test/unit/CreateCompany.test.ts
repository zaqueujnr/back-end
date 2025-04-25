import createCompany from "../../application/CreateCompany";
import CompanyRepository from "../../infra/repository/CompanyRepository";
import Email from "../../domain/Email";

    let companyRepository: jest.Mocked<CompanyRepository>;
    let createCompanyUseCase: createCompany;

    beforeEach(() => {
        companyRepository = {
            saveCompany: jest.fn(),
            updateCompany: jest.fn(),
            getCompanies: jest.fn(),
            existsByCNPJ: jest.fn().mockResolvedValue(false),
            existsByEmail: jest.fn().mockResolvedValue(false),
        } as jest.Mocked<CompanyRepository>;

        createCompanyUseCase = new createCompany(companyRepository);
    });

    it("deve salvar uma empresa com sucesso", async () => {

        const input = {
            name: "Empresa Teste",
            cnpj: "12345678000100",
            email: "empresa@teste.com",
            endereco: "Rua Principal, 123"
        };

        await createCompanyUseCase.execute(input);

        expect(companyRepository.existsByCNPJ).toHaveBeenCalledWith(input.cnpj)
        expect(companyRepository.saveCompany).toHaveBeenCalledWith(
            expect.objectContaining({
                name: input.name,
                cnpj: input.cnpj,
                email: new Email(input.email),
                endereco: input.endereco,
            })
        );
    });

    it("deve lançar um erro ao salvar com CNPJ inválido", async () => {
    
        const input = {
            name: "Empresa Teste",
            cnpj: "invalido",
            email: "empresa@teste.com",
            endereco: "Rua Principal, 123"
        };

        await expect(createCompanyUseCase.execute(input)).rejects.toThrow("O CNPJ é inválido")
        expect(companyRepository.saveCompany).not.toHaveBeenCalled()
    })

    it("deve lançar um erro ao salvar uma empresa com nome inválido", async () => {
        const input = {
            name: "",
            cnpj: "12345678000100",
            email: "empresa@teste.com",
            endereco: "Rua Principal, 123"
        };

        await expect(createCompanyUseCase.execute(input)).rejects.toThrow("O nome é obrigatório")
        expect(companyRepository.saveCompany).not.toHaveBeenCalled()

    })

    it("deve lançar erro ao salvar um email vazio", async () => {
        const input = {
            name: "Sul Service Eng",
            cnpj: "12345678000100",
            email: "",
            endereco: "Rua Principal, 123"
        };

        await expect(createCompanyUseCase.execute(input)).rejects.toThrow("O email é obrigatório")
        expect(companyRepository.saveCompany).not.toHaveBeenCalled()

    })

    it("deve lançar erro ao salvar um email inválido", async () => {
        const input = {
            name: "Sul Service Eng",
            cnpj: "12345678000100",
            email: "empresateste.com",
            endereco: "Rua Principal, 123"
        };

        await expect(createCompanyUseCase.execute(input)).rejects.toThrow("O email é inválido")
        expect(companyRepository.saveCompany).not.toHaveBeenCalled()

    })

    it("deve lançar erro ao tentar salvar empresa com email duplicado", async () => {
        companyRepository.existsByEmail.mockResolvedValue(true);

        const input = {
            name: "Sul Service Eng",
            cnpj: "12345678000100",
            email: "empresa@teste.com",
            endereco: "teste"
        }

        await expect(createCompanyUseCase.execute(input)).rejects.toThrow("Email já está cadastrado")

        expect(companyRepository.existsByEmail).toHaveBeenCalledWith(input.email)

        expect(companyRepository.saveCompany).not.toHaveBeenCalled()
    })
    
    it("deve lançar erro ao salvar empresa com endereco vazio", async () => {
        const input = {
            name: "Sul Service Eng",
            cnpj: "12345678000100",
            email: "empresa@teste.com",
            endereco: ""
        }

        await expect(createCompanyUseCase.execute(input)).rejects.toThrow("O endereço é obrigatório")
        expect(companyRepository.saveCompany).not.toHaveBeenCalled()
    })

    it("deve lançar erro ao tentar salvar empresa com cnpj duplicado", async () => {
        companyRepository.existsByCNPJ.mockResolvedValue(true);

        const input = {
            name: "Sul Service Eng",
            cnpj: "12345678000100",
            email: "empresa@teste.com",
            endereco: ""
        }

        await expect(createCompanyUseCase.execute(input)).rejects.toThrow("CNPJ já está cadastrado")

        expect(companyRepository.existsByCNPJ).toHaveBeenCalledWith(input.cnpj)

        expect(companyRepository.saveCompany).not.toHaveBeenCalled()
    })
    

