$(document).ready(function() {
    // Materialize initializations!!
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();


    // New Poll logic
    let max_fields = 10,
        box_count = 2,
        letters = ["c", "d", "e", "f", "g", "h", "i", "j", "k"],
        wrapper = $(".input_wrap"),
        add_button = $("#add");            

    add_button.click(function(e) {
        e.preventDefault();
        
        if(box_count >= max_fields) return;
        let letter = letters[box_count - 2].toUpperCase(),
            template = '<div class="row"><div class="input-field col s8 offset-s2 m5 offset-m5"><input class="validate" id="option' + letter + '" type="text" name="Option' + letter + '" required"><label for="option' + letter + '">Option ' + letter + '</label></div><a id="remove" class="btn-floating btn-small waves-effect waves-light grey font"><i class="material-icons">close</i></a></div>';
        box_count++;

        wrapper.append(template);
    });

    // Special syntax why??
    wrapper.on("click", "#remove", function(e) {
        e.preventDefault(); 
        $(this).parent('div').remove()
        box_count--;
    });

    // Voting 

});
