import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Pool({
    connectionString: process.env.DB_URI
});

client.connect()
    .catch(err => {
    return err;
});


class Query {

    async getAllCatFact() {
        return client.query('SELECT * FROM cat_facts ORDER BY updated_at DESC')
    }

    async insertCatFact(data) {

        return client.query(`INSERT INTO cat_facts(fact, created_at, updated_at) VALUES($1, $2, $3)`,data)

    }

    async findCatFactById(data) {
        return client.query(`SELECT * FROM cat_facts where id=${data}`)
    }

    async updateCatFact(data) {

        return client.query(`UPDATE cat_facts SET fact = $1 , updated_at = $2 where id = $3`, data);

    }

    async deleteCatFact(data) {

        return client.query(`DELETE FROM cat_facts where id=${data}`);

    }

    async getLastId() {

        return client.query(`SELECT * FROM cat_facts ORDER BY created_at DESC LIMIT 1`);

    }

    async findFacts(data) {

        return client.query(`SELECT * FROM cat_facts WHERE fact=$1`,data);

    }
}

export default new Query();