# frozen_string_literal: true

class Deal < ApplicationRecord
  belongs_to :company

  self.per_page = 25
end
