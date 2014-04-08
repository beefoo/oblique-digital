ObliqueDigital::Application.routes.draw do

  root :to => 'strategies#index'
  
  match 'nypl' => 'nypl#index', :as => :assets

end
