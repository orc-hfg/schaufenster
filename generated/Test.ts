/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Test<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name ExceptionList
   * @request GET:/test/exception
   */
  exceptionList = (params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/test/exception`,
      method: "GET",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @name GetTest
   * @request GET:/test/ok
   */
  getTest = (params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/test/ok`,
      method: "GET",
      type: ContentType.Json,
      ...params,
    });
}
