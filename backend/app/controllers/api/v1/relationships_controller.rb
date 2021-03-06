class Api::V1::RelationshipsController < ApplicationController
  def create
    follow = current_api_v1_user.active_relationships.build(follower_id: params[:user_id])
    if follow.save
      render json: {status: 200, relationships: follow}
    else
      render json: {status: 500, message:"作成に失敗しました"}
    end
  end
  
  def index
    render json: {
      status: 200,
      active_relationships: current_api_v1_user.active_relationships,  # 自分からのいいね
      passive_relationships: current_api_v1_user.passive_relationships # 相手からのいいね
    }
  end



  # def destroy
  #   follow = current_api_v1_user.active_relationships.build(follower_id: params[:user_id])
  #   if follow.destroy
  #     render json: {status: 200, follow: follow}
  #   else
  #     render json: {status: 500, message:"作成に失敗しました"}
  #   end
  # end

end
