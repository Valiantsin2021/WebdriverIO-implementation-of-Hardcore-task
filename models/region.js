let region = {
  region: 'Frankfurt',
  regionExpected: 'Region: Frankfurt',
  monthlyRentExpected: 'Estimated Component Cost: USD 1,081.20 per 1 month',
  mailMonthlyEstimateExpexted: 'Estimated Monthly Cost: USD 1,081.20'
}

if (process.env.REG === 'FRANKFURT') {
  region = {
    region: 'Frankfurt',
    regionExpected: 'Region: Frankfurt',
    monthlyRentExpected: 'Estimated Component Cost: USD 1,081.20 per 1 month',
    mailMonthlyEstimateExpexted: 'Estimated Monthly Cost: USD 1,081.20'
  }
} else if (process.env.REG === 'COLUMBUS') {
  region = {
    region: 'Columbus',
    regionExpected: 'Region: Columbus',
    monthlyRentExpected: 'Estimated Component Cost: USD 5,411.26 per 1 month',
    mailMonthlyEstimateExpexted: 'Estimated Monthly Cost: USD 5,411.26'
  }
}
module.exports = region
