require  'rails_helper'

describe Api::V1::CompaniesController do
  describe 'index' do
    context '200' do
      let!(:deals) { create_list(:deal, 3) }

      it 'should return companies' do
        get :index

        expect(response.parsed_body['companies'].map { |el| el['id'] }.sort).to eq(deals.map(&:company_id).sort)
      end

      context 'filters' do
        let!(:company) { create(:company, name: 'Super Company 1', industry: 'Some industry', employee_count: 1200) }
        let!(:deal) { create(:deal, company:, amount: 200_000) }
        let!(:company2) { create(:company, name: 'Super Company 2') }
        let!(:deal2) { create(:deal, company: company2) }
        let(:company_filters) do
          {
            company_name: company.name,
            industry: company.industry[0...7],
            min_employee: 1200,
            min_deal_amount: 190_000
          }
        end

        it 'should filter by company name' do
          get :index, params: { format: :json, filters: { company_name: company.name } }

          expect(response.parsed_body['companies'].size).to eq(1)
        end

        it 'should filter by partial company name' do
          get :index, params: { format: :json, filters: { company_name: company.name[0..7] } }

          expect(response.parsed_body['companies'].size).to eq(2)
        end

        it 'should filter by industry' do
          get :index, params: { format: :json, filters: { industry: company.industry } }

          expect(response.parsed_body['companies'][0]['industry']).to eq(company.industry)
        end

        it 'should filter by partial industry' do
          get :index, params: { format: :json, filters: { industry: company.industry[0...7] } }

          expect(response.parsed_body['companies'][0]['industry']).to eq(company.industry)
        end

        it 'should filter by min employee count' do
          get :index, params: { format: :json, filters: { min_employee: 1200 } }

          expect(response.parsed_body['companies'].size).to eq(1)
        end

        it 'should filter by min deal amount' do
          get :index, params: { format: :json, filters: { min_deal_amount: 190_000 } }

          expect(response.parsed_body['companies'].size).to eq(1)
        end

        it 'should filter by name, indusry, min_employee and min_deal_amount simultaneously' do
          get :index, params: { format: :json, filters: company_filters }

          expect(response.parsed_body['companies'].size).to eq(1)
        end

        it 'should not return anything if name does not exist' do
          get :index, params: { format: :json, filters: company_filters.merge({ company_name: '000000000000' }) }

          expect(response.parsed_body['companies'].size).to eq(0)
        end

        it 'should not return anything if name does not exist' do
          get :index, params: { format: :json, filters: company_filters.merge({ industry: '000000000000000' }) }

          expect(response.parsed_body['companies'].size).to eq(0)
        end

        it 'should not return anything if min_deal_amount exceeds the maximum' do
          get :index, params: { format: :json, filters: company_filters.merge({ min_employee: 2000 }) }

          expect(response.parsed_body['companies'].size).to eq(0)
        end

        it 'should not return anything if min_deal_amount exceeds the maximum' do
          get :index, params: { format: :json, filters: company_filters.merge({ min_deal_amount: 210_000 }) }

          expect(response.parsed_body['companies'].size).to eq(0)
        end
      end
    end
  end
end
