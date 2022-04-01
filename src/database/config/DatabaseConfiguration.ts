import dotenv from 'dotenv';

import { DataSource } from 'typeorm';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class DatabaseConfiguration {
  private static INSTANCE: DatabaseConfiguration;

  private _dataSource: DataSource;

  get dataSource() {
    return this._dataSource;
  }

  public static getInstance(): DatabaseConfiguration {
    if (!DatabaseConfiguration.INSTANCE) {
      DatabaseConfiguration.INSTANCE = new DatabaseConfiguration();
    }

    return DatabaseConfiguration.INSTANCE;
  }

  public static getDataSourceInstance(): DataSource {
    return DatabaseConfiguration.getInstance().dataSource;
  }

  public static startConnection(): void {
    DatabaseConfiguration.getDataSourceInstance()
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch(err => {
        console.error('Error during Data Source initialization:', err);
      });
  }

  constructor() {
    this.inicializeDataSource();
  }

  private inicializeDataSource() {
    this._dataSource = new DataSource({
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT) || 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      migrations: [
        `${__dirname}/src/database/migrations/*.ts`,
        'src/database/migrations/*.ts',
        '../migrations/*.ts',
      ],
      entities: [
        'src/modules/cars/entities/*.ts',
        'src/modules/accounts/entities/*.ts',
      ],
    });
  }
}

export default DatabaseConfiguration;
