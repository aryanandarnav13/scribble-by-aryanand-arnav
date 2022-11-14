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
  Category.create!(name: "Getting Started", position: 1, user_id: User.first.id)
  Article.create!(title: "Welcome to Spinkart", body: "This is the first article", status: "Publish", category_id: Category.first.id, user_id: User.first.id)
end
