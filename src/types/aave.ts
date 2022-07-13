export interface AaveStatus {
  totalCollateral: string;
  totalDebt: string;
  remainingCredit: string;
  currentLiquidationThreshold: number;
  loanToValue: number;
  healthFactor: number;
  dashboardBorrowingPowerUsed: number;
  dashboardLtv: number;
  watch: any;
}
