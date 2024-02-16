import React, { useEffect, useState } from "react";
import { Input } from "../ui/Input";

export default function Home() {
  // List of fetched companies
  const [companies, setCompanies] = useState([]);

  // Table filters
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [minEmployee, setMinEmployee] = useState("");
  const [minimumDealAmount, setMinimumDealAmount] = useState("");

  // Fetch companies from API
  useEffect(() => {
    const url = "/api/v1/companies";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => setCompanies(res));
  }, []);

  return (
    <div className="vw-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Companies</h1>

          <div className="filters">
            <Input id="company-name" label="Company Name" value={companyName} onChange={setCompanyName} />
            <Input id="industry" label="Industry" value={industry} onChange={setIndustry} />
            <Input id="min-employee" label="Minimum Employee Count" value={minEmployee} onChange={setMinEmployee} />
            <Input id="min-amount" label="Minimum Deal Amount" value={minimumDealAmount} onChange={setMinimumDealAmount} />
          </div>

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
        </div>
      </div>
    </div>
  );
};
