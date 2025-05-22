import { Output } from "../../application/GetCompanies";
import GetWorks from "../../application/GetWorks";
import Work from "../../domain/Work";
import CompanyRepository from "../../infra/repository/CompanyRepository";
import WorkRepository from "../../infra/repository/WorkRepository";

let workRepository: WorkRepository;
let companyRepository: CompanyRepository;
let getWorksUseCase: GetWorks;
let wasCalledOnGet: any = undefined;
let wasCalledOnCompanyById: any[];
let mocks: any;

const resetFakeFlags = () => {
  wasCalledOnGet = undefined;
  wasCalledOnCompanyById = [];
};

beforeAll(() => {
  mocks = [
    {
      id: "f6e2bc91-28fc-4b3b-91b5-0c1d7851dc0a",
      description: "Operador em usina de óleo e gás",
      dateInit: new Date("2025-01-15T08:00:00.000Z"),
      dateEnd: new Date("2025-06-15T17:00:00.000Z"),
      typeContract: "CLT",
      time: "DIA",
      companyId: "7ec3a579-f5da-40ca-8b2f-935b39da5c67",
    },
    {
      id: "ad347b90-5c45-46d4-a679-16d492e38d52",
      description: "Técnico de manutenção offshore",
      dateInit: new Date("2024-11-01T07:30:00.000Z"),
      dateEnd: new Date("2025-02-28T18:00:00.000Z"),
      typeContract: "PJ",
      time: "NOITE",
      companyId: "7ec3a579-f5da-40ca-8b2f-935b39da5c69",
    },
  ];
});

beforeEach(() => {
  resetFakeFlags();
  workRepository = {
    saveWork: async (): Promise<any> => {},
    updateWork: async (): Promise<any> => {},
    getWorks: async ({
      filters = {},
      limit,
      page,
    }: {
      filters?: Record<string, any>;
      limit?: number;
      page?: number;
    } = {}): Promise<any> => {
      wasCalledOnGet = { filters, limit, page };

      const works = mocks.map(
        (work: any): Work =>
          new Work(
            work.id,
            work.description,
            work.dateInit,
            work.dateEnd,
            work.typeContract,
            work.time,
            work.companyId
          )
      );

      return { works, total: 2, totalPages: 1 };
    },
  } as WorkRepository;

  (companyRepository = {
    saveCompany: async (): Promise<void> => {},
    updateCompany: async (): Promise<void> => {},
    getCompanies: async (): Promise<any> => {},
    getCompanyById: async (id: string): Promise<any> => {
      wasCalledOnCompanyById.push(id);
    },
    existsByCNPJ: async (): Promise<any> => {},
    existsByEmail: async (): Promise<any> => {},
  } as CompanyRepository),
    (getWorksUseCase = new GetWorks(workRepository, companyRepository));
});

it("deve retornar todos os trabalhos", async () => {
  const result = await getWorksUseCase.execute();
  expect(wasCalledOnGet.filters).toEqual({});
  expect(wasCalledOnGet.limit).toBeUndefined();
  expect(wasCalledOnGet.page).toBeUndefined();
  expect(wasCalledOnCompanyById[0]).toBe(mocks[0].companyId);
  expect(wasCalledOnCompanyById[1]).toBe(mocks[1].companyId);
  expect(result.total).toBe(2);
  expect(result.totalPages).toBe(1);
  expect(result.works).toHaveLength(2);
});

it("deve aplicar filtro ao buscar trabalhos", async () => {
  const params = {
    filters: { keywords: "sdfs" },
  };

  const result = await getWorksUseCase.execute(params);
  expect(wasCalledOnGet.filters).toEqual(params.filters);
  expect(wasCalledOnGet.limit).toBeUndefined();
  expect(wasCalledOnGet.page).toBeUndefined();
  expect(wasCalledOnCompanyById[0]).toBe(mocks[0].companyId);
  expect(wasCalledOnCompanyById[1]).toBe(mocks[1].companyId);
  expect(result.total).toBe(2);
  expect(result.totalPages).toBe(1);
  expect(result.works).toHaveLength(2);
});

it("deve aplicar paginação ao buscar trabalhos", async () => {
  const result = await getWorksUseCase.execute({
    limit: 6,
    page: 1,
  });

  expect(wasCalledOnGet.limit).toBe(6);
  expect(wasCalledOnGet.page).toBe(1);
  expect(wasCalledOnCompanyById[0]).toBe(mocks[0].companyId);
  expect(wasCalledOnCompanyById[1]).toBe(mocks[1].companyId);
  expect(result.total).toBe(2);
  expect(result.totalPages).toBe(1);
  expect(result.works).toHaveLength(2);
});

it("deve aplicar paginação com filtro ao buscar trbalahos", async () => {
  const params = {
    filters: { keywords: "teste" },
    page: 1,
    limit: 6,
  };
  const result = await getWorksUseCase.execute(params);
  expect(wasCalledOnGet.filters).toEqual(params.filters);
  expect(wasCalledOnGet.limit).toBe(6);
  expect(wasCalledOnGet.page).toBe(1);
  expect(wasCalledOnCompanyById[0]).toBe(mocks[0].companyId);
  expect(wasCalledOnCompanyById[1]).toBe(mocks[1].companyId);

  expect(result.total).toBe(2);
  expect(result.totalPages).toBe(1);
  expect(result.works).toHaveLength(2);
});

it("deve retornar lista vazia se não houver trabalhos", async () => {
  workRepository.getWorks = async () => ({
    works: [],
    total: 0,
    totalPages: 0,
  });

  const result = await getWorksUseCase.execute();

  expect(result.works).toEqual([]);
  expect(result.total).toBe(0);
  expect(result.totalPages).toBe(0);
});
