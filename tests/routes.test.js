
import app from '../index.js';
import supertest from "supertest";
import db from '../configs/postgres.js';


describe('Post Endpoints', () => {

    it('Endpoint Get Cats Fact From API', async () => {
        let timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const res = await supertest(app)
            .get('/api/getListCats')
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe('Data API Successfully Retrieved')
    });

    it('Endpoint Add Cats Fact', async () => {

        let date = new Date().toISOString().split('T')[0];
        let time = new Date().toLocaleString('en-US',{
            hour: '2-digit',
            hour12: false,
            minute:'2-digit',
            second:'2-digit'
        });

        let dateNow = `${date} ${time}`;

        const res = await supertest(app)
            .post('/api/add-fact-cats')
            .send({
                fact: 'fact cats',
                created_at: dateNow,
                updated_at: dateNow
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe('Data Successfully Created')
    });

    it('Endpoint Update Cats Fact', async () => {

        let date = new Date().toISOString().split('T')[0];
        let time = new Date().toLocaleString('en-US',{
            hour: '2-digit',
            hour12: false,
            minute:'2-digit',
            second:'2-digit'
        });

        let dateNow = `${date} ${time}`;

        let getLastId = await db.getLastId().then(result => result.rows)

        const res = await supertest(app)
            .put(`/api/update-fact-cats/${getLastId[0].id}`)
            .send({
                fact: 'fact cats',
                updated_at: dateNow
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe('Data Successfully Updated')
    });

    it('Endpoint Delete Cats Fact', async () => {
        let timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        let getLastId = await db.getLastId().then(result => result.rows)

        const res = await supertest(app)
            .delete(`/api/delete-fact-cats/${getLastId[0].id}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe('Data Successfully Deleted')
    });


    it('Endpoint Get Cats Fact From Database', async () => {

        const res = await supertest(app)
            .get('/api/getCatFacts');
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe('Data Successfully Retrieved')
    });


})