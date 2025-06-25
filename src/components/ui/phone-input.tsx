'use client';
import { cn } from '@/lib/utils';
import { lookup } from 'country-data-list';
import parsePhoneNumber from 'libphonenumber-js';
import { forwardRef, useEffect, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';

import { GlobeIcon } from 'lucide-react';

export type CountryData = {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
};

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCountryChange?: (data: CountryData | undefined) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultCountry?: string;
  className?: string;
  inline?: boolean;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      onCountryChange,
      onChange,
      value,
      placeholder,
      defaultCountry,
      inline = false,
      ...props
    },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [countryData, setCountryData] = useState<CountryData | undefined>();
    const [displayFlag, setDisplayFlag] = useState<string>('');
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
      if (value) {
        const parsed = parsePhoneNumber(value);
        if (parsed?.country) {
          const newCountryData = lookup.countries({
            alpha2: parsed.country.toLowerCase(),
          })[0];
          setCountryData(newCountryData);
          setDisplayFlag(parsed.country.toLowerCase());
        }
      }
    }, [value]);

    useEffect(() => {
      if (defaultCountry) {
        const newCountryData = lookup.countries({
          alpha2: defaultCountry.toLowerCase(),
        })[0];
        setCountryData(newCountryData);
        setDisplayFlag(defaultCountry.toLowerCase());

        if (
          !hasInitialized &&
          newCountryData?.countryCallingCodes?.[0] &&
          !value
        ) {
          const syntheticEvent = {
            target: {
              value: newCountryData.countryCallingCodes[0],
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange?.(syntheticEvent);
          setHasInitialized(true);
        }
      }
    }, [defaultCountry, onChange, value, hasInitialized]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Ensure the value starts with "+"
      if (!newValue.startsWith('+')) {
        // Replace "00" at the start with "+" if present
        if (newValue.startsWith('00')) {
          newValue = '+' + newValue.slice(2);
        } else {
          // Otherwise just add "+" at the start
          newValue = '+' + newValue;
        }
      }

      try {
        const parsed = parsePhoneNumber(newValue);
        console.log('Phone number details:', {
          isPossible: parsed?.isPossible(),
          isValid: parsed?.isValid(),
          country: parsed?.country,
          nationalNumber: parsed?.nationalNumber,
          formatNational: parsed?.formatNational(),
          formatInternational: parsed?.formatInternational(),
          getType: parsed?.getType(),
          countryCallingCode: parsed?.countryCallingCode,
          getURI: parsed?.getURI(),
          parsed: parsed,
        });

        if (parsed && parsed.country) {
          // Update flag first
          const countryCode = parsed.country;
          console.log('Setting flag to:', countryCode.toLowerCase());

          // Force immediate update
          setDisplayFlag(''); // Clear first
          setTimeout(() => {
            setDisplayFlag(countryCode.toLowerCase()); // Then set new value
          }, 0);

          // Update other state
          const countryInfo = lookup.countries({ alpha2: countryCode })[0];
          setCountryData(countryInfo);
          onCountryChange?.(countryInfo);

          // Update input value
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: parsed.number,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange?.(syntheticEvent);
        } else {
          onChange?.(e);
          setDisplayFlag('');
          setCountryData(undefined);
          onCountryChange?.(undefined);
        }
      } catch (error) {
        console.error('Error parsing phone number:', error);
        onChange?.(e);
        setDisplayFlag('');
        setCountryData(undefined);
        onCountryChange?.(undefined);
      }
    };

    // TODO: LOOK AT THE INPUT STYLES AND MAKE SURE THEY MATCH FOR GENERIC INPUTS
    // TODO: Add border when error
    const inputClasses = cn(
      'flex items-center gap-2 relative bg-transparent selection:bg-primary selection:text-primary-foreground transition-[color,box-shadow] text-base rounded-md border border-input pl-3 h-9 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed md:text-sm has-[input:focus]:outline-none has-[input:focus]:ring-1 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      inline && 'rounded-l-none w-full',
      className
    );

    return (
      <div className={inputClasses}>
        {!inline && (
          <div className="w-4 h-4 rounded-full shrink-0">
            {displayFlag ? (
              <CircleFlag countryCode={displayFlag} height={16} />
            ) : (
              <GlobeIcon size={16} />
            )}
          </div>
        )}
        <input
          ref={ref}
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder || 'Enter number'}
          type="tel"
          autoComplete="tel"
          name="phone"
          className={cn(
            'flex w-full border-none bg-transparent text-base transition-colors placeholder:text-muted-foreground outline-none h-9 py-1 p-0 leading-none md:text-sm [interpolate-size:allow-keywords]',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
