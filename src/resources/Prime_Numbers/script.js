// Prime Numbers
// (c) Mathigon


scripts.Prime_Numbers = function(){

    scripts.require( "resources/Infinity/dragdealer.js", function() {

        new Dragdealer('divisors', {
            steps: 4,
            snap: true,
            animationCallback: function(x,y){
                var v=x*3+1;
                $('.dv_1, .dv_2, .dv_3, .dv_4').css('opacity','0').css('color','#000').css('font-weight','400').css('text-shadow','none');
                $('.dv_'+v ).css('color','#F00').css('font-weight','bold').css('text-shadow','0 0 3px #F00');

                for (i=1; i<=v; i++) {
                    $('.dv_'+i ).css('opacity','1');
                };
            }
        });

    });

    $.expr[":"].econtains = function(obj, index, meta, stack){
        return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
    }

    $('.prime_box:econtains("1")').addClass('prime_opac');

    var prime_desc = new Array(
        "Did you notice that all multiples of 11 had already been deleted before? The same is true for all other remaining numbers. Therefore these numbers must all be prime. <a id='p_away'>Show all Primes</a> or <a id='p_reset'>reset the table</a>.",
        "",
        "We know that 1 is not a prime number and that 2 is the smallest prime number. Click on 2 to delete all of its multiples.<br> ",
        "The next prime number is 3. Click on it to delete all multiples of 3.<br> <br> ",
        "",
        "Note that the next number 4 has been deleted, and all of its multiples have been deleted to. Therefore we can immediately move on to 5.<br> ",
        "",
        "The next possible number is 7. Let's delete all of its multiples!<br> <br> ",
        "","","",
        "Before clicking on 11, think about which numbers will be deleted.<br> <br> "
    );

    var p_next = function(p) {
        switch(p){
            case 2: s=3; break;
            case 3: s=5; break;
            case 5: s=7; break;
            case 7: s=11; break;
            case 11: s=0; break;
        };
        return s
    };

    var p_clicks = function() {
        $('#p_reset').click( function(){
            $('.prime_box').removeClass('prime_2 prime_3 prime_5 prime_7 prime_11 prime_2_1 prime_3_1 prime_5_1 prime_7_1 prime_11_1 prime_opac prime_gone');
            $('.prime_sub p').addClass('prime_gone');
            setTimeout(  function() { $('.prime_sub p').html( prime_desc[2] ).removeClass('prime_gone'); p_clicks(); }, 900 );
            $('.prime_box:econtains("1")').addClass('prime_opac');
            prime(2);
        });

        $('#p_away').click( function(){
            $('.prime_opac').addClass('prime_gone');
        });
    };

    var prime = function(p) {
        $('.prime_box:econtains("'+p+'")').addClass('prime_'+p+' prime_'+p+'_1').css('cursor','pointer');
        $('.prime_box:econtains("'+p+'")').click( function(){
            count = 0;
            $('.prime_box:econtains("'+p+'")').removeClass('prime_'+p+'_1').css('cursor','auto');
            $('.prime_box').each( function(){
                var box = $(this)
                var val = box.html();
                if( val%p == 0 && val != p ) {
                    setTimeout( function() {box.addClass('prime_'+p+' prime_opac')}, count*(50+5*p) );
                    count++;
                }
            });
            setTimeout( function() {
                var nxt=p_next(p);
                prime(nxt);
                $('.prime_sub p').addClass('prime_gone');
                setTimeout(  function() { $('.prime_sub p').html( prime_desc[nxt] ).removeClass('prime_gone'); p_clicks(); }, 700 );
            }, 800 );
        });
    };

    prime(2);
    setTimeout( prime(2), 2000 )

}
