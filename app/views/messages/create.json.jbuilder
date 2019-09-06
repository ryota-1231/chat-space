json.content @message.content
json.image @message.image.url
json.date @message.created_at.strftime("%Y/%m/%d (%a) %H:%M")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id
