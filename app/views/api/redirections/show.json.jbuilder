# frozen_string_literal: true

json.redirection do
  json.extract! @redirection, :to, :from
end
