json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.date @message.created_at.to_s(:published_on)
  json.user_name message.user.name
  json.id message.id
  end