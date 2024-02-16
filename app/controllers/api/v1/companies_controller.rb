# frozen_string_literal: true

module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        companies = Company.with_deals_sums.order(created_at: :desc)
        companies = filter_companies(companies)

        render json: companies,
               each_serializer: Api::V1::CompanySerializer
      end

      private

      # rubocop:disable Layout/LineLength, Metrics/AbcSize
      def filter_companies(companies)
        companies = companies.filter_by_name(filter_params[:company_name]) if filter_params[:company_name].present?
        companies = companies.filter_by_industry(filter_params[:industry]) if filter_params[:industry].present?
        companies = companies.filter_by_min_employee(filter_params[:min_employee]) if filter_params[:min_employee].present?
        companies = companies.filter_by_min_deal_amount(filter_params[:min_deal_amount]) if filter_params[:min_deal_amount].present?
        companies
      end
      # rubocop:enable Layout/LineLength, Metrics/AbcSize

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
