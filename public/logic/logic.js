$(document).ready(function() {
    let max_fields = 10,
        box_count = 2,
        letters = ["c", "d", "e", "f", "g", "h", "i", "j", "k"],
        wrapper = $(".input_wrap"),
        add_button = $("#add");
        
    
    // Materialize initializations!!
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();



    add_button.click(function(e) {
        e.preventDefault();
        
        if(box_count >= max_fields) return;
        let template = '<div class="row"><div class="input-field col s8 offset-s2 m5 offset-m5"><input class="validate" id="option' + letters[box_count - 2].toUpperCase() + '" type="text"><label for="option' + letters[box_count - 2].toUpperCase() + '">Option ' + letters[box_count - 2].toUpperCase()              + '</label></div><a id="remove" class="btn-floating btn-small waves-effect waves-light grey font"><i class="material-icons">close</i></a></div>';
        box_count++;

        wrapper.append(template);
    });

    // Special syntax
    wrapper.on("click", "#remove", function(e) {
        e.preventDefault(); 
        $(this).parent('div').remove()
        box_count--;
    });
});
