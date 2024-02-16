statuses = ["pending", "won", "lost"]

FactoryBot.define do
  factory :deal do
    company

    name { "Deal #{company.id}" }
    status { statuses.sample }
    amount { rand(10..1000) }
  end
end
