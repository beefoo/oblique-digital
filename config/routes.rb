ObliqueDigital::Application.routes.draw do

  match 'nypl' => 'nypl#index', :as => :assets
  match 'strategies' => 'strategies#index', :as => :strategies
  
  root :to => 'home#index'

end
