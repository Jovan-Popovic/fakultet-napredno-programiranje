export type NumberManagerType = {
  /**
   * Formats a number with locale-specific thousand separators.
   * Examples: 1000 → "1,000" | 1000.5 → "1,000.5"
   */
  formatWithLocale(value: number | null | undefined, locale?: string): string;

  /**
   * Formats a number as currency with proper decimal handling.
   * Always shows 2 decimal places.
   * Examples: 1000.01 → "$1,000.01" | 10000 → "$10,000.00"
   */
  formatCurrency(value: number | null | undefined, locale?: string): string;

  /**
   * Formats a number as percentage with proper decimal handling.
   * Shows decimals only if value has fractional part.
   * Examples: 100.53 → "100.53%" | 10000 → "10,000%"
   */
  formatPercentage(value: number | null | undefined, locale?: string): string;

  /**
   * Formats a number with proper decimal handling.
   * Shows decimals only if value has fractional part.
   * Examples: 10000.35 → "10,000.35" | 100000 → "100,000"
   */
  formatNumber(value: number | null | undefined, locale?: string): string;

  /**
   * Formats a number using locale-aware compact notation (e.g. 1.2K, 3.4M, 2.5B).
   *
   * @param value - Number to format. If null/undefined, returns "0".
   * @param locale - BCP 47 locale tag (default: "en-US").
   * @param maxFractionDigits - Max decimal places to show (default: 1).
   * @returns The formatted compact string.
   */
  formatCompact(
    value: number | null | undefined,
    maxFractionDigits?: number | undefined,
    locale?: string | undefined
  ): string;
};

export class NumberManager implements NumberManagerType {
  formatWithLocale(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "0";

    return Number(value).toLocaleString(locale);
  }

  formatCurrency(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "$0.00";

    const formatted = Number(value).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `$${formatted}`;
  }

  formatPercentage(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "0 %";

    const hasDecimals = value % 1 !== 0;

    const formatted = Number(value).toLocaleString(locale, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    });

    return `${formatted} %`;
  }

  formatNumber(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "0";

    const hasDecimals = value % 1 !== 0;

    return Number(value).toLocaleString(locale, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    });
  }

  formatCompact(
    value: number | null | undefined,
    maxFractionDigits: number | undefined = 1,
    locale: string | undefined = "en-US"
  ): string {
    if (value === null || value === undefined) return "0";

    return new Intl.NumberFormat(locale, {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: maxFractionDigits,
    }).format(Number(value));
  }
}

export const numberManager: NumberManagerType = new NumberManager();
