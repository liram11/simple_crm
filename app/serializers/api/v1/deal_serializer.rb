class Api::V1::DealSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :amount,
             :status,
             :company_id,
             :created_at,
             :updated_at
end
