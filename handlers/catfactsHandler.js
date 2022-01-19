'use strict'

import BaseHandler from './base.js';
import fetch from "node-fetch";
import config from '../config.js';
import db from '../configs/postgres.js';

/*
*
* Change to OOP functions to easy maintenance & debugging
*
* extends to BaseHandler to extend custom response.
*
* */
class CatFactHandler extends BaseHandler {

    /*
    *
    * Fetch Data From API
    *
    * */


   async getListFromAPI(req, res) {

     try {
         const path = '/facts';

         let result = [];

         const response = await fetch(`${config.source.url}${path}`, {
             compress: true,
             timeout: 60e3, // 60s timeout as default
             follow: 0,
             headers: {
                 'content-type': 'application/json'
             }
         })
             .then((res) => {
                 return res.json()
             })
             .then((jsonResponse) => {
                 result.push(jsonResponse)
             })
             .catch(err => {
                 return super.internalErrorResponse(res, 'Failed to fetch API', err)
             })

         // Return response from external API
         return super.successResponse(res, 'Data API Successfully Retrieved', result)
     } catch (err) {
         return super.internalErrorResponse(res, err.message, err)
     }
   }


    /*
    *
    * function for get list data from DB
    *
    * */

    async getListFromDB(req, res) {
        await db.getAllCatFact()
            .then((data) => {
                return super.successResponse(res, 'Data Successfully Retrieved',data.rows)
            }).catch((err) => {
                return super.internalErrorResponse(res, err.message)
            })
    }


   /*
   *
   *
   * function for insert data
   *
   * */

   async insertData(req, res) {

       try {
           let params = req.body.fact;

           if(params === undefined || params.length < 1) return super.badResponse(res, 'Parameter can not be empty')

           let findFacts = await db.findFacts([params.toString()]).then(result => result.rows).catch((err) => {
               return err.message;
           })

           if(findFacts.length !== 0) return super.resourceConflict(res,'Fact already inputed !');

           let date = new Date().toISOString().split('T')[0];
           let time = new Date().toLocaleString('en-US',{
               hour: '2-digit',
               hour12: false,
               minute:'2-digit',
               second:'2-digit'
           });

           let dateNow = `${date} ${time}`;
           let fieldValues = [params,dateNow,dateNow]

           await db.insertCatFact(fieldValues)
               .then((data) => {
                   return super.successResponse(res, 'Data Successfully Created')
               }).catch((err) => {
                   return super.internalErrorResponse(res, err.message)
               })
       } catch (e) {
           console.log(e)
       }
   }

   /*
   *
   *
   * function for update data
   *
   * */

   async updateData(req, res) {

       let id = req.params.id;
       let params = req.body;

       if(id === undefined) return super.badResponse(res, 'Parameter id can not be empty')

        let findId = await db.findCatFactById(id).then(result => result.rows)

       if(findId[0].id) {
           if(params.fact === undefined || params.fact.length < 1) return super.unprocessableEntityResponse(res, 'Parameter fact can not be empty')
           let date = new Date().toISOString().split('T')[0];
           let time = new Date().toLocaleString('en-US',{
               hour: '2-digit',
               hour12: false,
               minute:'2-digit',
               second:'2-digit'
           });

           let dateNow = `${date} ${time}`;

           let fieldValues = [params.fact,dateNow,findId[0].id]

           await db.updateCatFact(fieldValues)
               .then((data) => {
                   return super.successResponse(res, 'Data Successfully Updated')
               }).catch((err) => {
                   return super.internalErrorResponse(res, err.message)
               })
       } else {
           return super.notFoundResponse(res, 'cat fact not found')
       }
   }

   /*
   *
   * function for delete data
   *
   * */

   async deleteData(req, res) {
       let id = req.params.id;

       if(id === undefined) return super.badResponse(res, 'Parameter id can not be empty')

       let findId = await db.findCatFactById(id).then(result => result.rows)

       if(findId[0].id) {
            await db.deleteCatFact(findId[0].id)
                .then((data) => {
                    return super.successResponse(res, 'Data Successfully Deleted')
                }).catch((err) => {
                    return super.internalErrorResponse(res, err.message)
                })
       } else {
           return super.notFoundResponse(res, 'cat fact not found')
       }

   }

}

export default new CatFactHandler();

