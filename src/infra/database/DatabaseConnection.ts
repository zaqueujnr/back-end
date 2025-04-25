import pgp from "pg-promise";

export default interface DatabaseConnection {
    query (statement: string, params: any): Promise<any>;
    end (): Promise<void>;
}

class PgPromiseAdapter implements DatabaseConnection {
    private connection;
    
    constructor() {
      this.connection = pgp()("postgres://user:pass@db:5432/mydb");

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