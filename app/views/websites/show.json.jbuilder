# frozen_string_literal: true

json.website do
  json.extract! @website, :name
  json.has_password @website.password_digest ? true : false
end
