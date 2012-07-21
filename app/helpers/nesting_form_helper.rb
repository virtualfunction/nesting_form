module NestingFormHelper

  # Adds data-nestable to form tags so they get tracked by JS
  def builder_details(builder, args)
    options = args.extract_options!.reverse_merge :builder => builder
    options[:html] ||= Hash.new
    options[:html][:'data-nestable'] = 'true'
    args << options
  end

  # blueprint markup from nesting_field_for calls, as JSON
  def form_blueprint_json
    fields_markup.to_json
  end

  # Spit out blueprint markup as a JS global
  def form_blueprints
    'window.form_blueprints = %s;' % fields_markup.to_json
  end
  
  # Hold blueprint markup generated for different associations
  def fields_markup
    @fields_markup ||= Hash.new
  end
  
  def nesting_form_for(*args, &block)
    form_for *builder_details(FormBuilders::Default, args), &block
  end

  if defined? FormBuilders::Simple
    def simple_nesting_form_for(*args, &block)
      simple_form_for *builder_details(FormBuilders::Simple, args), &block
    end
  end

  if defined? FormBuilders::Formtastic
    def semantic_nesting_form_for(*args, &block)
      semantic_form_for *builder_details(FormBuilders::Formtastic, args), &block
    end
  end
end
