$(document).ready(function(){


  $('.toolTip').tooltip({
              tooltipClass: "tooltip-styling"
          });
// // tooltip
//   $( function() {
//
//     //tooltip plugin
//       $( document ).tooltip({
//         position: {
//           my: "center bottom-20",
//           at: "center top",
//           using: function( position, feedback ) {
//             $( this ).css( position );
//             $( "<div>" )
//               .addClass( "arrow" )
//               .addClass( feedback.vertical )
//               .addClass( feedback.horizontal )
//               .appendTo( this );
//           }
//         }
//       });
//     } );

    //creates array to hold customer info by seat
  var customerArray = [];

  //seat content append
  var totalRow = null;
  var seatTotal = 30;
  for (var i = 0; i < seatTotal; i++) {
    $('.seats').append("<div class='iSeat " + 'seat'+ (i+1) + "'><img src='images/chair.png'></div>");
    $('.seat' + (i+1)).data('res', i+1);
  };


  //seat click function
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
          $(this).find('img').attr("src", 'images/chairClick.png',);
          $(this).data('val', 1);
          $(this).addClass('reserve');
          resCount += 1;
      }

      //show or hide form on seat selection
      if (resCount > 0 ) {
        // $('.form').show();
        $('#leftCurtain').animate({
          width: '10%'
        }, 1000);

        $('#rightCurtain').animate({
          width: '10%'
        }, 1000);


      } else {

        $('#leftCurtain').animate({
          width: '600px'
        }, 1000);

        $('#rightCurtain').animate({
          width: '600px'
        }, 1000);
        // $('.form').hide();




      };
  });

  //checkbox for concessions
  $('#submit').before('<input class="radio" type="checkbox" id="soda" value='+1+'>Soda');
  $('#submit').before('<input class="radio" type="checkbox" id="popcorn" value='+2+'>Popcorn');
  var sodaCount = 0;
  var cornCount = 0;
  $('#soda').on('click', function(){
    if (sodaCount===1) {
      sodaCount -= 1;
    } else {
      sodaCount += 1;
    }
  });
  $('#popcorn').on('click', function(){
    if (cornCount===1) {
      cornCount -= 1;
    } else {
      cornCount += 1;
    }
  });

  //initialize array to loop through form validation
  var validArray = ['fname','lname','email','phone'];

  $('#submit').on('click', function(event){

    //form validation
    validArray.forEach(function(x) {
      if ($('#' + x).val() != '') {
        $('#' + x).removeData('submit');
        $('#' + x).prev('span').html('');
      } else if ($('#' + x).data('submit') === 1) {
        console.log('try');
      } else if ($('#' + x).val() === '') {
        $('#' + x).data('submit', 1);
        $('#' + x).before('<span class="validate">(Please enter field below)</span>');
      };
    });
    if ($('#fname').data('submit') === 1 || $('#lname').data('submit') === 1 || $('#email').data('submit') === 1 || $('#phone').data('submit') === 1) {
      return;
    };

    // concessions claim adding total
    var checkout = cornCount + sodaCount;
    var claim = null;
    if (cornCount === 1 && checkout === 1) {
      $('.reserve').html("<img src='images/chairCorn.png'>");
      claim = 'Popcorn';
    } else if (sodaCount === 1 && checkout === 1) {
      $('.reserve').html("<img src='images/chairPop.png'>");
      claim = 'Pop';
    } else if (checkout === 2) {
      $('.reserve').html("<img src='images/chairBoth.png'>")
      claim = 'Pop and Popcorn';
    } else {$('.reserve').html("<img src='images/chairGuy.png'>")};

    //opt out of if else seat selection
    $('.reserve').data('val', 2);

    // seat array with customer objects
    for (var i = 0; i < seatTotal; i++) {
      $('.reserve.seat' + (i+1)).data( 'customer', {
        firstName: $('#fname').val(),
        lastName: $('#lname').val(),
        phoneNumber: $('#phone').val(),
        email: $('#email').val(),
        seatId: $('.seat' + (i+1)).data('res'),
        claim: claim
      });

      //push reserved customer objects to seat array
        if ($('.reserve.seat' + (i+1)).data( 'val') == 2){
          customerArray.push($('.reserve.seat' + (i+1)).data('customer'));
          $('.reserve.seat' + (i+1)).addClass('toolTip');
          $('.reserve.seat' + (i+1)).attr('title', $('#fname').val() + " " + $('#lname').val() + " has reserved seat " + (i+1) + '.' );
        };
    };

    //>console seat array  with customer object
    console.log(customerArray);

    //remove reserve class to opt out of future reservations
    $('.reserve').removeClass('reserve');

     //clears form
    $('#fname').val(null);
    $('#lname').val(null);
    $('#email').val(null);
    $('#phone').val(null);
    $('#leftCurtain').animate({
      width: '600px'
    }, 1000);

    $('#rightCurtain').animate({
      width: '600px'
    }, 1000);

    // resets seat selection for click function
    resCount = 0;

  });


});
