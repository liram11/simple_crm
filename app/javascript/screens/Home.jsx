import React, { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { fetchCompanies } from "../utils/api";
import lodash from "lodash";

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

  const handleNextPageClick = () => {
    if (page === totalPages) { return; }
    setPage(prev => prev + 1);
  };

  const handlePrevPageClick = () => {
    if (page === 1) { return; }
    setPage(prev => prev - 1);
  };

  return (
    <div className="vw-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Companies</h1>

          <div className="filters">
            <Input id="company-name" label="Company Name" value={companyName} onChange={setCompanyName} />
            <Input id="industry" label="Industry" value={industry} onChange={setIndustry} />
            <Input id="min-employee" label="Minimum Employee Count" value={minEmployee} onChange={setMinEmployee} />
            <Input id="min-amount" label="Minimum Deal Amount" value={minDealAmount} onChange={setMinDealAmount} />
          </div>

          {
            error &&
            <div>
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          }

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Industry</th>
                <th scope="col">Employee Count</th>
                <th scope="col">Total Deal Amount</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.industry}</td>
                  <td>{company.employee_count}</td>
                  <td>{company.deals_sum}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 &&
            <div>
              <ul className="pagination">
                <li className="page-item"><span className="page-link disabled">Page: {page}</span></li>
                <li className="page-item"><a className="page-link" href="#" onClick={handlePrevPageClick}>Previous Page</a></li>
                <li className="page-item"><a className="page-link" href="#" onClick={handleNextPageClick}>Next Page</a></li>
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
