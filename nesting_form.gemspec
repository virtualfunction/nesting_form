$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'nesting_form/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |gem|
  gem.name        = 'nesting_form'
  gem.version     = NestingForm::VERSION
  gem.authors     = [ 'Jason Earl' ]
  gem.email       = [ 'jason@hybd.net' ]
  gem.homepage    = 'http://github.com/virtualfunction/nesting_form'
  gem.summary     = 'Nesting Form, dynamic nested forms in Rails'
  gem.description = 'Similar to the Ryan Bates Railscasts plugin'

  gem.files = 
    Dir['{lib}/**/*'] + 
    [ 'Rakefile', 'README.rdoc' ]

  # gem.files = `git ls-files`.split "\n"
  gem.executables = gem.files.map do |file| 
    $1 if file =~ /^bin\/(.*)/
  end.compact

  gem.add_dependency 'rails'
  gem.add_development_dependency 'simple_form'
end
