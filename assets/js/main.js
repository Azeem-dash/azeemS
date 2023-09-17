$(function () {
  $(window).on("load", function () {
    $(".page-loader").delay("500").fadeOut(1000);
  });
  $(document).ready(function () {
    $(document).on("click", ".icon-menu", function () {
      $(".responsive-sidebar-menu").addClass("active");
    });
    $(document).on("click", ".responsive-sidebar-menu .overlay", function () {
      $(".responsive-sidebar-menu").removeClass("active");
    });
    $(document).on("click", ".menu li .scroll-to", function () {
      $(".responsive-sidebar-menu").removeClass("active");
    });
    $(document).on("click", ".color-boxed a", function () {
      $(".color-boxed a").removeClass("clr-active");
      $(this).addClass("clr-active");
    });
    $(document).on("click", ".global-color .setting-toggle", function () {
      $(".global-color").addClass("active");
    });
    $(document).on(
      "click",
      ".global-color .inner .overlay, .global-color .inner .global-color-option .close-settings",
      function () {
        $(".global-color").removeClass("active");
      }
    );
  });
  $(window)
    .scroll(function () {
      var windscroll = $(window).scrollTop();
      if (windscroll >= 0) {
        $(".page-section").each(function (i) {
          if ($(this).position().top <= windscroll - -1) {
            $(".scroll-nav .scroll-to.active").removeClass("active");
            $(".scroll-nav .scroll-to").eq(i).addClass("active");
            $(".scroll-nav-responsive a.active").removeClass("active");
            $(".scroll-nav-responsive a").eq(i).addClass("active");
          }
        });
      } else {
        $(".scroll-nav .scroll-to.active").removeClass("active");
        $(".scroll-nav .scroll-to:first").addClass("active");
        $(".scroll-nav-responsive a.active").removeClass("active");
        $(".scroll-nav-responsive a:first").addClass("active");
      }
      if (windscroll >= 0) {
        $(".scroll-to-page").each(function (i) {
          var wscrolldecress = windscroll + 1;
          if ($(this).position().top <= wscrolldecress - 0) {
            $(".scroll-nav .scroll-to.active").removeClass("active");
            $(".scroll-nav .scroll-to").eq(i).addClass("active");
            $(".scroll-nav-responsive a.active").removeClass("active");
            $(".scroll-nav-responsive a").eq(i).addClass("active");
          }
        });
      } else {
        $(".scroll-nav .scroll-to.active").removeClass("active");
        $(".scroll-nav .scroll-to:first").addClass("active");
        $(".scroll-nav-responsive a.active").removeClass("active");
        $(".scroll-nav-responsive a:first").addClass("active");
      }
    })
    .scroll();
  if ($(".testimonial-slider").length) {
    var testimonial = $(".testimonial-slider").owlCarousel({
      items: 1,
      margin: 30,
      stagePadding: 0,
      smartSpeed: 450,
      autoHeight: true,
      loop: false,
      nav: false,
      dots: false,
      onInitialized: counter,
      onTranslated: counter,
    });
    $(".testimonial-nav .next").on("click", function () {
      testimonial.trigger("next.owl.carousel");
    });
    $(".testimonial-nav .prev").on("click", function () {
      testimonial.trigger("prev.owl.carousel", [300]);
    });

    function counter(event) {
      var element = event.target;
      var items = event.item.count;
      var item = event.item.index + 1;
      if (item > items) {
        item = item - items;
      }
      $("#testimonial-slide-count").html("<span class='left'>" + item + "</span> / " + items);
    }
  }
  window.addEventListener("scroll", {
    scroll_animations,
  });
});

function scroll_animations() {
  var defaults = {
    duration: 1.2,
    ease: "power4.out",
    animation: "fade_from_bottom",
    once: !1,
  };
  gsap.utils.toArray(".scroll-animation").forEach(function (box) {
    var gsap_obj = {};
    var settings = {
      duration: box.dataset.animationDuration || defaults.duration,
    };
    var animations = {
      fade_from_bottom: {
        y: 180,
        opacity: 0,
      },
      fade_from_top: {
        y: -180,
        opacity: 0,
      },
      fade_from_left: {
        x: -180,
        opacity: 0,
      },
      fade_from_right: {
        x: 180,
        opacity: 0,
      },
      fade_in: {
        opacity: 0,
      },
      rotate_up: {
        y: 180,
        rotation: 10,
        opacity: 0,
      },
    };
    var scroll_trigger = {
      scrollTrigger: {
        trigger: box,
        once: defaults.once,
        start: "top bottom+=20%",
        toggleActions: "play none none reverse",
        markers: !1,
      },
    };
    jQuery.extend(gsap_obj, settings);
    jQuery.extend(gsap_obj, animations[box.dataset.animation || defaults.animation]);
    jQuery.extend(gsap_obj, scroll_trigger);
    gsap.from(box, gsap_obj);
  });
}
scroll_animations();

function sendEmail() {
  const message = document.getElementById("required-msg");
  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const subjectText = subject.options[subject.selectedIndex].text;
  const phoneNumber = document.getElementById("phone-number").value;
  const Mailmessage = document.getElementById("message").value;
  console.log("subjectText", subjectText);
  if (!fullName.value || !email.value || subjectText === "Select a subject") {
    message.classList.add("show");
    fullName.classList.add("invalid");
    console.log("false");
    return false;
  }
  message.classList.remove("show");
  form_data = $(this).serialize();
  console.log(form_data);

  var params = {
    name: fullName.value,
    email: email.value,
    message: Mailmessage,
    notes: 'Check this out!'
  };

  const serviceID = "service_06u77xo";
  const templateID = "template_5nozh9c";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("doneMsg").style.display = "flex";
      document.getElementById("full-name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone-number").value = "";
      document.getElementById("message").value = "";
      setTimeout(function () {
        document.getElementById("doneMsg").style.display = "none";
      }, 3000);
      //   alert("mail sent successfully");
    })
    .catch((err) => {
      console.log("error ", err);
    });

  //   Email.send({
  //     Host: "smtp.gmail.com",
  //     Username: "muhammadazeemdev125@gmail.com",
  //     Password: "42E4C69DB73D0195F9AD96FAFC5457C01EAC",
  //     To: `${email.value}`,
  //     From: "muhammadazeemdev125@gmail.com",
  //     Subject: `${subjectText} - ${phoneNumber}`,
  //     Body: `Name: ${fullName} \n  ${Mailmessage}`,
  //   })
  //     .then(function (message) {
  //       document.getElementById("doneMsg").style.display = "flex";
  //       console.log("message ",message);
  //       document.getElementById("full-name").value='';
  //       document.getElementById("email").value='';
  //       document.getElementById("phone-number").value='';
  //       document.getElementById("message").value='';
  //       setTimeout(function () {
  //         document.getElementById("doneMsg").style.display = "none";
  //       }, 3000);
  //       //   alert("mail sent successfully");
  //     })
  //     .catch((err) => {});
}
