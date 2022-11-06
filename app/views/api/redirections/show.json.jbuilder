# frozen_string_literal: true

json.redirection do
  json.extract! @redirection, :topath, :frompath
end
