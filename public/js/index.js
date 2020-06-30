$(function () {
  function rewriteComments(user_id, data) {
    $('#chat-content').empty();
    $.each(data, function(){
      contents = '<div class="media media-chat';
      if(user_id == this.user_id) {
        contents += ' media-chat-reverse';
      }
      contents += '">';
      contents += '<div class="media-body">';
      if(this.text) {
        contents += '<p>' + this.text + '</p>';
      }
      if(this.image_path) {
        contents += '<p><img src="' + this.image_path + '" alt="image"></p>';
      }
      contents += '<p class="meta">';
      if(user_id == this.user_id) {
        contents += '自分';
      }else{
        contents += this.user_name;
      }
      switch(this.sentiment) {
        case 'POSITIVE':
          contents += ' &#x1f601;';
          break;
        case 'NEUTRAL':
          contents += ' &#x1f611;';
          break;
        case 'MIXED':
          contents += ' &#x1f635;';
          break;
        case 'NEGATIVE':
          contents += ' &#x1f62c;';
          break;
      }
      contents += ' <time>' + this.comment_created_at + '</time></p></div></div>';
      $('#chat-content').append(contents);
    });
  }

  $("#btn-send").on('click', function(e) {
    e.preventDefault();

    var fd = new FormData($('#form-comment').get(0));
    if(fd.get('text') === "" && fd.get('file').size == 0){
      return false;
    }
    $.ajax({
      url: '/comment',
      type: 'post',
      data: fd,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'html'
    }).done(function(data) {
      var json_data = JSON.parse(data);
      if(json_data.status == "error") {
        $('#flash').html(
          '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          json_data.message +
          '</div>'
        )
      }else{
        rewriteComments(json_data.user_id, json_data.comments);
      }
    }).fail(function(data) {
    }).always(function(data) {
      $('#text').val("");
      $('#file').val("");
    });
    return false;
  });

  setInterval(function() {
    $.ajax({
      url: '/comment',
      type: 'get',
      dataType: 'json'
    }).done(function(data) {
      rewriteComments(data.user_id, data.comments);
    }).fail(function(data) {
    }).always(function(data) {
    });
  }, 3000);
});
