# frozen_string_literal: true

module Api
  module V1
    class CompanySerializer < ActiveModel::Serializer
      attributes :id,
                 :name,
                 :employee_count,
                 :industry,
                 :created_at,
                 :updated_at,
                 :deals_sum

      # has_many :deals,
      #          serializer: Api::V1::DealSerializer

      def deals_sum
        object&.deals_sum
      end
    end
  end
end
