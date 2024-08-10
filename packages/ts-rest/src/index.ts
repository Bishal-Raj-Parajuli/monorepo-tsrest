import { initContract } from "@ts-rest/core";
import z from "zod";

const c = initContract();

const TodoSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
})

export type Todo = z.infer<typeof TodoSchema>;

export const contract = c.router(
   {
    todos:{
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
            pathParams: z.object({
                title: z.string().optional(), // optional is used to define title can also be a opational parameter
            }),
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
    }
   } 
)