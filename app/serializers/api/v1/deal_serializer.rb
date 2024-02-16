# frozen_string_literal: true

module Api
  module V1
    class DealSerializer < ActiveModel::Serializer
      attributes :id,
                 :name,
                 :amount,
                 :status,
                 :company_id,
                 :created_at,
                 :updated_at
    end
  end
end
