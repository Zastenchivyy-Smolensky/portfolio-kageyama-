class FavoritesController < ApplicationController
  def create
    favorite = current_user.favorites.build(product_id: params[:product_id])
    favorite.save
    render json:{status: 200, data: favorite}
  end

  def destroy
    favorite = Favorite.find_by(product_id :params[:product_id], user_id: current_user.id)
    favorite.destroy
    render json:{status: 200, data:facorite}
  end
end
