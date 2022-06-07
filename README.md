
In the course of this project, I learned there are easier ways to create a modal window. I did the new book modal entirely through javascript, but realized it seems easier to create the modal elements in html, and then use the button to toggle the visibility of the modal and background overlay.

I learned about the data-* attribute and used it to link specific DOM button elements to event listeners. For the toggleRead function, it included the selector let button = document.querySelector(`.book[data-n='${library.indexOf(this)}'] #toggle-button`). Another solution could be utilizing e.target.closest, which I did in the removeModal function.

Rgba for the modal background worked, but background-color: black and opacity: .7 did not and ended up discoloring the focused window. Rgba applies the transparency color effect only to itself and not its children, whereas opacity applies it to children.

I learned and used a new to me hover effect transform/transition to rotate and scale the new book button.