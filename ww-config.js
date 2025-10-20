export default {
  editor: {
    label: {
      en: "Phone Input"
    },
    icon: "phone"
  },
  properties: {
    initialValue: {
      label: { en: "Initial Value" },
      type: "Text",
      section: "settings",
      defaultValue: "",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Initial phone number value"
      },
      propertyHelp: {
        tooltip: "Set the initial phone number value. Can be bound to a variable."
      }
      /* wwEditor:end */
    },
    placeholder: {
      label: { en: "Placeholder" },
      type: "Text",
      section: "settings",
      defaultValue: "Enter phone number",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Placeholder text shown when input is empty"
      },
      propertyHelp: {
        tooltip: "Placeholder text displayed in the input field"
      }
      /* wwEditor:end */
    },
    defaultCountry: {
      label: { en: "Default Country" },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "fi", label: "Finland" },
          { value: "se", label: "Sweden" },
          { value: "no", label: "Norway" },
          { value: "dk", label: "Denmark" },
          { value: "is", label: "Iceland" },
          { value: "us", label: "United States" },
          { value: "gb", label: "United Kingdom" },
          { value: "de", label: "Germany" },
          { value: "fr", label: "France" },
          { value: "es", label: "Spain" },
          { value: "it", label: "Italy" }
        ]
      },
      defaultValue: "fi",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "ISO country code (e.g., fi, se, no, dk, us, gb)"
      },
      propertyHelp: {
        tooltip: "Set the default country for phone number formatting"
      }
      /* wwEditor:end */
    },
    disabled: {
      label: { en: "Disabled" },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Enable or disable the input field"
      },
      propertyHelp: {
        tooltip: "Disable the input to prevent user interaction"
      }
      /* wwEditor:end */
    },
    inputHeight: {
      label: { en: "Input Height" },
      type: "Length",
      section: "style",
      defaultValue: "40px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS length value for input height (e.g., 40px, 3rem)"
      },
      propertyHelp: {
        tooltip: "Set the height of the input field"
      }
      /* wwEditor:end */
    },
    fontSize: {
      label: { en: "Font Size" },
      type: "Length",
      section: "style",
      defaultValue: "14px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS length value for font size (e.g., 14px, 1rem)"
      },
      propertyHelp: {
        tooltip: "Set the font size of the input text"
      }
      /* wwEditor:end */
    },
    borderColor: {
      label: { en: "Border Color" },
      type: "Color",
      section: "style",
      defaultValue: "#d1d5db",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS color value (e.g., #d1d5db, rgb(209, 213, 219))"
      },
      propertyHelp: {
        tooltip: "Set the border color of the input field"
      }
      /* wwEditor:end */
    },
    focusBorderColor: {
      label: { en: "Focus Border Color" },
      type: "Color",
      section: "style",
      defaultValue: "#3b82f6",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS color value for focused state (e.g., #3b82f6, blue)"
      },
      propertyHelp: {
        tooltip: "Set the border color when input is focused"
      }
      /* wwEditor:end */
    },
    borderRadius: {
      label: { en: "Border Radius" },
      type: "Length",
      section: "style",
      defaultValue: "4px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS length value for border radius (e.g., 4px, 0.5rem)"
      },
      propertyHelp: {
        tooltip: "Set the border radius for rounded corners"
      }
      /* wwEditor:end */
    }
  },
  triggerEvents: [
    {
      name: "change",
      label: { en: "On Change" },
      event: {
        value: "",
        isValid: false,
        country: ""
      },
      default: true
    },
    {
      name: "focus",
      label: { en: "On Focus" },
      event: {}
    },
    {
      name: "blur",
      label: { en: "On Blur" },
      event: {
        value: "",
        isValid: false
      }
    }
  ]
};