javascript:(function() { if (typeof jQuery == 'undefined') {document.querySelector('input[type="text"]').value = 'admin';document.querySelector('input[type="password"]').value = 'admin';document.querySelector('input[type="submit"]').click();} else {$('input[type="text"]').val('admin');$('input[type="password"]').val('admin');$('button').click();$('input[type="submit"]').click();}})(); void(0);