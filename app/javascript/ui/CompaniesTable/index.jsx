import React from "react";

function CompaniesTable({ companies, page, totalPages, onPageChange }) {

  const handleNextPageClick = () => {
    if (page === totalPages) { return; }
    onPageChange(prev => prev + 1);
  };

  const handlePrevPageClick = () => {
    if (page === 1) { return; }
    onPageChange(prev => prev - 1);
  };

  if (!companies?.length) {
    return <></>;
  }

  return (
    <div>
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
  );
}

export default CompaniesTable;
