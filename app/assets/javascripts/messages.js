$(function(){

  

  function buildHTML(message){

      
    var content = message.content ? `${ message.content }` : "";
    var img  = message.image ? `<img class="lower-info__image" src="${ message.image }" width="193" height="140" >` : "";

    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                   <div class="upper-message__date">
                      ${message.date}
                   </div>
                   </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                          ${content}
                      </p>
                          ${img}
                    </div>
                </div>`
    return html;
    }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    $('.form__submit').removeAttr('data-disable-with');
    
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      })

      .done(function(message){
        var html = buildHTML(message);
        $('.messages').append(html);
        $('#new_message').get(0).reset();
        var a = document.documentElement;
        var y = a.scrollHeight - a.clientHeight;
        window.scroll(0, y);
        console.log("hoge");
        })

    .fail(function(){
     alert('メッセージを入力してください。')
    })
  })

     var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var url = 'api/messages#index {:format=>"json"}'
      var last_message_id = $('.message:last').data('id');
       if (jqxhr) {
          return;
      }
      jqxhr =  $.ajax({
        url:  url,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
  
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
    
      var insertHTML='';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            var a = document.documentElement;
            var y = a.scrollHeight - a.clientHeight;
            window.scroll(0, y);
            console.log("foge");
          });
        })

    .fail(function() {
     alert('error')
    });
  };
 };
 var jqxhr;setInterval(reloadMessages, 5000);
});

