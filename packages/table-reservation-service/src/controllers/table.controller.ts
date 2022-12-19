// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
} from '@loopback/rest';


const tables: string[] = [
  '170 cm',
  '190 cm',
  '140x200 cm',
  '150x180 cm',
  '150x240 cm'
]

const TABLE_RESPONSE: ResponseObject = {
  description: 'Tables Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'TablesResponse',
        properties: {
          tables: {
             type: 'array',
             items: {
              type: 'string'
             }
          }
        },
      },
    },
  },
};

export class TableController {
 constructor() {}

  @get('/tables')
  @response(200, TABLE_RESPONSE)
  get(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return { tables };
  }
}
