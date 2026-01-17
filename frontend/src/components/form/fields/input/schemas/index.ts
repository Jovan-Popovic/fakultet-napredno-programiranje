import type { Decimal } from "decimal.js";
import { coerce, string } from "zod";

const emojiRegex =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

/** Base schemas (untransformed) */
export const zodBaseInputValue = () => string();

export const zodBaseNumberInputValue = () => coerce.number<number>();
export const zodBaseDecimalInputValue = () => coerce.number<Decimal>();

/** Required string with validation (empty string is invalid) */
export const zodInputValue = (message = "This field is required") =>
  zodBaseInputValue().refine((value) => value.trim() !== "", { message });

export const zodOptionalInputValueWithoutEmojis = () =>
  zodOptionalInputValue().refine((value) => !emojiRegex.test(value ?? ""), {
    message: "Emojis are not allowed",
  });

/** Required string with validation (empty string is invalid) */
export const zodInputValueWithoutEmojis = (message = "This field is required") =>
  zodInputValue(message).refine((value) => !emojiRegex.test(value.trim()), {
    message: "Emojis are not allowed",
  });

/** Required string with validation (empty string is invalid) */
export const zodInputValueMaxWithoutEmojis = (max: number, message?: string) =>
  zodInputValueWithoutEmojis().refine((value) => value.length <= max, {
    message: message || `Maximum length is ${max}`,
  });

export const zodInputWebsite = () =>
  zodInputValue("Website URL is required").refine(
    (val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Value is not valid URL",
    }
  );

export const zodInputPhoneNumber = () =>
  zodInputValue("Phone number is required").refine((v) => /^\+?[1-9]\d{6,14}$/.test(v), {
    message: "Value is not valid phone number",
  });

/** Optional string */
export const zodOptionalInputValue = () => zodBaseInputValue().optional();

/** Required string with min length */
export const zodInputValueMin = (min: number, message?: string) =>
  zodBaseInputValue()
    .refine((value) => value.trim() !== "", {
      message: message || "This field is required",
    })
    .refine((value) => value.length >= min, {
      message: message || `Minimum length is ${min}`,
    });

/** Optional string with min length */
export const zodOptionalInputValueMin = (min: number, message?: string) =>
  zodBaseInputValue()
    .optional()
    .refine((value) => !value || value.length >= min, {
      message: message || `Minimum length is ${min}`,
    });

/** Required string with max length */
export const zodInputValueMax = (max: number, message?: string) =>
  zodBaseInputValue()
    .refine((value) => value.trim() !== "", {
      message: message || "This field is required",
    })
    .refine((value) => value.length <= max, {
      message: message || `Maximum length is ${max}`,
    });

/** Optional string with max length */
export const zodOptionalInputValueMax = (max: number, message?: string) =>
  zodBaseInputValue()
    .optional()
    .refine((value) => !value || value.length <= max, {
      message: message || `Maximum length is ${max}`,
    });

/** Required string with constraints */
export const zodInputValueWithConstraints = ({
  min,
  max,
  requiredMessage,
  minMessage,
  maxMessage,
}: {
  min?: number;
  max?: number;
  requiredMessage?: string;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseInputValue().refine((value) => value.trim() !== "", {
    message: requiredMessage || "This field is required",
  });

  if (min !== undefined) {
    schema = schema.refine((value) => value.length >= min, {
      message: minMessage || `Minimum length is ${min}`,
    });
  }

  if (max !== undefined) {
    schema = schema.refine((value) => value.length <= max, {
      message: maxMessage || `Maximum length is ${max}`,
    });
  }

  return schema;
};

/** Optional string with constraints */
export const zodOptionalInputValueWithConstraints = ({
  min,
  max,
  minMessage,
  maxMessage,
}: {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseInputValue().optional();

  if (min !== undefined) {
    schema = schema.refine((value) => !value || value.length >= min, {
      message: minMessage || `Minimum length is ${min}`,
    });
  }

  if (max !== undefined) {
    schema = schema.refine((value) => !value || value.length <= max, {
      message: maxMessage || `Maximum length is ${max}`,
    });
  }

  return schema;
};

/** Required number with validation (undefined is invalid for required) */
export const zodNumberInputValue = (message = "This field is required") =>
  zodBaseNumberInputValue().refine((value) => value > 0, {
    message,
  });

/** Required number with validation (undefined is invalid for required) */
export const zodNumberWithZeroInputValue = (message = "This field is required") =>
  zodBaseNumberInputValue().refine((value) => value >= 0, {
    message,
  });

export const zodNumberWithZeroDecimalInputValue = (message = "This field is required") =>
  zodBaseDecimalInputValue().refine((value) => value >= 0, {
    message,
  });

/** Optional number */
export const zodOptionalNumberInputValue = () => zodBaseNumberInputValue().optional();

/** Required number with min value */
export const zodNumberInputValueMin = (min: number, message?: string) =>
  zodBaseNumberInputValue()
    .refine((value) => value !== undefined, {
      message: message || "This field is required",
    })
    .refine((value) => value >= min, {
      message: message || `Minimum value is ${min}`,
    });

/** Optional number with min value */
export const zodOptionalNumberInputValueMin = (min: number, message?: string) =>
  zodBaseNumberInputValue()
    .optional()
    .refine((value) => value === undefined || value >= min, {
      message: message || `Minimum value is ${min}`,
    });

/** Required number with max value */
export const zodNumberInputValueMax = (max: number, message?: string) =>
  zodBaseNumberInputValue()
    .refine((value) => value !== undefined, {
      message: message || "This field is required",
    })
    .refine((value) => value <= max, {
      message: message || `Maximum value is ${max}`,
    });

/** Optional number with max value */
export const zodOptionalNumberInputValueMax = (max: number, message?: string) =>
  zodBaseNumberInputValue()
    .optional()
    .refine((value) => value === undefined || value <= max, {
      message: message || `Maximum value is ${max}`,
    });

/** Required number with constraints */
export const zodNumberInputValueWithConstraints = <T extends number>({
  min,
  max,
  requiredMessage,
  minMessage,
  maxMessage,
}: {
  min?: T;
  max?: T;
  requiredMessage?: string;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseNumberInputValue().refine((value) => value !== undefined, {
    message: requiredMessage || "This field is required",
  });

  if (min !== undefined) {
    schema = schema.refine((value) => value >= min, {
      message: minMessage || `Minimum value is ${min}`,
    });
  }

  if (max !== undefined) {
    schema = schema.refine((value) => value <= max, {
      message: maxMessage || `Maximum value is ${max}`,
    });
  }

  return schema;
};

/** Optional number with constraints */
export const zodOptionalNumberInputValueWithConstraints = ({
  min,
  max,
  minMessage,
  maxMessage,
}: {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseNumberInputValue().optional();

  if (min !== undefined) {
    schema = schema.refine((value) => value === undefined || value >= min, {
      message: minMessage || `Minimum value is ${min}`,
    });
  }

  if (max !== undefined) {
    schema = schema.refine((value) => value === undefined || value <= max, {
      message: maxMessage || `Maximum value is ${max}`,
    });
  }

  return schema;
};

/** Required number with decimal places validation and constraints */
export const zodNumberInputValueWithDecimalPlaces = ({
  min = 0,
  max,
  maxDecimalPlaces = 2,
  minMessage,
  maxMessage,
  decimalPlacesMessage,
}: {
  min?: number;
  max?: number;
  maxDecimalPlaces?: number;
  minMessage?: string;
  maxMessage?: string;
  decimalPlacesMessage?: string;
}) => {
  let schema = zodBaseNumberInputValue();

  // Validate decimal places using string representation to avoid floating point issues
  schema = schema.refine(
    (value) => {
      const stringValue = String(value);
      if (stringValue.includes(".")) {
        const decimalPart = stringValue.split(".")[1];
        return !decimalPart || decimalPart.length <= maxDecimalPlaces;
      }

      return true;
    },
    {
      message: decimalPlacesMessage || `Maximum ${maxDecimalPlaces} decimal places allowed`,
    }
  );

  schema = schema.refine((value) => value >= min, {
    message: minMessage || `Minimum value is ${min}`,
  });

  if (max !== undefined) {
    schema = schema.refine((value) => value <= max, {
      message: maxMessage || `Maximum value is ${max}`,
    });
  }

  return schema;
};

/** Optional number with decimal places validation and constraints */
export const zodOptionalNumberInputValueWithDecimalPlaces = ({
  min = 0,
  max,
  maxDecimalPlaces = 2,
  minMessage,
  maxMessage,
  decimalPlacesMessage,
}: {
  min?: number;
  max?: number;
  maxDecimalPlaces?: number;
  minMessage?: string;
  maxMessage?: string;
  decimalPlacesMessage?: string;
}) => {
  let schema = zodBaseNumberInputValue().optional();

  // Validate decimal places using string representation to avoid floating point issues
  schema = schema.refine(
    (value) => {
      if (value === undefined) return true;
      const stringValue = String(value);
      if (stringValue.includes(".")) {
        const decimalPart = stringValue.split(".")[1];
        return !decimalPart || decimalPart.length <= maxDecimalPlaces;
      }

      return true;
    },
    {
      message: decimalPlacesMessage || `Maximum ${maxDecimalPlaces} decimal places allowed`,
    }
  );

  schema = schema.refine((value) => value === undefined || value >= min, {
    message: minMessage || `Minimum value is ${min}`,
  });

  if (max !== undefined) {
    schema = schema.refine((value) => value === undefined || value <= max, {
      message: maxMessage || `Maximum value is ${max}`,
    });
  }

  return schema;
};
