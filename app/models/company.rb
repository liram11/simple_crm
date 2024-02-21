# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :deals, dependent: :destroy

  self.per_page = 25

  scope :with_deals_sums, lambda {
    joins(:deals).group('companies.id').select('companies.*, SUM(deals.amount) as deals_sum')
  }

  # filters
  scope :filter_by_name, ->(name) { where('companies.name LIKE LOWER(?)', "#{name}%") }
  scope :filter_by_industry, ->(industry) { where('companies.industry LIKE LOWER(?)', "#{industry}%") }
  scope :filter_by_min_employee, ->(min_employee) { where('companies.employee_count >= ?', min_employee) }
  scope :filter_by_min_deal_amount, ->(min_deal_amount) { with_deals_sums.having('deals_sum >= ?', min_deal_amount) }
end
