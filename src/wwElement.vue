<template>
  <div class="phone-input-wrapper" :style="wrapperStyle">
    <input 
      ref="phoneInput" 
      :placeholder="content?.placeholder || 'Enter phone number'"
      :value="phoneNumber"
      :disabled="content?.disabled"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="phone-input"
      :style="inputStyle"
    />
  </div>
</template>

<script>
import { computed, watch, onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'PhoneInput',
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['update:content', 'trigger-event'],
  setup(props, { emit }) {
    /* wwEditor:start */
    const isEditing = computed(() => props.wwEditorState?.isEditing || false);
    /* wwEditor:end */

    const phoneInput = ref(null);
    const iti = ref(null);
    const itiLoaded = ref(false);

    // MANDATORY: Internal variable for NoCode users
    const { value: phoneNumber, setValue: setPhoneNumber } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'phoneNumber',
      type: 'string',
      defaultValue: '',
    });

    // MANDATORY: Expose validation status as internal variable
    const { value: isValid, setValue: setIsValid } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'isValid',
      type: 'boolean',
      defaultValue: false,
    });

    // MANDATORY: Expose country code as internal variable
    const { value: countryCode, setValue: setCountryCode } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'countryCode',
      type: 'string',
      defaultValue: '',
    });

    // MANDATORY: Watch for initialValue changes and reset internal variable
    watch(() => props.content?.initialValue, (newValue) => {
      if (newValue !== undefined && newValue !== phoneNumber.value) {
        setPhoneNumber(newValue);
        if (phoneInput.value && iti.value) {
          phoneInput.value.value = newValue;
          validatePhoneNumber();
        }
      }
    }, { immediate: true });

    // Computed styles for dynamic styling
    const wrapperStyle = computed(() => ({
      width: '100%',
      position: 'relative',
    }));

    const inputStyle = computed(() => ({
      '--input-height': props.content?.inputHeight || '40px',
      '--font-size': props.content?.fontSize || '14px',
      '--border-color': props.content?.borderColor || '#d1d5db',
      '--focus-border-color': props.content?.focusBorderColor || '#3b82f6',
      '--border-radius': props.content?.borderRadius || '4px',
    }));

    // Validate and emit changes
    const validatePhoneNumber = () => {
      if (iti.value && itiLoaded.value) {
        const number = iti.value.getNumber();
        const valid = iti.value.isValidNumber();
        const country = iti.value.getSelectedCountryData();
        
        setIsValid(valid);
        setCountryCode(country?.iso2?.toUpperCase() || '');
        
        return { number, valid, country: country?.iso2?.toUpperCase() || '' };
      }
      return { number: phoneNumber.value, valid: false, country: '' };
    };

    // Handle input changes
    const handleInput = (event) => {
      const newValue = event.target.value;
      if (phoneNumber.value !== newValue) {
        setPhoneNumber(newValue);
        
        // Delay validation slightly to let intl-tel-input process
        setTimeout(() => {
          const validation = validatePhoneNumber();
          emit('trigger-event', { 
            name: 'change', 
            event: { 
              value: newValue,
              isValid: validation.valid,
              country: validation.country
            } 
          });
        }, 100);
      }
    };

    const handleFocus = () => {
      emit('trigger-event', { 
        name: 'focus', 
        event: {} 
      });
    };

    const handleBlur = () => {
      const validation = validatePhoneNumber();
      emit('trigger-event', { 
        name: 'blur', 
        event: { 
          value: phoneNumber.value,
          isValid: validation.valid
        } 
      });
    };

    // Initialize intl-tel-input
    const initializePhoneInput = async () => {
      try {
        const { default: intlTelInput } = await import('intl-tel-input');
        
        // Load CSS only once
        if (!document.querySelector('link[href*="intlTelInput.css"]')) {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://cdn.jsdelivr.net/npm/intl-tel-input@19.6.0/build/css/intlTelInput.css';
          document.head.appendChild(cssLink);
        }
        
        if (phoneInput.value) {
          iti.value = intlTelInput(phoneInput.value, {
            initialCountry: props.content?.defaultCountry || "fi",
            nationalMode: false,
            formatOnDisplay: true,
            autoPlaceholder: "polite",
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.6.0/build/js/utils.js"
          });
          
          // Wait for utils script to load
          await new Promise(resolve => setTimeout(resolve, 500));
          itiLoaded.value = true;
          
          // Set initial value if exists
          if (phoneNumber.value) {
            phoneInput.value.value = phoneNumber.value;
            validatePhoneNumber();
          }
          
          // Add event listeners for validation
          phoneInput.value.addEventListener("countrychange", validatePhoneNumber);
        }
      } catch (error) {
        console.error('Failed to load intl-tel-input:', error);
      }
    };

    onMounted(() => {
      initializePhoneInput();
    });

    onBeforeUnmount(() => {
      if (phoneInput.value) {
        phoneInput.value.removeEventListener("countrychange", validatePhoneNumber);
      }
      if (iti.value) {
        iti.value.destroy();
      }
    });

    // Watch for country changes
    watch(() => props.content?.defaultCountry, (newCountry) => {
      if (iti.value && newCountry) {
        iti.value.setCountry(newCountry);
      }
    });

    return {
      phoneInput,
      phoneNumber,
      isValid,
      countryCode,
      wrapperStyle,
      inputStyle,
      handleInput,
      handleFocus,
      handleBlur,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  }
};
</script>

<style scoped>
.phone-input-wrapper {
  position: relative;
  width: 100%;
}

.phone-input {
  width: 100%;
  height: var(--input-height);
  font-size: var(--font-size);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 8px 12px;
  box-sizing: border-box;
}

.phone-input:focus {
  outline: none;
  border-color: var(--focus-border-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.phone-input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.6;
}

/* intl-tel-input integration */
:deep(.iti) {
  width: 100%;
  display: block;
}

:deep(.iti__flag-container) {
  border: none;
}

:deep(.iti__selected-flag) {
  padding: 0 8px;
  border-right: 1px solid var(--border-color);
}

:deep(.iti__country-list) {
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 200px;
}
</style>