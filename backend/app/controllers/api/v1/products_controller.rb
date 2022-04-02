class Api::V1::ProductsController < ApplicationController
    before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
    def index
        render json: { products: Product.all.order("created_at DESC") }
    end

    def show
        @product = Product.find(params[:id])
        render json: @product
    end

    def create
        @product = Product.new(product_params)  
        @product.save
        render json: @product
    end
    
    def destroy
        product = Product.find(params[:id])
        if current_api_v1_user.id == product.user_id
            product.destroy
            render json: @product    
        else
            render json: {message: "can not delete data"}, status: 422
        end
    end

    
    
    def update
        product = Product.find(params[:id])
        if current_api_v1_user.id == product.user_id
            if product.update(product_params)
                render json: product
            else
                render json: product.errors
            end
        else
            render json: {message: "can not update data"}, status: 422
        end
    end
    
    private 
        def product_params
            params.permit(:title, :image).merge(user_id: current_api_v1_user)
        end
end
