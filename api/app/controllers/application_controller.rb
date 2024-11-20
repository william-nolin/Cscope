class ApplicationController < ActionController::API
  def current_repository
    @current_repository ||= Repository.find_by(id: params[:repository_id])
  end

  def render_repository_not_found
    render(json: { message: "repository does not exists." }, status: :not_found)
  end

  def start_date_filter
    DateTime.parse(params[:start_date])
  rescue
    nil
  end

  def end_date_filter
    DateTime.parse(params[:end_date])
  rescue
    nil
  end
end
