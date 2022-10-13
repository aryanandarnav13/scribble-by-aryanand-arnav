# frozen_string_literal: true

json.site do
  json.extract! @site, :name
  json.has_password @site.password_digest ? true : false
end
