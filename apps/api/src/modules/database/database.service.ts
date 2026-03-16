import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Pool, type PoolClient, type QueryResultRow } from "pg";

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
      })
    : null;

  async query<T extends QueryResultRow>(
    text: string,
    params: unknown[] = [],
  ): Promise<T[]> {
    if (!this.pool) {
      throw new Error("DATABASE_URL is not configured.");
    }

    const result = await this.pool.query<T>(text, params);
    return result.rows;
  }

  async withTransaction<T>(operation: (client: PoolClient) => Promise<T>) {
    if (!this.pool) {
      throw new Error("DATABASE_URL is not configured.");
    }

    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await operation(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async onModuleDestroy() {
    await this.pool?.end();
  }
}
