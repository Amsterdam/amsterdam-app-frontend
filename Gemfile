source "https://rubygems.org"

ruby "~> " + File.read(File.join(__dir__, ".ruby-version")).strip.split(".").first(2).join(".")

gem "fastlane", "2.224.0"

group :iosAppBuildDependencies do
  # Cocoapods 1.15 introduced a bug which break the build. We will remove the upper
  # bound in the template on Cocoapods with next React Native release.
  gem 'cocoapods', '>= 1.13', '< 1.15'
  gem 'activesupport', '>= 6.1.7.5', '< 7.1.0'
end