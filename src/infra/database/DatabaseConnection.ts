import pgp from "pg-promise";

export default interface DatabaseConnection {
    query (statement: string, params: any): Promise<any>;
    end (): Promise<void>;
}

class PgPromiseAdapter implements DatabaseConnection {
    private connection;
    
    constructor() {
        this.connection = pgp()("postgres://postgres:postgre@localhost:5432/api_tdd");
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params)
  }

  async end(): Promise<void> {
    return this.connection.$pool.end()
  }
}

const pgPromiseConnection = new PgPromiseAdapter()

export { pgPromiseConnection };