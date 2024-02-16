require  'rails_helper'

describe Api::V1::CompaniesController do
  describe 'index' do
    context '200' do
      let!(:deals) { create_list(:deal, 3) }

      it 'should return companies' do
        get :index

        expect(response.parsed_body.map { |el| el['id'] }.sort).to eq(deals.map(&:company_id).sort)
      end
    end
  end
end
