# frozen_string_literal: true

require "faker"
desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    Rake::Task["db:schema:load"].invoke
    create_sample_site!
    create_sample_user!
    create_sample_categories!
    create_sample_drafted_articles!
    create_sample_published_articles!
    puts "sample data has been added."
  end
end

def create_sample_site!
  Site.create!(name: "Spinkart")
end

def create_sample_user!
  User.create!(name: "Oliver Smith", email: "oliver@example.com", site_id: Site.first.id)
end

def create_sample_categories!
  4.times do
    User.first.categories.create!(
      name: Faker::Lorem.word,
    )
  end
end

def create_sample_drafted_articles!
  Category.all.each do |category|
    User.first.articles.create!(
      title: Faker::Alphanumeric.alphanumeric(number: 10),
      body: Faker::Lorem.paragraph,
      category_id: category.id,
    )
  end
end

def create_sample_published_articles!
  Category.all.each do |category|
    User.first.articles.create!(
      title: Faker::Alphanumeric.alphanumeric(number: 10),
      body: Faker::Lorem.paragraph,
      status: "published",
      category_id: category.id,
    )
  end
end
