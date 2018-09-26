if( localStorage.getItem('newsletterShow') ) {
    document.getElementById('password-modal').remove();
} else {

    var pw = document.getElementById('password-modal');
    var page = document.getElementById('page').innerHTML;
    page.innerHTML = '';

    function passWord() {
        var pass = document.getElementById('password').value;
        if ( pass.toLowerCase() == "letmein" ) {
            page.innerHTML = page;
            pw.remove();
            localStorage.setItem('newsletterShow', true);
        }
    }
}
