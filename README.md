# WeWeb Phone Input Component

Professional international phone input component for WeWeb with validation and country selection.

## Features

- 🌍 International phone number formatting
- 🇫🇮 Configurable default country (defaults to Finland)
- ✅ Real-time phone number validation
- 📱 Country flag selector dropdown
- 🎨 Fully customisable styling
- 🔌 Bindable properties for dynamic data
- 📊 Exposed internal variables for NoCode workflows

## Internal Variables

This component exposes three internal variables that can be used in your WeWeb workflows:

- **phoneNumber** (string): The current phone number value
- **isValid** (boolean): Whether the phone number is valid
- **countryCode** (string): The selected country code (e.g., "FI", "SE", "NO")

## Properties

### Settings
- **Initial Value**: Set the starting phone number value (bindable)
- **Placeholder**: Placeholder text for the input field (bindable)
- **Default Country**: Default country for phone formatting (bindable)
- **Disabled**: Disable the input field (bindable)

### Style
- **Input Height**: Height of the input field
- **Font Size**: Text size inside the input
- **Border Color**: Default border color
- **Focus Border Color**: Border color when input is focused
- **Border Radius**: Roundness of the input corners

## Events

### On Change
Triggered when the phone number value changes.
**Event data:**
- `value`: The new phone number
- `isValid`: Whether the number is valid
- `country`: The country code

### On Focus
Triggered when the input field receives focus.

### On Blur
Triggered when the input field loses focus.
**Event data:**
- `value`: The current phone number
- `isValid`: Whether the number is valid

## Installation

1. In WeWeb Dashboard, go to your project
2. Click on the Dev tab → Source Code
3. Add source: `https://github.com/akram-loytoi/weweb-phone-input`
4. Import the component into your project

## Usage Example

### Basic Setup
1. Drag the Phone Input component onto your page
2. Set the default country (e.g., Finland)
3. Bind the Initial Value to a variable if needed

### Workflow Integration
1. Add a workflow that triggers "On Change"
2. Access the phone number using the `phoneNumber` variable
3. Check validity using the `isValid` variable
4. Use the `countryCode` variable if needed

### Validation Example
Create a workflow that only allows form submission if `isValid` is true:

```
IF phoneNumber.isValid === true
  THEN submit form
  ELSE show error message
```

## Development

For local development:

```bash
npm install
npm run serve --port=8080
```

Then add the component as a local element in WeWeb's dev editor.

## Dependencies

- `intl-tel-input`: International telephone input library
- `@weweb/cli`: WeWeb CLI for development and building

## Technical Notes

- Uses Vue 3 Composition API
- Follows WeWeb professional component standards
- Includes mandatory wwEditor blocks for proper editor integration
- Uses internal variables pattern for NoCode compatibility
- Fully reactive to property changes

## License

MIT