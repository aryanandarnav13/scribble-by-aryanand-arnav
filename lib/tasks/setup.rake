# frozen_string_literal: true

desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'

  Website.create!(name:'Spinkart', password: 'welcome1')
  User.create!(name:'Oliver Smith', email:'oliver@example', website_id: 1)
  Category.create(name:'Getting Started', user_id: 1)
end
