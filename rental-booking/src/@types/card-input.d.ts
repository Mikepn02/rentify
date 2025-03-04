
declare module 'react-credit-card-input' {
    import * as React from 'react';
  
    interface CreditCardInputProps {
      cardNumberInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
      cardExpiryInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
      cardCVCInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
      fieldClassName?: string;
      containerClassName?: string;
      dangerTextClassName?: string;
      inputStyle?: React.CSSProperties;
      customTextLabels?: {
        invalidCardNumber?: string;
        expiryError?: {
          invalidExpiryDate?: string;
          monthOutOfRange?: string;
          yearOutOfRange?: string;
          dateOutOfRange?: string;
        };
        invalidCvc?: string;
        invalidZipCode?: string;
        cardNumberPlaceholder?: string;
        expiryPlaceholder?: string;
        cvcPlaceholder?: string;
        zipPlaceholder?: string;
      };
    }
  
    const CreditCardInput: React.FC<CreditCardInputProps>;
  
    export default CreditCardInput;
  }