$(document).ready(function(){

//tooltip
  // $( function() {
  //     $( document ).tooltip({
  //       position: {
  //         my: "center bottom-20",
  //         at: "center top",
  //         using: function( position, feedback ) {
  //           $( this ).css( position );
  //           $( "<div>" )
  //             .addClass( "arrow" )
  //             .addClass( feedback.vertical )
  //             .addClass( feedback.horizontal )
  //             .appendTo( this );
  //         }
  //       }
  //     });
  //   } );


  var totalRow = null;
  var seatTotal = 30;
  for (var i = 0; i < seatTotal; i++) {
    $('.seats').append("<div class='iSeat " + 'seat'+ (i+1) + "'><img src='images/chair.png'></div>");
    $('.seat' + (i+1)).data('res', i+1);
    if (i%2 == 0) {
      $('.seat' + (i+1)).addClass('pop');
    } else {
      $('.seat' + (i+1)).addClass('corn');
    }
  }

  var resCount = 0
  $('.seats .iSeat').data('val', 0);
  $('.seats .iSeat').on('mouseenter', function() {
    $(this).fadeTo(0,.5);
  }).on('mouseleave', function() {
    $(this).fadeTo(0,1);
  }).click(function() {
      if($(this).data('val') == 1){
        $(this).find('img').attr("src", 'images/chair.png');
          $(this).data('val', 0);
          $(this).removeClass('reserve');
          resCount -= 1;
      } else if ($(this).data('val') == 0) {
          $(this).find('img').attr("src", 'images/chairGuy.png',);
          $(this).data('val', 1);
          $(this).addClass('reserve');
          resCount += 1;
      }
      if (resCount > 0 ) {
        $('.form').show();
      } else {
        $('.form').hide();
      };
  });

  $('#submit').on('click', function(){
    $('.reserve.pop').html("<img src='images/chairPop.png'>");
    $('.reserve.corn').html("<img src='images/chairCorn.png'>");
    $('.reserve').data('val', 2);
    $('.reserve').attr('title', $('#fname').val() + " " + $('#lname').val() + " has reserved this seat." );
    $('.reserve').removeClass('reserve');
    $('#fname').val(null);
    $('#lname').val(null);
    $('#email').val(null);
    $('#phone').val(null);
    $('.form').hide();
    resCount = 0;
  });

});
