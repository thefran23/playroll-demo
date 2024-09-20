import { apportionSalary, EmploymentContract, WorkingDay } from "./src/index";

process.env.TZ = "UTC";

describe("apportionSalary Monthly", () => {
  it("should calculate apportion salary when only half of Monthly days are worked", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2023, 0, 17),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      500
    );
  });

  it("should calculate apportion salary when only half of Monthly days are worked and salary is big", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2023, 0, 17),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      500000
    );
  });

  it("should return 0, if there are 0 working days in cycle", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([WorkingDay.Sunday]),
      startDate: new Date(2023, 0, 30),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      0
    );
  });

  it("should return 0, if Set is empty", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([]),
      startDate: new Date(2023, 0, 1),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      0
    );
  });

  it("should calculate apportion salary when only half of Monthly days are worked and salary is small", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 0.5,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2023, 0, 17),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      0.25
    );
  });

  it("should pay out full salary when starting before start of pay cycle", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2022, 11, 25),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      1000
    );
  });

  it("should pay out full salary when starting on start of pay cycle", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2023, 0, 1),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      1000
    );
  });

  it("should throw error when monthly pay cycle is not 1 month.", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2023, 0, 17),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 1, 5),
    ];
    expect(() => {
      apportionSalary(testEmploymentContractA, testPayCycleRangeA);
    }).toThrow();
  });

  it("should throw a error when pay cycle ends before it begins", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
      ]),
      startDate: new Date(2023, 0, 17),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 31),
      new Date(2023, 0, 1),
    ];

    expect(() => {
      apportionSalary(testEmploymentContractA, testPayCycleRangeA);
    }).toThrow();
  });

  it("should throw a error when pay cycle salary is 0", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 0,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
      ]),
      startDate: new Date(2023, 0, 17),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 31),
      new Date(2023, 0, 1),
    ];

    expect(() => {
      apportionSalary(testEmploymentContractA, testPayCycleRangeA);
    }).toThrow();
  });

  it("should throw a error when pay cycle salary is negative", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: -10,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
      ]),
      startDate: new Date(2023, 0, 17),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 31),
      new Date(2023, 0, 1),
    ];

    expect(() => {
      apportionSalary(testEmploymentContractA, testPayCycleRangeA);
    }).toThrow();
  });

  it("should pay 0 when the contract starts after the pay cycle", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Monthly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
      ]),
      startDate: new Date(2023, 1, 1),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 1),
      new Date(2023, 0, 31),
    ];

    expect(
      apportionSalary(testEmploymentContractA, testPayCycleRangeA)
    ).toEqual(0);
  });
});

describe("apportionSalary Weekly", () => {
  it("should calculate apportion salary when all of weekly days are worked", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Weekly",
      payCycleSalary: 1000,
      workingDays: new Set([WorkingDay.Monday, WorkingDay.Tuesday]),
      startDate: new Date(2023, 0, 2),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 2),
      new Date(2023, 0, 8),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      1000
    );
  });

  it("should calculate apportion salary when some of weekly days are worked", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Weekly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2023, 0, 3),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 2),
      new Date(2023, 0, 8),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      800
    );
  });

  it("should calculate apportion salary when some of weekly days are worked", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Weekly",
      payCycleSalary: 1,
      workingDays: new Set([WorkingDay.Tuesday, WorkingDay.Sunday]),
      startDate: new Date(2024, 8, 11),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2024, 8, 9),
      new Date(2024, 8, 15),
    ];

    expect(apportionSalary(testEmploymentContractA, testPayCycleRangeA)).toBe(
      0.5
    );
  });

  it("should throw error when weekly pay cycle is not 1 week.", () => {
    const testEmploymentContractA: EmploymentContract = {
      payCycle: "Weekly",
      payCycleSalary: 1000,
      workingDays: new Set([
        WorkingDay.Monday,
        WorkingDay.Tuesday,
        WorkingDay.Wednesday,
        WorkingDay.Thursday,
        WorkingDay.Friday,
      ]),
      startDate: new Date(2023, 0, 2),
    };

    const testPayCycleRangeA: [Date, Date] = [
      new Date(2023, 0, 2),
      new Date(2023, 0, 31),
    ];
    expect(() => {
      apportionSalary(testEmploymentContractA, testPayCycleRangeA);
    }).toThrow();
  });
});
