import {expect, test} from '@jest/globals';
import supertest from 'supertest';
import app from '../app.js'
import {pool} from "../db/index"


describe ('GET /items', () => {
    test('testing get route handler', async function () {
        const response = await supertest(app)
        .get('/items')
        .set('Accept', 'application/json')
        expect(response.status).toStrictEqual(200)
        expect(response.body).toStrictEqual({
            success: true,
            payload: expect.any(Array)

        })
        const result=response.body.payload 
        console.log(result)
        for(let i=0; i< result.length; i++){
            expect(result[i]).toEqual({
                id: expect.any(Number),
                item : expect.any(String),
                completed: expect.anything()
            })

        }
        
    })
    
})

afterAll(async function(){
    await pool.end();
})

