# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  mount_uploader :image, ImageUploader
  

  has_many :following, class_name: "Relationship", foreign_key: :following_id, dependent: :destroy
  has_many :follower, class_name: "Relationship", foreign_key: :follower_id, dependent: :destroy
  has_many :active_relationships, through: :following, source: :follower  # 自分からのいいね
  has_many :passive_relationships, through: :follower, source: :following # 相手からのいいね

end
