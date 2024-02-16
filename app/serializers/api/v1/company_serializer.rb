class Api::V1::CompanySerializer < ActiveModel::Serializer
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
