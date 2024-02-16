/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import { CompaniesTable } from "..";

const companies = [
  {
    "id": 10,
    "name": "Wisozk, Kshlerin and McCullough",
    "employee_count": 698,
    "industry": "Philanthropy",
    "created_at": "2024-02-16T09:05:57.179Z",
    "updated_at": "2024-02-16T09:05:57.179Z",
    "deals_sum": 776
  },
  {
    "id": 9,
    "name": "Cronin, Wilkinson and Brown",
    "employee_count": 698,
    "industry": "Museums and Institutions",
    "created_at": "2024-02-16T09:05:57.177Z",
    "updated_at": "2024-02-16T09:05:57.177Z",
    "deals_sum": 1161
  },
  {
    "id": 8,
    "name": "Fay and Sons",
    "employee_count": 89,
    "industry": "Think Tanks",
    "created_at": "2024-02-16T09:05:57.176Z",
    "updated_at": "2024-02-16T09:05:57.176Z",
    "deals_sum": 2819
  },
  {
    "id": 7,
    "name": "Wunsch LLC",
    "employee_count": 238,
    "industry": "Public Policy",
    "created_at": "2024-02-16T09:05:57.174Z",
    "updated_at": "2024-02-16T09:05:57.174Z",
    "deals_sum": 1243
  },
  {
    "id": 6,
    "name": "Gutmann and Sons",
    "employee_count": 48,
    "industry": "Glass, Ceramics & Concrete",
    "created_at": "2024-02-16T09:05:57.167Z",
    "updated_at": "2024-02-16T09:05:57.167Z",
    "deals_sum": 1205
  },
  {
    "id": 5,
    "name": "Hammes, Moen and Purdy",
    "employee_count": 398,
    "industry": "Research",
    "created_at": "2024-02-16T09:05:57.159Z",
    "updated_at": "2024-02-16T09:05:57.159Z",
    "deals_sum": 2298
  },
  {
    "id": 4,
    "name": "Hintz LLC",
    "employee_count": 245,
    "industry": "Public Safety",
    "created_at": "2024-02-16T09:05:57.142Z",
    "updated_at": "2024-02-16T09:05:57.142Z",
    "deals_sum": 730
  },
  {
    "id": 3,
    "name": "Greenholt Group",
    "employee_count": 27,
    "industry": "International Affairs",
    "created_at": "2024-02-16T09:05:57.140Z",
    "updated_at": "2024-02-16T09:05:57.140Z",
    "deals_sum": 2048
  },
  {
    "id": 2,
    "name": "Mohr and Sons",
    "employee_count": 594,
    "industry": "Consumer Services",
    "created_at": "2024-02-16T09:05:57.138Z",
    "updated_at": "2024-02-16T09:05:57.138Z",
    "deals_sum": 1004
  },
  {
    "id": 1,
    "name": "Jacobson-Hamill",
    "employee_count": 881,
    "industry": "Venture Capital & Private Equity",
    "created_at": "2024-02-16T09:05:57.136Z",
    "updated_at": "2024-02-16T09:05:57.136Z",
    "deals_sum": 2246
  }
];

// eslint-disable-next-line no-undef
it("renders correctly", () => {
  const tree = renderer
    .create(<CompaniesTable companies={companies} page={1} totalPages={2} onPageChange={() => {}} />)
    .toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
