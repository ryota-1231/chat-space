class UsersController < ApplicationController


  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(20)
    respond_to do |format|
      format.html
      format.json
    end
  end



end
