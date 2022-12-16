# frozen_string_literal: true

class SeedService
  def process
    Rake::Task["db:schema:load"].invoke
    create_sample_site!
    create_sample_user!
    create_sample_categories!
    create_sample_drafted_articles!
    create_sample_published_articles!
  end

  private

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
end
