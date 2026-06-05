import { Employee } from './employee';

export interface PagedEmployeeResponse {

  employees: Employee[];

  totalCount: number;

  page: number;

  pageSize: number;

}