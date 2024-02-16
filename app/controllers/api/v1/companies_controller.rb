# frozen_string_literal: true

module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        companies = Company.with_deals_sums.page(params[:page]).order(created_at: :desc)
        companies = filter_companies(companies)

        render json: companies,
               each_serializer: Api::V1::CompanySerializer,
               meta: pagination_dict(companies),
               adapter: :json
      end

      private

      # rubocop:disable Metrics/AbcSize
      def filter_companies(companies)
        companies = companies.filter_by_name(filter_params[:company_name]) if filter_params[:company_name].present?
        companies = companies.filter_by_industry(filter_params[:industry]) if filter_params[:industry].present?

        if filter_params[:min_employee].present? && filter_params[:min_employee].to_i.is_a?(Integer)
          companies = companies.filter_by_min_employee(filter_params[:min_employee].to_i)
        end
        if filter_params[:min_deal_amount].present? && filter_params[:min_deal_amount].to_i.is_a?(Integer)
          companies = companies.filter_by_min_deal_amount(filter_params[:min_deal_amount].to_i)
        end
        companies
      end
      # rubocop:enable Metrics/AbcSize

      def filter_params
        params.fetch(:filters, {}).permit(
          :company_name,
          :industry,
          :min_employee,
          :min_deal_amount
        )
      end
    end
  end
end
