$(function() {

  var search_list = $("#user-search-result");

  function  appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>

                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                  </div>
                </div>`

    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class='chat-group-user'>
                   <p>${ msg }</p>
                 </div>
                `
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();

      if (users.length !== 0)  {
         users.forEach(function(user){
           var documents = []
           var document = $(".user-search-remove").siblings('input')

          $(document).each(function(index,ele){
            documents.push(Number($(ele).val()));
          });

          if (!documents.includes(user.id)){
             appendUser(user);
          }
        });
       
      }
      else {
        appendErrMsgToHTML("一致する名前はありません");
      };
    })


    .fail(function(){
      alert('ユーザー検索に失敗しました')
     })

  });

$('.chat-group-form__field--right').on("click", ".user-search-add", function (e) {
  var id = $(e.target).data('user-id')
  var name = $(e.target).data('user-name')
  var addhtml = `<div class='chat-group-user'>
     <input name='group[user_ids][]' type='hidden' value="${id}">
       <p class='chat-group-user__name'>${name}</p>
       <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
     </div>`
  $("#user-add-result").append(addhtml);
  $(`.user-search-add[data-user-id=${id}]`).parent().remove();
  });

  $('.chat-group-form__field--right').on("click", ".user-search-remove", function (e) {
    var document = $(".user-search-remove").siblings('input');
    var id = $(document).attr("value");
    $(`input[value=${id}]`).parent().remove();
    })
});


