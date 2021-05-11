class SessionsController < ApplicationController
  before_action :require_login, only: %i[show destroy]

  def show
    render json: user_to_json
  end

  def create
    user = login(
      params[:email],
      params[:password],
      true,
    )

    if user
      render json: user_to_json
    else
      head :not_found
    end
  end

  def destroy
    invalidate_active_sessions! if params[:everywhere] == "true"
    logout
    form_authenticity_token

    render json: session[:_csrf_token]
  end

  private

  def user_to_json
    {
      id: current_user.id,
      email: current_user.email,
      name: current_user.name,
      role: current_user.role
    }
  end
end
