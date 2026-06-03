/**
 * STATE UNEMPLOYMENT TAX (SUTA) RATES — 2026
 * 
 * These are NEW EMPLOYER default rates. Actual rates vary by
 * employer experience rating. Update annually from each state's
 * department of revenue website.
 * 
 * wageBase: annual wage base per employee subject to SUTA
 * newRate: default SUTA rate for new employers (decimal)
 * state: full state name
 * abbr: two-letter abbreviation
 * 
 * LAST UPDATED: June 2026
 * SOURCE: State workforce agency websites
 * 
 * TO UPDATE: Change the rate and wageBase values each January.
 * To add a new calculator that uses this data, import and reference.
 */

export const STATE_TAX_DATA = {
  AL: { state: 'Alabama', abbr: 'AL', newRate: 0.0270, wageBase: 8000 },
  AK: { state: 'Alaska', abbr: 'AK', newRate: 0.0200, wageBase: 47100 },
  AZ: { state: 'Arizona', abbr: 'AZ', newRate: 0.0200, wageBase: 8000 },
  AR: { state: 'Arkansas', abbr: 'AR', newRate: 0.0320, wageBase: 7000 },
  CA: { state: 'California', abbr: 'CA', newRate: 0.0340, wageBase: 7000 },
  CO: { state: 'Colorado', abbr: 'CO', newRate: 0.0170, wageBase: 23800 },
  CT: { state: 'Connecticut', abbr: 'CT', newRate: 0.0310, wageBase: 25000 },
  DE: { state: 'Delaware', abbr: 'DE', newRate: 0.0180, wageBase: 10500 },
  FL: { state: 'Florida', abbr: 'FL', newRate: 0.0270, wageBase: 7000 },
  GA: { state: 'Georgia', abbr: 'GA', newRate: 0.0275, wageBase: 9500 },
  HI: { state: 'Hawaii', abbr: 'HI', newRate: 0.0400, wageBase: 56700 },
  ID: { state: 'Idaho', abbr: 'ID', newRate: 0.0130, wageBase: 53500 },
  IL: { state: 'Illinois', abbr: 'IL', newRate: 0.0325, wageBase: 13590 },
  IN: { state: 'Indiana', abbr: 'IN', newRate: 0.0250, wageBase: 9500 },
  IA: { state: 'Iowa', abbr: 'IA', newRate: 0.0100, wageBase: 38200 },
  KS: { state: 'Kansas', abbr: 'KS', newRate: 0.0270, wageBase: 14000 },
  KY: { state: 'Kentucky', abbr: 'KY', newRate: 0.0270, wageBase: 11400 },
  LA: { state: 'Louisiana', abbr: 'LA', newRate: 0.0109, wageBase: 7700 },
  ME: { state: 'Maine', abbr: 'ME', newRate: 0.0222, wageBase: 12000 },
  MD: { state: 'Maryland', abbr: 'MD', newRate: 0.0230, wageBase: 8500 },
  MA: { state: 'Massachusetts', abbr: 'MA', newRate: 0.0156, wageBase: 15000 },
  MI: { state: 'Michigan', abbr: 'MI', newRate: 0.0270, wageBase: 9500 },
  MN: { state: 'Minnesota', abbr: 'MN', newRate: 0.0100, wageBase: 42000 },
  MS: { state: 'Mississippi', abbr: 'MS', newRate: 0.0120, wageBase: 14000 },
  MO: { state: 'Missouri', abbr: 'MO', newRate: 0.0275, wageBase: 10500 },
  MT: { state: 'Montana', abbr: 'MT', newRate: 0.0130, wageBase: 40500 },
  NE: { state: 'Nebraska', abbr: 'NE', newRate: 0.0125, wageBase: 9000 },
  NV: { state: 'Nevada', abbr: 'NV', newRate: 0.0275, wageBase: 40600 },
  NH: { state: 'New Hampshire', abbr: 'NH', newRate: 0.0125, wageBase: 14000 },
  NJ: { state: 'New Jersey', abbr: 'NJ', newRate: 0.0280, wageBase: 42300 },
  NM: { state: 'New Mexico', abbr: 'NM', newRate: 0.0170, wageBase: 31000 },
  NY: { state: 'New York', abbr: 'NY', newRate: 0.0410, wageBase: 12500 },
  NC: { state: 'North Carolina', abbr: 'NC', newRate: 0.0100, wageBase: 31400 },
  ND: { state: 'North Dakota', abbr: 'ND', newRate: 0.0108, wageBase: 43800 },
  OH: { state: 'Ohio', abbr: 'OH', newRate: 0.0270, wageBase: 9000 },
  OK: { state: 'Oklahoma', abbr: 'OK', newRate: 0.0130, wageBase: 27000 },
  OR: { state: 'Oregon', abbr: 'OR', newRate: 0.0230, wageBase: 52800 },
  PA: { state: 'Pennsylvania', abbr: 'PA', newRate: 0.0337, wageBase: 10000 },
  RI: { state: 'Rhode Island', abbr: 'RI', newRate: 0.0109, wageBase: 29200 },
  SC: { state: 'South Carolina', abbr: 'SC', newRate: 0.0054, wageBase: 14000 },
  SD: { state: 'South Dakota', abbr: 'SD', newRate: 0.0120, wageBase: 15000 },
  TN: { state: 'Tennessee', abbr: 'TN', newRate: 0.0270, wageBase: 7000 },
  TX: { state: 'Texas', abbr: 'TX', newRate: 0.0270, wageBase: 9000 },
  UT: { state: 'Utah', abbr: 'UT', newRate: 0.0110, wageBase: 47000 },
  VT: { state: 'Vermont', abbr: 'VT', newRate: 0.0100, wageBase: 16100 },
  VA: { state: 'Virginia', abbr: 'VA', newRate: 0.0254, wageBase: 8000 },
  WA: { state: 'Washington', abbr: 'WA', newRate: 0.0178, wageBase: 68500 },
  WV: { state: 'West Virginia', abbr: 'WV', newRate: 0.0270, wageBase: 9000 },
  WI: { state: 'Wisconsin', abbr: 'WI', newRate: 0.0335, wageBase: 14000 },
  WY: { state: 'Wyoming', abbr: 'WY', newRate: 0.0170, wageBase: 30900 },
  DC: { state: 'District of Columbia', abbr: 'DC', newRate: 0.0270, wageBase: 9000 },
};

/**
 * FEDERAL TAX CONSTANTS — 2026
 * Update annually from IRS.gov
 */
export const FEDERAL_TAX = {
  // Employer share of Social Security + Medicare
  ficaRate: 0.0765,
  socialSecurityRate: 0.062,
  medicareRate: 0.0145,
  socialSecurityWageBase: 176100, // 2026 SS wage base
  // Federal Unemployment
  futaGrossRate: 0.060,
  futaCredit: 0.054, // credit for paying state taxes on time
  futaNetRate: 0.006,
  futaWageBase: 7000,
};

/**
 * Helper: format number as USD currency
 */
export function formatCurrency(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Helper: format number as percentage
 */
export function formatPercent(num) {
  return (num * 100).toFixed(2) + '%';
}
