window.addEventListener('DOMContentLoaded', (event) => {
    const delay_ms = 200
    var lines = document.getElementById('bootuptext').querySelectorAll("li")
    load_crt(delay_ms, lines)
    display_error(delay_ms, lines.length)
})

function load_crt(delay_ms, lines){
    lines.forEach((line, index) => {
        (function(index){
            window.setTimeout(function(){
                line.style.visibility = 'visible'
            }, index * delay_ms);
        }(index));
    })
}

function display_error(delay_ms, multiplier){
    window.setTimeout(function(){
        document.getElementById("error-message").style.visibility = 'visible'
    }, delay_ms * (multiplier+1))
}