# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def pagination_dict(collection)
    {
      current_page: collection.current_page,
      # next_page: collection.next_page,
      # prev_page: collection.previous_page,
      total_pages: collection.total_pages,
      # total_count: collection.total_count
    }
  end
end
