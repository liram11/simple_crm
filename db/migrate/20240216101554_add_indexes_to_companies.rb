# frozen_string_literal: true

class AddIndexesToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_index :companies, %i[name industry employee_count]
    add_index :companies, %i[industry employee_count]
    add_index :companies, :employee_count
  end
end
