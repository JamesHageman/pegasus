Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/" => "appointments#record"
  get "/sandbox" => "appointments#sandbox"
  get "/symptoms" => "appointments#symptoms_grammar"
  get "/classify" => "appointments#classify"
end
