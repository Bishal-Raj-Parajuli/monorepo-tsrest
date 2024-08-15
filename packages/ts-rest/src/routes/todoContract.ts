import { initContract } from "@ts-rest/core";
import z from "zod";
import { TodoSchema } from "../schema";

const c = initContract();

export const todoContract = 
   {
    routes: c.router({
        create: {
            method: 'POST',
            path: '/todos',
            body: TodoSchema.omit({id: true}), // Omiting is excluding id properties
            responses: {
                201: TodoSchema
            }
        },
        getAll: {
            method: 'GET',
            path: '/todos',
            responses: {
                200: TodoSchema.array(),
            }
        },
        getOne: {
            method: 'GET',
            path: '/todos/:id',
            pathParams: z.object({
                id: z.coerce.number(), // coerce is used to validate the query parameters to be a number
            }),
            responses: {
                200: TodoSchema,
                404: z.object({
                    message: z.string(),
                })
            }
        },
        update: {
            method: 'PUT',
            path: '/todos/:id',
            body: TodoSchema.omit({id: true}).partial(), //partial hepls making the request may or my not have some properties
            pathParams: z.object({
                id: z.coerce.number(),
            }),
            responses: {
                200: TodoSchema,
                404: z.object({
                    message: z.string(),
                })
            }
        },
        delete: {
            method: 'DELETE',
            path: '/todos/:id',
            pathParams: z.object({
                id: z.coerce.number()
            }),
            body: z.any(),
            responses: {
                202: z.object({}),
                404: z.object({
                    message: z.string(),
                })
            }
        }
    })
}