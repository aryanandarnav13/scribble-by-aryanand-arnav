json.redirections @redirections do |redirection|
  json.extract! redirection, :id, :frompath, :topath
end
