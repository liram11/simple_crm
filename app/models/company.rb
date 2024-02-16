# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :deals, dependent: :destroy

  # filters
  scope :filter_by_name, ->(name) { where('companies.name LIKE LOWER(?)', "#{name}%") }
  scope :filter_by_industry, ->(industry) { where('companies.industry LIKE LOWER(?)', "#{industry}%") }
  scope :filter_by_min_employee, ->(min_employee) { where('companies.employee_count >= ?', min_employee) }
end
