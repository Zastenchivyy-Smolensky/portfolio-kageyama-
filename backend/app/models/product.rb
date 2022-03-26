class Product < ApplicationRecord
    mount_uploader :image, ImageUploader

    # has_many :Favorites

    # def favorited_by?(user)
    #     favorite.where(user_id: user.id).exist?
    # end
end

