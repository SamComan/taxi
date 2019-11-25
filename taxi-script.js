jQuery(function() {
    function getDistance(url) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
   
                data =JSON.parse(this.responseText);
                jQuery("#getPrice").text(data['Price']);
                jQuery("#getPriceTTC").text((data['Price']) + " €");
                jQuery("#getduration").text(data['durationText']);
                jQuery("#getDistance").text(data['distanceText']);
                jQuery("#waitestimation").css("display", "none");

            }
        }; 
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    function getreservation(url) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = this.responseText;
                document.getElementById("result-reservation").innerHTML = data;
                jQuery("#waitresarvation").css("display", "none"); 
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    function estimatePrice(distance) {
        var distance = parseFloat(distance) / 1e3;
        var ar = 1;
        if (jQuery("#ar-stat").text() == "ar") {
            ar = 2;
        }
        
        var car = jQuery("#typecar").val().split("-");
        var tarifb=parseFloat(car[1]);
        var typecar = parseFloat(car[0]);
        return tarifb+(distance * ar * typecar);
    }
    jQuery("#a").click(function() {
        jQuery('input[id="a"]').prop("checked", true).change();
        jQuery('input[id="ar"]').prop("checked", false).change();
        jQuery("#ar-stat").text("a");
    });
    jQuery("#ar").click(function() {
        jQuery('input[id="a"]').prop("checked", false).change();
        jQuery('input[id="ar"]').prop("checked", true).change();
        jQuery("#ar-stat").text("ar");
    });
    jQuery(".modal-backdrop").css("position", "inherit");
    jQuery("#calculer").click(function(e) {
        e.preventDefault();
        var key = "AIzaSyCa2wWrYcLWbY49x5vyo9lS4_F11JicHBU";
        var dep = jQuery("#dep").val();
        var ari = jQuery("#ari").val();
        var typecar = jQuery("#typecar").val()+"-"+jQuery("#typecar option:selected").text();
        if (dep.length !== 0 && ari.length !== 0) {
            jQuery("#message").text("");
            var dateResarvation = jQuery("#format").val();  
            jQuery("#getdepart").text(dep);
            jQuery("#getdest").text(ari);
            jQuery("#getcartype").text(jQuery( "#typecar option:selected" ).text());
            var params = "&dep=" + encodeURIComponent(escape(dep));
            params += "&ari=" + encodeURIComponent(escape(ari));
            params += "&dr=" + encodeURIComponent(escape(dateResarvation));
            params += "&typecar=" + encodeURIComponent(escape(typecar));
            var siteweb = window.location.href;
            var Url = window.location.protocol+"//"+window.location.hostname + "/wp-admin/admin-ajax.php?action=do_ajaxtaxi&fn=gtp" + params;
            jQuery("#waitestimation").css("display", "block");
            getDistance(Url);
            modal.style.display = "block";
        } else {
            if (dep.length === 0) jQuery("#dep").css("border", "1px solid red");
            if (ari.length === 0) jQuery("#ari").css("border", "1px solid red");
            jQuery("#message").text(jQuery("#mse").text());
        }
    });
    jQuery("#restimer-taxi").click(function(e) {
        e.preventDefault();
        modal.style.display = "none";
        jQuery("#getPriceTTC").html('<img style="display: inherit;" src="https://www.taxienligne.com/wp-content/plugins/taxi_booking_online/assets/img/wait-estim.gif">');
        jQuery("#getPrice").html('<img style="display: inherit;" src="https://www.taxienligne.com/wp-content/plugins/taxi_booking_online/assets/img/wait-estim.gif">');
    });
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            // modal.style.display = "none";
        }
    };
    function isMail(valeurChamp) {
        var pattern = /^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/;
        return pattern.test(valeurChamp);
    }
    function isName(valeurChamp) {
        var pattern = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
        return pattern.test(valeurChamp);
    }
    function isTel(valeurChamp) {
        var pattern = /^[ 0-9]*$/;
        return pattern.test(valeurChamp);
    }
    function isUsername(username) {
        return /^[0-9a-zA-Z_.-]+$/.test(username);
    }
     function confpassword(a,b){  
         conf_pw=true; if(a.val()===b.val()&&a!==""){conf_pw=true; jQuery('.p1').css('border','0px solid rgba(255, 14, 14, 0.7)'); jQuery('.p2').css('border','0px solid rgba(255, 14, 14, 0.7)');  } else{ jQuery('.p1').css('border','1px solid rgba(255, 14, 14, 0.7)'); conf_pw=false; }  
         return conf_pw; 
     }  
    
       jQuery("#Reservez-taxi-logged").click(function(e) {
           
        e.preventDefault();
        var dep = jQuery("#dep").val();
        var ari = jQuery("#ari").val();
        var typecar = jQuery("#typecar").val();
        var Price = jQuery("#getPrice").text();
        var Distance = jQuery("#getDistance").text();
        var mode = "1";
        
        if(dep.length != 0 && ari.length != 0 && Price.length != 0) {
                var dateResarvation = jQuery("#format").val();
                jQuery(".modal-backdrop").css("position", "inherit");
                var sc = "&dep=" + encodeURIComponent(escape(dep));
                sc += "&ari=" + encodeURIComponent(escape(ari));
                sc += "&dr=" + encodeURIComponent(escape(dateResarvation));
                sc += "&typecar=" + encodeURIComponent(escape(typecar));
                sc += "&Pr=" + encodeURIComponent(escape(Price));
                sc += "&distance=" + encodeURIComponent(escape(Distance));
                sc += "&mode=" + encodeURIComponent(escape(mode));
                var Url = window.location.protocol+"//"+window.location.hostname + "/wp-admin/admin-ajax.php?action=do_ajaxtaxi&fn=sc" + sc;
                jQuery("#waitresarvation").css("display", "block");
                getreservation(Url);
            }
           
       });



    jQuery("#Réservez-taxi").click(function(e) {
        e.preventDefault();
        var dep = jQuery("#dep").val();
        var ari = jQuery("#ari").val();
        var typecar = jQuery("#typecar").val();
        var Price = jQuery("#getPrice").text();
        var Distance = jQuery("#getDistance").text();
        var mode = "1";
        var rand_idsing = window.rand_idsing_registration;
        var user = jQuery("input[name='user_login_" + rand_idsing + "']").val();
        var email = jQuery("input[name='wp_dp_user_email" + rand_idsing + "']").val();
        var phone = jQuery("input[name='phone" + rand_idsing + "']").val();
        var pw ="";/*jQuery("input[name='pw" + rand_idsing + "']").val();*/
        /*var pwc = jQuery("input[name='pwc" + rand_idsing + "']").val();*/
        
          var a=true;  var b=true ; var c=true; var d=true;
        		
           if(!isTel(phone)){   b=false; jQuery("input[name='phone" + rand_idsing + "']").css('border','1px solid rgba(255, 14, 14, 0.7)'); }
           else{ b=true; jQuery("input[name='phone" + rand_idsing + "']").css('border','1px solid #ddd'); }
        		
           if(!isUsername(user)){   a=false; jQuery("input[name='user_login_" + rand_idsing + "']").css('border','1px solid rgba(255, 14, 14, 0.7)'); }
           else{ a=true; jQuery("input[name='user_login_" + rand_idsing + "']").css('border','1px solid #ddd'); }
        		
    		if(!isMail(email)){  c=false;
    		   jQuery("#result-user-singint").css("display", "block");	
    		   jQuery("input[name='wp_dp_user_email" + rand_idsing + "']").css('border','1px solid rgba(255, 14, 14, 0.7)');
    		   jQuery('#result-user-singint').html('<p style="color: red;">Un ou plusieurs champs contiennent une erreur. Veuillez vérifier et essayer à nouveau.</p>'); }
    		else{ c=true;  jQuery("input[name='wp_dp_user_email" + rand_idsing + "']").css('border','1px solid #ddd'); }
    		
    		if(!confpassword(jQuery("input[name='pw" + rand_idsing + "']"),jQuery("input[name='pwc" + rand_idsing + "']"))){ d=false;
    		   jQuery("#result-user-singint").css("display", "block");	
    		   jQuery("input[name='pw" + rand_idsing + "']").css('border','1px solid rgba(255, 14, 14, 0.7)');
    		   jQuery("input[name='pwc" + rand_idsing + "']").css('border','1px solid rgba(255, 14, 14, 0.7)');
    		   jQuery('#result-user-singint').html('<p style="color: red;">Un ou plusieurs champs contiennent une erreur. Veuillez vérifier et essayer à nouveau.</p>'); } 
    		else{ d=true;  jQuery("input[name='pw" + rand_idsing + "']").css('border','1px solid #ddd'); jQuery("input[name='pwc" + rand_idsing + "']").css('border','1px solid #ddd');}
        		
       	if(a==true&&b==true&&c==true){
            if (dep.length != 0 && ari.length != 0 && Price.length != 0) {
                var dateResarvation = jQuery("#format").val();
                jQuery(".modal-backdrop").css("position", "inherit");
                var sc = "&dep=" + encodeURIComponent(escape(dep));
                sc += "&ari=" + encodeURIComponent(escape(ari));
                sc += "&dr=" + encodeURIComponent(escape(dateResarvation));
                sc += "&typecar=" + encodeURIComponent(escape(typecar));
                sc += "&Pr=" + encodeURIComponent(escape(Price));
                sc += "&distance=" + encodeURIComponent(escape(Distance));
                sc += "&mode=" + encodeURIComponent(escape(mode));
                sc += "&user=" + encodeURIComponent(escape(user));
                sc += "&email=" + encodeURIComponent(escape(email));
                sc += "&pw=" + encodeURIComponent(escape(pw));
                sc += "&phone=" + encodeURIComponent(escape(phone));
                var Url = window.location.protocol+"//"+window.location.hostname + "/wp-admin/admin-ajax.php?action=do_ajaxtaxi&fn=sc" + sc;
                jQuery("#waitresarvation").css("display", "block");
                getreservation(Url);
              }
       	}
    });
});

jQuery(function() {
    jQuery("#format").bootstrapMaterialDatePicker({
        format: "DD/MM/YYYY, HH:mm",
        lang: "fr",
        weekStart: 1,
        cancelText: "ANNULER",
        nowButton: true,
        switchOnClick: true,
        minDate: new Date()
    });
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
 //January is 0!`
        var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    var today = mm + "/" + dd + "/" + yyyy + "," + today.getHours() + ":" + today.getMinutes();
    jQuery("#format").val(today);
});