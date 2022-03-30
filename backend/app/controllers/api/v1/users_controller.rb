class Api::V1::UsersController < ApplicationController
    before_action :set_user, only: %i[show update]
    def index
        render json: { users: User.all.order("created_at DESC") }

    end
    def show
        product = Product.where(user_id: params[:id])
        render json: product
    end

    def update
        @user.name= user_params[:name]
        @user.profile = user_params[:profile]
        @user.image = user_params[:image] if user_params[:image] != ""
        if @user.save
            render json:{status: 200, user: @user}
        else
            render json:{status: 500, message: "更新に失敗しました"}
        end
    end
    private
        def set_user
            @user = User.find(params[:id])
        end

        def user_params
            params.permit(:name, :profile, :image)
        end


end
