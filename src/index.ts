process.env.TZ = "UTC";

export enum WorkingDay {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export type PayCycleRange = [Date, Date];

export interface EmploymentContract {
  payCycle: "Weekly" | "Monthly";
  payCycleSalary: number;
  workingDays: Set<WorkingDay>;
  startDate: Date;
}

export function apportionSalary(
  contract: EmploymentContract,
  payCycleRange: PayCycleRange
): number {
  const payCycleStartDate = payCycleRange[0];
  const payCycleEndDate = payCycleRange[1];

  if (contract.payCycleSalary <= 0) {
    throw new Error(
      `Invalid pay cycle salary: ${contract.payCycleSalary}. Pay cycle salary must be greater than 0`
    );
  }

  if (payCycleEndDate < payCycleStartDate) {
    throw new Error("Pay cycle cannot end before it begins.");
  }

  const isLastDayOfMonth = (d: Date) => {
    const currMonth = d.getMonth();
    let newDate = new Date(d);
    newDate.setDate(newDate.getDate() + 1);
    return currMonth !== newDate.getMonth();
  };

  const diffInDays = (startDate: Date, endDate: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((+startDate - +endDate) / oneDay));
  };

  const isInvalidMonthCycle = () => {
    return (
      !isLastDayOfMonth(payCycleEndDate) || payCycleStartDate.getDate() !== 1
    );
  };

  const isInValidWeekCycle = () => {
    return (
      payCycleStartDate.getDay() !== WorkingDay.Monday ||
      payCycleEndDate.getDay() !== WorkingDay.Sunday ||
      (contract.payCycle === "Weekly" &&
        diffInDays(payCycleStartDate, payCycleEndDate) !== 6)
    );
  };

  if (contract.payCycle === "Monthly" && isInvalidMonthCycle()) {
    console.error(
      "Monthly pay cycles must start at the beginning of the month, and end on the last day of the month. A monthly pay cycle can only span 1 month"
    );
    throw new Error(
      `${payCycleStartDate} - ${payCycleEndDate} is not a valid monthly pay cycle`
    );
  }

  if (contract.payCycle === "Weekly" && isInValidWeekCycle()) {
    console.error(
      "Weekly pay cycles must start at the beginning of the week (Monday), and end on the last day of the week (Sunday). A weekly pay cycle can only span 1 week"
    );
    throw new Error(
      `${payCycleStartDate} - ${payCycleEndDate} is not a valid weekly pay cycle`
    );
  }

  if (
    contract.startDate <= payCycleStartDate &&
    contract.workingDays.size !== 0
  ) {
    return contract.payCycleSalary;
  }
  if (contract.startDate > payCycleEndDate) {
    return 0;
  }

  let totalWorkingDaysInPayCycle = 0;
  let daysWorked = 0;

  for (
    let date = payCycleStartDate;
    date <= payCycleEndDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (date >= contract.startDate && contract.workingDays.has(date.getDay())) {
      daysWorked++;
    }
    if (contract.workingDays.has(date.getDay())) {
      totalWorkingDaysInPayCycle++;
    }
  }

  if (totalWorkingDaysInPayCycle === 0) {
    return 0;
  }

  const payPerDay = contract.payCycleSalary / totalWorkingDaysInPayCycle;
  return payPerDay * daysWorked;
}
