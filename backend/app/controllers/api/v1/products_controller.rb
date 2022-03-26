class Api::V1::ProductsController < ApplicationController
    # before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
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
        @product = Product.find(params[:id])
            @product.destroy
            render json: @product
        
    end

    
    def update
        @product = Product.find(params[:id])

            if @product.update(product_params)
                render json: @product
            else
                render json: @product.errors
            end

    end
    
    private 
        def product_params
            params.permit(:title, :image, :reason, :thoughts, :tech, :loadmap, :day, :commitment, :link, :github, :how)
        end
end
