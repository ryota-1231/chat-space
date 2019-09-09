class UsersController < ApplicationController


  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user)
    
    respond_to do |format|
      format.html
      format.json
    end
  end

end
