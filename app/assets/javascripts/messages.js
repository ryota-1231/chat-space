$(function(){

  function buildPost(message){
   
   if (message.image==null){
     var image =""
   } else {
    var image = `<img class="lower-message__image" src="${message.image}" width="193" height="130">`
   };
   
   if (message.content==null){
    var content =""
  } else {
    var content =`<p class="lower-message__content">${message.content}</p>`
  };

    var html =`<div class="message">
                <div class="upper-message">
                 <div class="upper-message__user-name">
                  ${message.name}
                 </div>
                 <div class="upper-message__date">
                  ${message.created_at}
                 </div>
                </div>
                 <div class="lower-message">
                  ${content}
                  ${image}
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
      var html = buildPost(message);
      $('.messages').append(html);
      $('#message_content').val('');
      
      $('body,html').animate({ scrollTop: $('.messages')[0].scrollHeight});
      return false;
      })

      
    .fail(function(){
     alert('メッセージを入力してください。')
    })

  })
});