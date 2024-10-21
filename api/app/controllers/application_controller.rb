class ApplicationController < ActionController::API
  def current_repository
    @current_repository ||= Repository.find_by(id: params[:repository_id])
  end

  def render_repository_not_found
    render(json: { message: "repository does not exists." }, status: :not_found)
  end
end
