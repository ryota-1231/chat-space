date = Date.today
datetime = DateTime.now

json.content @message.content
json.image @message.image.url
json.date @message.created_at.to_s(:published_on)
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id
