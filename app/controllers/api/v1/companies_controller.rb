# frozen_string_literal: true

module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        companies = Company.includes(:deals).order(created_at: :desc)

        companies = companies.filter_by_name(filter_params[:company_name]) if filter_params[:company_name].present?
        companies = companies.filter_by_industry(filter_params[:industry]) if filter_params[:industry].present?
        if filter_params[:min_employee].present?
          companies = companies.filter_by_min_employee(filter_params[:min_employee])
        end

        # if filter_params[:min_deal_amount]
        #   companies = companies.
        # end

        render json: companies.as_json(include: :deals)
      end

      private

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
