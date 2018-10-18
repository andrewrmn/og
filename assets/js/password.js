if( localStorage.getItem('newsletterShow') ) {
    document.getElementById('password-modal').remove();
} else {

    var pw = document.getElementById('password-modal');
    var page = document.getElementById('page').innerHTML;
    page.innerHTML = '';

    document.getElementById("password-form").addEventListener("submit", function(e){
        e.preventDefault();
        var pass = document.getElementById('password').value;
        if ( pass.toLowerCase() == "monalisa" ) {
            page.innerHTML = page;
            pw.remove();
            localStorage.setItem('newsletterShow', true);
        }
    });

}
