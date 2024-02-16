import React, { useEffect, useState } from "react";
import lodash from "lodash";

import { Input } from "../ui/Input";
import { Error } from "../ui/Error";
import { CompaniesTable } from "../ui/CompaniesTable";

import { fetchCompanies } from "../utils/api";


export default function Home() {
  // List of fetched companies
  const [companies, setCompanies] = useState([]);

  // Table filters
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [minEmployee, setMinEmployee] = useState("");
  const [minDealAmount, setMinDealAmount] = useState("");

  // Last error
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch companies from API
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const debouncedFetchCompanies = lodash.debounce(() => {
      setError("");

      fetchCompanies({
        companyName,
        industry,
        minEmployee,
        minDealAmount,
        page
      }, { signal })
        .then((res) => {
          setCompanies(res.companies);
          setTotalPages(res.meta.total_pages);
        })
        .catch((e) => {
          if (e.name === "AbortError") { return; }
          setError(e.message);
        });
    }, 400);

    debouncedFetchCompanies();

    return () => {
      controller.abort();
    };
  }, [companyName, industry, minEmployee, minDealAmount, page]);

  return (
    <div className="vw-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron vw-100 jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Companies</h1>

          <div className="filters">
            <Input id="company-name" label="Company Name" value={companyName} onChange={setCompanyName} />
            <Input id="industry" label="Industry" value={industry} onChange={setIndustry} />
            <Input id="min-employee" type="number" label="Minimum Employee Count" value={minEmployee} onChange={setMinEmployee} />
            <Input id="min-amount" type="number" label="Minimum Deal Amount" value={minDealAmount} onChange={setMinDealAmount} />
          </div>

          <Error message={error} />

          <CompaniesTable
            companies={companies}
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
