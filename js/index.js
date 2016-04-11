  // START nav-pills collapse
  // See link for explanation regarding nav-pills collapse code: http://stackoverflow.com/questions/23109704/makes-nav-pills-collapsable-just-like-nav-bar-in-bootstrap
  //Stack menu when collapsed
  $('#navBar-collapse-main').on('show.bs.collapse', function() {
    $('.nav-pills').addClass('nav-stacked');
  });

  //Unstack menu when not collapsed
  $('#navBar-collapse-main').on('hidden.bs.collapse', function() {
    $('.nav-pills').removeClass('nav-stacked');
  });
  // END nav-pills collapse

  // START nav-pills selection
  // END nav-pills

  // START #about-contents-left width adjustment
  //Uncompress when navbar collapsed
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('#about-contents-right').hide();
    } else {
      $('#about-contents-right').show();
    }
  });

  //Compress when not collapsed
  // END about-contents-left width adjustment

  // Change navbar buttons when selected
  /* Found here: http://stackoverflow.com/questions/16072421/twitter-bootstrap-tabs-active-class-toggle-not-working*/
  $('ul.nav-pills li a').click(function() {
    $('ul.nav-pills li.active').removeClass('active')
    $(this).parent('li').addClass('active')
  });

  // Change navbar pills as you scroll
  /* Not necessary, when running in codepen
  $('body').scrollspy({ target: '#scroll-spy' });
  */

  /* THIS JAVASCRIPT'S ROLE HAS BEEN TAKEN OVER BY CSS:hover actions...
  // START hover effect on project-picture
  $('.overlay').hover(
    function() {
      $(this).addClass('active-picture');
    },
    function() {
      $(this).removeClass('active-picture');
    }
  );
  // END hover effect on project picture*/