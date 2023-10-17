source "https://rubygems.org"

ruby "~> " + File.read(File.join(__dir__, ".ruby-version")).strip.split(".").first(2).join(".")

gem "fastlane", "2.216.0"

group :iosAppBuildDependencies do
  gem "cocoapods", "1.13"
  gem 'activesupport', '>= 6.1.7.3', '< 7.1.0'
end