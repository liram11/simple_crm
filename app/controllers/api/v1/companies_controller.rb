# frozen_string_literal: true

module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        companies = Company.includes(:deals).order(created_at: :desc)

        if filter_params[:company_name]
          companies = companies.where('companies.name LIKE LOWER(?)', "#{filter_params[:company_name]}%")
        end

        if filter_params[:industry]
          companies = companies.where('companies.industry LIKE LOWER(?)', "#{filter_params[:industry]}%")
        end

        if filter_params[:min_employee]
          companies = companies.where('companies.employee_count >= ?', filter_params[:min_employee])
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
