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
    $('.seats').append("<div class='iSeat " + 'seat'+ (i+1) + "'><img src='images/static.png'></div>");
    $('.seat' + (i+1)).data('res', i+1);
  }

  var resCount = 0
  $('.seats .iSeat').data('val', 0);
  $('.seats .iSeat').on('mouseenter', function() {
    $(this).fadeTo(0,.5);
  }).on('mouseleave', function() {
    $(this).fadeTo(0,1);
  }).click(function() {
      if($(this).data('val') == 1){
        $(this).find('img').attr("src", 'images/static.png');
          $(this).data('val', 0);
          $(this).removeClass('reserve');
          resCount -= 1;
      } else if ($(this).data('val') == 0) {
          $(this).find('img').attr("src", 'images/click.png',);
          $(this).data('val', 1);
          $(this).addClass('reserve');
          resCount += 1;
      }
      console.log(resCount);
  });
  $('#rBtn').on('click', function(){
    $('.reserve').html("<img src='images/reserved.png'>");
    $('.reserve').data('val', 2);
    // $('.reserve').attr('title', "This spot is reserved for ");
    // console.log($('.reserve').data('res'));
});
});
