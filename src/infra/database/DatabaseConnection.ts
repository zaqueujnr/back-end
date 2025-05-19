if (!process.env.SKIP_DOTENV) {
  const dotenv = require('dotenv');
  dotenv.config();
}

import pgp from "pg-promise";
export default interface DatabaseConnection {
    query (statement: string, params: any): Promise<any>;
    end (): Promise<void>;
}

export class PgPromiseAdapter implements DatabaseConnection {
    private connection;
    
    constructor() {
      if(!process.env.DATABASE_URL) throw new Error('')
      this.connection = pgp()(process.env.DATABASE_URL);
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params)
  }

  async end(): Promise<void> {
    return this.connection.$pool.end()
  }
}