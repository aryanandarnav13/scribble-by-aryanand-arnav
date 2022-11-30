# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    Rake::Task["db:schema:load"].invoke
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts "Seeding with sample data..."
  Site.create!(name: "Spinkart", password: "welcome1", password_enabled: true)
  User.create!(name:'Oliver Smith', email:'oliver@example.com', site_id: Site.first.id)
  categories = YAML.load_file("lib/assets/categories.yml")
  categories.each do |category|
    User.first.categories.create!(category)
  end
  articles = YAML.load_file("lib/assets/articles.yml")
  articles.each do |article|
    article["category_id"] = Category.first.id
    User.first.articles.create!(article)
  end
end
