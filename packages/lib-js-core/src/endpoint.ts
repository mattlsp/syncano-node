import {RequestInit} from 'node-fetch'
import QueryBuilder from './query-builder'

export default class Endpoint extends QueryBuilder {
  /**
   * Send POST request to Syncano Endpoiint
   *
   * @param endpoint Endpoint path in format `socket-name/endpoint-name`. For example: `user-auth/register`.
   * @param [data={}] Data passed to endpoint.
   * @param [options={}] node-fetch options
   */
  public post (endpoint: string, body = {}, options = {}) {
    const fetch = this.fetch.bind(this)

    return fetch(this.url(endpoint), {
      body: this.parseBody(body),
      method: 'POST',
      ...options
    })
  }

  /**
   * Send GET request to Syncano Endpoiint
   *
   * @param endpoint Endpoint path in format `socket-name/endpoint-name`. For example: `user-auth/register`.
   * @param [data={}] Data passed to endpoint.
   * @param [options={}] node-fetch options
   */
  public get (endpoint: string, data: any = {}, options: RequestInit = {}) {
    return this.post(endpoint, {...data, _method: 'GET'}, options)
  }

  /**
   * Send DELETE request to Syncano Endpoiint
   *
   * @param endpoint Endpoint path in format `socket-name/endpoint-name`. For example: `user-auth/register`.
   * @param [data={}] Data passed to endpoint.
   * @param [options={}] node-fetch options
   */
  public delete (endpoint: string, data: any = {}, options: RequestInit = {}) {
    return this.post(endpoint, {...data, _method: 'DELETE'}, options)
  }

  /**
   * Send PUT request to Syncano Endpoiint
   *
   * @param endpoint Endpoint path in format `socket-name/endpoint-name`. For example: `user-auth/register`.
   * @param [data={}] Data passed to endpoint.
   * @param [options={}] node-fetch options
   */
  public put (endpoint: string, data: any = {}, options: RequestInit = {}) {
    return this.post(endpoint, {...data, _method: 'PUT'}, options)
  }

  /**
   * Send PATCH request to Syncano Endpoiint
   *
   * @param endpoint Endpoint path in format `socket-name/endpoint-name`. For example: `user-auth/register`.
   * @param [data={}] Data passed to endpoint.
   * @param [options={}] node-fetch options
   */
  public patch (endpoint: string, data: any = {}, options: RequestInit = {}) {
    return this.post(endpoint, {...data, _method: 'PATCH'}, options)
  }

  private url (endpoint: string) {
    const {instanceName, spaceHost} = this.instance

    return `https://${instanceName}.${spaceHost}/${endpoint}/`
  }

  private parseBody (body: any) {
    const isBodyAnObject = typeof body === 'object'

    return isBodyAnObject ? JSON.stringify({...body}) : body
  }
}