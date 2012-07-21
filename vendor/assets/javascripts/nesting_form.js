(function ($, _) {
  // Default action
  function injection (wrapper, html, details) { 
    return $(html).insertBefore(details.source);
  }

  // This toggles the hidden destroy flag, and hides the matching wrapper for 
  // this set of fields
  function remove_field (event, data) {
    var 
      node          = $(this),
      target        = node.data('remove-field'),
      form          = node.closest('form'),
      hide_action   = node.data('removal') || function (wrapper, details) { return wrapper.hide(); }
      selector      = ('true' === String(target)) ? '' : '=' + target,
      container     = node.closest('[data-field-wrapper' + selector + ']'),
      removal_flag  = container.find('input[data-destroy-field]').val(1),
      details       = {
        item:         node,
        form:         form,
        removal_flag: removal_flag,
        container:    container
      };
    _.console.log({ container: container, flag: removal_flag });
    // Hide this area, find the input and mark it for removal
    hide_action(container, details)
    $(form).trigger('removed_field', details);
    event.preventDefault();
  }

  // This will copy blueprint markup and change the preset identifer into a 
  // unique identifier. The add field element can have have a function bound 
  // to it using data-insertion via jQuery's data method to customise where the 
  function add_field (event, data) {
    // Create new id's
    var 
      node        = $(this),
      form        = node.closest('form'),
      association = node.data('add-field'),
      target      = node.data('target'),
      inject      = node.data('insertion') || injection,
      container   = (target) ? $(target) : $('[data-field-wrapper=' + association + ']:first'),
      identifier  = String(new Date().getTime()) + _.parseInt(Math.random() * 10000),
      content     = _.form_blueprints[association],
      pattern     = new RegExp(content.index, 'g'),
      markup      = content.markup.replace(pattern, identifier),
      details     = { 
        association:  association,
        container:    container, 
        identifier:   identifier,
        markup:       markup,
        source:       node,
        form:         form
      },
      field       = inject(container, markup, details);
    node.trigger('added_field', $.extend(details, { field: field }));
    event.preventDefault();
  }

  $(document).ready(function () {
    $('form[data-nestable]')
      .on('click', '[data-remove-field]', remove_field)
      .on('click', '[data-add-field]', add_field);
  });
}(jQuery, window))
