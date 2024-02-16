import qs from 'qs'

export const COMPANIES_URL = "/api/v1/companies";

export const fetchCompanies = async ({ companyName, industry, minEmployee, minDealAmount }, { signal }) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  try {
    const params = qs.stringify({
      filters: {
        company_name: companyName,
        industry,
        min_employee: minEmployee,
        min_deal_amount: minDealAmount,
      }
    });
    const res = await fetch(COMPANIES_URL + "?" + params, { signal });

    if (res.status !== 200 && res.status !== 304) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const companies = await res.json();

    return companies
  } catch (e) {
    // TODO: make error message better
    throw e
  }
};
