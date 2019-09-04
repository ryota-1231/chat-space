$(function(){

  function buildPost(message){
   
     var image = ((message.image==null)? ' ':`<img class="lower-message__image" src="${message.image}" width="193" height="130">`);

     var content = (message.content==null)? ' ':`<p class="lower-message__content">${message.content}</p>`
   
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
      $('#message_content').get(0).reset();
      
      $('body,html').animate({ scrollTop: $('.messages')[0].scrollHeight});
      return false;
      })

      
    .fail(function(){
     alert('メッセージを入力してください。')
    })

  })
});