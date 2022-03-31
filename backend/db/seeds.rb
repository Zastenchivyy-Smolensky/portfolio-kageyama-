# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(name: 'test1', email: 'test@example.com', password: 'password', password_confirmation: 'password')
User.create!(name: 'test2', email: 'test2@example.com', password: 'password', password_confirmation: 'password')

user1 = User.find(1)
Product.create!(title: "aaa", image: File.open("sample.jpg"), user: user1)
Product.create!(title: "aaa", image: File.open("sample.jpg"), user: user1)
