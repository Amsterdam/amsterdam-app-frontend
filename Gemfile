source "https://rubygems.org"

ruby "~> " + File.read(File.join(__dir__, ".ruby-version")).strip.split(".").first(2).join(".")

gem "fastlane", "2.228.0"

group :iosAppBuildDependencies do
  # Exclude problematic versions of cocoapods and activesupport that causes build failures.
  gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
  gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
  gem 'xcodeproj', '< 1.26.0'
  gem 'concurrent-ruby', '< 1.3.4'
end